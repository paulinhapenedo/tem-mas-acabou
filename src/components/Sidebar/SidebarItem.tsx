import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

export function SidebarItem({
  Icon,
  children,
}: React.PropsWithChildren<{ Icon: LucideIcon }>) {
  return (
    <li>
      <Link
        href="#"
        className="px-4 flex gap-3 h-8 rounded-md items-center underline-offset-4 hover:bg-secondary/80 active:bg-secondary"
      >
        <Icon size={16} />
        {children}
      </Link>
    </li>
  );
}
