'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/ui/form';
import { Input } from '~/ui/input';
import { Button } from '~/ui/button';

import { SignUpFeedback } from './SignUpFeedback';
import { useSignUpForm } from './useSignUpForm';
import { strings } from './strings';

export default function SignUpForm() {
  const { form, handleSignUp, showFeedback, signUpFeedbackProps } =
    useSignUpForm();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{strings.email.label}</FormLabel>
                <FormControl>
                  <Input placeholder={strings.email.placeholder} {...field} />
                </FormControl>
                <FormDescription>{strings.email.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pwd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{strings.password.label}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={strings.password.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {strings.password.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{strings.button}</Button>
        </form>
      </Form>
      <SignUpFeedback status={showFeedback} {...signUpFeedbackProps} />
    </>
  );
}
