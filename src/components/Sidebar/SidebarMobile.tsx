import { ChevronsRight } from 'lucide-react';

import { Button } from '~/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/ui/sheet';

import { SidebarNav } from './SidebarNav';

export function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden my-6">
        <Button variant="outline">
          <ChevronsRight />
          Abrir Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SidebarNav />
      </SheetContent>
    </Sheet>
  );
}
