import { ProfileForm } from '~/components/ProfileForm';
import {
  createServerSupabaseClient,
  getUserDetails,
} from '~/services/supabase-server';
import { Separator } from '~/ui/separator';

export default async function ProfileScreen() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TODO abstract this into an reusable empty state component
  if (!user) {
    return (
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Empty state</h1>
      </div>
    );
  }

  const userData = await getUserDetails(user.id);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
      <Separator className="my-6" />
      <ProfileForm userData={userData} />
    </>
  );
}
