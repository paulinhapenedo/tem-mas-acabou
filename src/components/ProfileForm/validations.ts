import * as z from 'zod';

import { strings } from './strings';

export const MIN_USERNAME_CHARS = 2;
export const MAX_USERNAME_CHARS = 30;
export const MAX_NAME_CHARS = 20;
export const MAX_IMAGE_SIZE = 2097152; // 2MB

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(MIN_USERNAME_CHARS, {
      message: strings.fields.username.error.required(MIN_USERNAME_CHARS),
    })
    .max(MAX_USERNAME_CHARS, {
      message: strings.fields.username.error.max(MAX_USERNAME_CHARS),
    }),
  name: z.string().max(MAX_NAME_CHARS, {
    message: strings.fields.name.error(MAX_NAME_CHARS),
  }),
  avatar: z.custom<FileList>().refine(
    (file) => {
      if (!file) {
        return true;
      }

      return file?.[0].size <= MAX_IMAGE_SIZE;
    },
    {
      message: strings.fields.avatar.error,
    },
  ),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
