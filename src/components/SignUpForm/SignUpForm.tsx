'use client';

import { AlertCircle, Mail } from 'lucide-react';
import { SyntheticEvent, useState } from 'react';

import { useSupabase } from '~/context/supabase-provider';
import { Alert, AlertDescription, AlertTitle } from '~/ui/alert';

export default function SignUpForm() {
  const [hasError, setHasError] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const { supabase } = useSupabase();

  const handleSignUp = async (event: SyntheticEvent) => {
    // reset error state
    setHasError(false);
    event.preventDefault();

    // TODO: get inputted data
    const { data, error } = await supabase.auth.signUp({
      email: process.env.NEXT_PUBLIC_USERNAME || '',
      password: process.env.NEXT_PUBLIC_PWD || '',
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

  return (
    <>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <label htmlFor="email">Digite o seu email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite um email válido"
        />
        <label htmlFor="pwd">Digite uma senha</label>
        <input
          type="password"
          id="pwd"
          name="pwd"
          placeholder="Digite uma senha"
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <Alert
        variant={showConfirmationMessage ? 'default' : 'destructive'}
        className={`
        max-w-fit
            transition-opacity
            motion-reduce:transition-none
            opacity-0
            ${(hasError || showConfirmationMessage) && 'opacity-100'}
          `}
      >
        {hasError && <AlertCircle className="h-4 w-4" />}
        {showConfirmationMessage && <Mail className="h-4 w-4" />}
        <AlertTitle>
          {showConfirmationMessage ? 'Email de confirmação enviado' : 'Erro'}
        </AlertTitle>
        <AlertDescription>
          {showConfirmationMessage
            ? 'Verifique sua caixa de entrada.'
            : 'Usuário já existe. Por favor, tente fazer login.'}
        </AlertDescription>
      </Alert>
    </>
  );
}
