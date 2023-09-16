import { ProfileForm } from '~/components/ProfileForm';
import { createServerSupabaseClient } from '~/services/supabase-server';
import { Separator } from '~/ui/separator';

export default async function ProfileScreen() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error, status } = await supabase
    .from('profiles')
    .select('username, name, avatar_url, id')
    .eq('id', user?.id as string)
    .single();

  if (error && status !== 406) {
    throw error;
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
      <Separator className="my-6" />
      <ProfileForm userData={data} />
    </>
  );
}
