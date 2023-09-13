import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSupabase } from '~/context/supabase-provider';

import { strings } from './strings';

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: strings.email.error,
    })
    .min(2, {
      message: strings.email.error,
    }),
  pwd: z.string().min(6, {
    message: strings.password.error,
  }),
});

export const useSignUpForm = () => {
  const { supabase } = useSupabase();
  const [showBetaMessage, setShowBetaMessage] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  const showFeedback = showBetaMessage || hasError || showConfirmationMessage;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      pwd: '',
    },
  });

  const signUpFeedbackProps = useMemo(() => {
    if (hasError)
      return {
        ...strings.feedback.alreadyRegister,
        variant: 'destructive' as const, // Alert types complains without it
      };
    if (showBetaMessage) return strings.feedback.privateBeta;
    if (showConfirmationMessage) return strings.feedback.confirmEmail;
  }, [hasError, showBetaMessage, showConfirmationMessage]);

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    // reset error state
    setHasError(false);
    setShowBetaMessage(false);

    // it's a pet project, so no open sign-up yet
    const isEmailAllowed = [
      process.env.NEXT_PUBLIC_USER1,
      process.env.NEXT_PUBLIC_USER2,
    ].includes(values.email);

    if (!isEmailAllowed) {
      setShowBetaMessage(true);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.pwd,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    // user already exists and has confirmed the email before
    if (data.user?.aud === 'authenticated') {
      setHasError(true);
      return;
    }

    if (error) {
      console.log({ error });
    }

    setShowConfirmationMessage(true);
  };

  return {
    form,
    handleSignUp,
    showFeedback,
    signUpFeedbackProps,
  };
};
