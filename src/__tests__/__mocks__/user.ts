import { User } from '@supabase/supabase-js';

export const userMock: User = {
  id: '3af5450f-864c-4ea9-8258-b08da18be315',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'email@gmail.com',
  email_confirmed_at: '2023-09-14T22:15:21.329655Z',
  phone: '',
  confirmation_sent_at: '2023-09-14T22:15:07.000814Z',
  confirmed_at: '2023-09-14T22:15:21.329655Z',
  last_sign_in_at: '2023-09-17T00:57:02.116968Z',
  app_metadata: { provider: 'email', providers: ['email'] },
  user_metadata: {},
  identities: [
    {
      id: '3af5450f-864c-4ea9-8258-b08da18be315',
      user_id: '3af5450f-864c-4ea9-8258-b08da18be315',
      identity_data: {},
      provider: 'email',
      last_sign_in_at: '2023-09-14T22:15:06.998714Z',
      created_at: '2023-09-14T22:15:06.998774Z',
      updated_at: '2023-09-14T22:15:06.998774Z',
      identity_id: '',
    },
  ],
  created_at: '2023-09-14T22:15:06.996117Z',
  updated_at: '2023-09-18T21:38:05.399305Z',
};

export const userProfileMock: Profile = {
  avatar_url: null,
  id: '3af5450f-864c-4ea9-8258-b08da18be315',
  name: null,
  updated_at: null,
  username: null,
};
