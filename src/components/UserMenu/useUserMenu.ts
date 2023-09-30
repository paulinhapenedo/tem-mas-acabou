import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useSupabase } from '~/context/supabase-provider';
import { downloadImage } from '~/utils';

export function useUserMenu(user: Profile) {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.refresh();
      return;
    }

    console.log({ error });
  }, [router, supabase]);

  useEffect(() => {
    const handleAvatar = async () => {
      const url = await downloadImage({
        supabase,
        folder: 'avatars',
        path: user.avatar_url!,
      });

      if (!!url) {
        setAvatarUrl(url);
      }
    };

    if (user?.avatar_url) {
      handleAvatar();
    }
  }, [supabase, user]);

  const avatarFallbackText = user.username?.split('')[0].toUpperCase() ?? '🐯';

  return {
    signOut,
    avatarFallbackText,
    avatarUrl,
  };
}
