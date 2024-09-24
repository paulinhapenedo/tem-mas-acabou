import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useSupabase } from '~/context/supabase-provider';
import { toast } from '~/ui/use-toast';

import { strings } from './strings';

const formSchema = z
  .object({
    email: z.string().email({
      message: strings.email.error,
    }),
    pwd: z.string(),
  })
  .required();

export const useSignInForm = () => {
  const router = useRouter();
  const { supabase } = useSupabase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      pwd: '',
    },
  });

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.pwd,
    });

    if (error) {
      toast({
        title: 'Algo deu errado',
        description: 'Por favor, tente novamente mais tarde.',
        variant: 'destructive',
      });

      return;
    }

    if (data) {
      router.refresh();
    }
  };

  return {
    handleSignIn,
    form,
  };
};
