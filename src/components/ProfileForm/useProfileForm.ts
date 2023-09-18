import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

import { useSupabase } from '~/context/supabase-provider';
import { useToast } from '~/ui/use-toast';

import { strings } from './strings';
import { ProfileFormValues, profileFormSchema } from './validations';

export interface ProfileFormProps {
  userData: Pick<Profile, 'username' | 'name' | 'avatar_url' | 'id'> | null;
}

export function useProfileForm({ userData }: ProfileFormProps) {
  const { supabase } = useSupabase();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: userData?.username || '',
      name: userData?.name || '',
    },
  });

  const onSubmit = useCallback(
    async (values: ProfileFormValues) => {
      const avatarFile = values.avatar?.[0];
      const fileExt = avatarFile?.name.split('.').pop();
      const filePath = fileExt
        ? `${userData?.id}-${Date.now()}.${fileExt}`
        : '';

      // handle new avatar upload
      if (!!filePath.length && filePath !== userData?.avatar_url) {
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile);

        // block update if avatar upload fails
        if (uploadError) {
          toast({
            variant: 'destructive',
            ...strings.toasts.uploadImageError,
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
          ...strings.toasts.updateDataSuccess,
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          ...strings.toasts.updateDataError,
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
  };
}
