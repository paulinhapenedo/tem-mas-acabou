import { ProfileForm } from '~/components/ProfileForm';
import { getUserDetails } from '~/services/user';
import { Separator } from '~/ui/separator';

export default async function ProfileScreen() {
  const userData = await getUserDetails();

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
      <Separator className="my-6" />
      <ProfileForm userData={userData} />
    </>
  );
}
