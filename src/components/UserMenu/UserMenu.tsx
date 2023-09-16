'use client';

import Link from 'next/link';
import { ListChecks, User as UserIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback } from '~/ui/avatar';
import { Button } from '~/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/ui/dropdown-menu';
import { useSupabase } from '~/context/supabase-provider';

import { strings } from './strings';

export function UserMenu() {
  const router = useRouter();
  const { supabase } = useSupabase();

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.refresh();
    }

    console.log({ error });
  }, [router, supabase]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            {/* <AvatarImage src="/avatars/03.png" alt="@shadcn" /> */}
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <UserIcon className="mr-2 h-4 w-4" />
              {strings.menuOptions.edit}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/lists">
              <ListChecks className="mr-2 h-4 w-4" />
              {strings.menuOptions.lists}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          {strings.menuOptions.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
