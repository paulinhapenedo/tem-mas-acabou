import { PropsWithChildren } from 'react';

import { Typography } from '~/ui/typography';
import { SidebarMobile, SidebarNav } from '~/components/Sidebar';

export function PageWrapper({
  title,
  subtitle,
  children,
}: PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle && <Typography.Lead>{subtitle}</Typography.Lead>}

      <SidebarMobile />
      <div className="grid grid-cols-with-sidebar lg:pt-6">
        <div className="hidden lg:block">
          <SidebarNav />
        </div>
        {children}
      </div>
    </>
  );
}
