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

import { ProfileFormProps, useProfileForm } from './useProfileForm';
import { strings } from './strings';

export function ProfileForm({ userData }: ProfileFormProps) {
  const { form, onSubmit } = useProfileForm({ userData });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm space-y-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{strings.fields.username.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={strings.fields.username.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {strings.fields.username.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{strings.fields.name.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={strings.fields.name.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {strings.fields.name.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>{strings.fields.avatar.label}</FormLabel>
              <FormControl>
                <Input
                  onChange={(event) => onChange(event.target.files)}
                  type="file"
                />
              </FormControl>
              <FormDescription>
                {strings.fields.avatar.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{strings.button}</Button>
      </form>
    </Form>
  );
}
