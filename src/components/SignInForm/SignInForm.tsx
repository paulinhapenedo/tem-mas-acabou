'use client';

import { Button } from '~/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/ui/form';
import { Input } from '~/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '~/ui/popover';

import { useSignInForm } from './useSignInForm';
import { strings } from './strings';

export function SignInForm() {
  const { form, handleSignIn } = useSignInForm();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>{strings.login}</Button>
      </PopoverTrigger>
      <PopoverContent align="end" onInteractOutside={() => form.clearErrors()}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{strings.button}</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
