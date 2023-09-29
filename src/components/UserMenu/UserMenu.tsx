'use client';

import Link from 'next/link';
import { ListChecks, User as UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '~/ui/avatar';
import { Button } from '~/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/ui/dropdown-menu';

import { strings } from './strings';
import { useUserMenu } from './useUserMenu';

export function UserMenu({ user }: { user: Profile }) {
  const { avatarFallbackText, avatarUrl, signOut } = useUserMenu(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Abrir o menu do usuário"
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-9 w-9">
            {!!avatarUrl && (
              <AvatarImage src={avatarUrl} alt={user?.username as string} />
            )}
            <AvatarFallback>{avatarFallbackText}</AvatarFallback>
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
        <DropdownMenuItem asChild>
          <Button
            variant="noStyle"
            onClick={signOut}
            className="w-full justify-start"
          >
            {strings.menuOptions.logout}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
