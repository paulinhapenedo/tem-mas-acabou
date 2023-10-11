import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

export function SidebarItem({
  Icon,
  href = '#',
  children,
}: React.PropsWithChildren<{ Icon: LucideIcon; href: string }>) {
  return (
    <li>
      <Link
        href={href}
        className="px-4 flex gap-3 h-8 rounded-md items-center underline-offset-4 hover:bg-secondary/80 active:bg-secondary"
      >
        <Icon size={16} />
        {children}
      </Link>
    </li>
  );
}
