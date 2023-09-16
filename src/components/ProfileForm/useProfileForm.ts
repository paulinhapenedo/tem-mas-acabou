import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useCallback, useEffect, useState } from 'react';

import { useSupabase } from '~/context/supabase-provider';
import { useToast } from '~/ui/use-toast';

import { strings } from './strings';

const MAX_USERNAME_CHARS = 30;
const MAX_NAME_CHARS = 20;
// const MAX_IMAGE_SIZE = 2097152; // 2MB

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Campo obrigatório com mínimo de 3 caracteres.',
    })
    .max(MAX_USERNAME_CHARS, {
      message: strings.fields.username.error(MAX_USERNAME_CHARS),
    }),
  name: z.string().max(MAX_NAME_CHARS, {
    message: strings.fields.name.error(MAX_NAME_CHARS),
  }),
  avatar: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export interface ProfileFormProps {
  userData: Pick<Profile, 'username' | 'name' | 'avatar_url' | 'id'> | null;
}

export function useProfileForm({ userData }: ProfileFormProps) {
  const { supabase } = useSupabase();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: userData?.username || '',
      name: userData?.name || '',
    },
  });

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (userData?.avatar_url) downloadImage(userData?.avatar_url);
  }, [supabase, userData]);

  const onSubmit = useCallback(
    async (values: ProfileFormValues) => {
      const avatarFile = values.avatar?.[0];
      const fileExt = avatarFile?.name.split('.').pop();
      const filePath = fileExt ? `${userData?.id}.${fileExt}` : '';

      // handle new avatar upload
      if (!!filePath.length && filePath !== userData?.avatar_url) {
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile);

        // block update if avatar upload fails
        if (uploadError) {
          toast({
            variant: 'destructive',
            title: 'Erro ao salvar a imagem',
            description:
              'Encontramos um erro ao tentar salvar sua imagem. Por favor, tente novamente.',
          });

          return;
        }
      }

      // update user information
      try {
        const { error } = await supabase.from('profiles').upsert({
          id: userData?.id as string,
          username: values.username,
          name: values.name,
          avatar_url: filePath,
          updated_at: new Date().toISOString(),
        });

        if (error) {
          throw error;
        }

        toast({
          variant: 'success',
          description: 'Informações atualizadas com sucesso!',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao atualizar os dados',
          description:
            'Tivemos um problema ao atualizar seus dados. Por favor, tente novamente.',
        });

        // if there's any error updating the user profile
        // and user uploaded a new avatar
        // we remove the recently uploaded avatar
        if (!!filePath.length) {
          await supabase.storage.from('avatars').remove([filePath]);
        }
      }
    },
    [supabase, toast, userData],
  );

  return {
    form,
    onSubmit,
    avatarUrl,
  };
}
