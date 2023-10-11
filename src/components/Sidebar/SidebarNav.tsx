import { useCallback } from 'react';

import { SidebarItem } from './SidebarItem';
import { mapListToMenuItems, mapProductToMenuItems } from './constants';

export function SidebarNav() {
  const renderListsMenu = useCallback(
    () =>
      mapListToMenuItems.map((item) => (
        <SidebarItem
          href={item.href}
          key={item.label.replaceAll(' ', '-').toLowerCase()}
          Icon={item.icon}
        >
          {item.label}
        </SidebarItem>
      )),
    [],
  );

  const renderProductMenu = useCallback(
    () =>
      mapProductToMenuItems.map((item) => (
        <SidebarItem
          href={item.href}
          key={item.label.replaceAll(' ', '-').toLowerCase()}
          Icon={item.icon}
        >
          {item.label}
        </SidebarItem>
      )),
    [],
  );

  return (
    <nav className="-ml-4 py-4 mr-4">
      <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight">Listas</h3>
      <ul className="space-y-1">{renderListsMenu()}</ul>

      <h3 className="mt-6 mb-2 px-4 text-lg font-semibold tracking-tight">
        Produtos
      </h3>
      <ul className="space-y-1">{renderProductMenu()}</ul>
    </nav>
  );
}
