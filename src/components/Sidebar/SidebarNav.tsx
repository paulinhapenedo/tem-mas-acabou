import {
  ListPlus,
  ClipboardList,
  ListChecks,
  PackagePlus,
  Banana,
  Beef,
  Fish,
  Pill,
  ShoppingCart,
  Package,
} from 'lucide-react';

import { SidebarItem } from './SidebarItem';

export function SidebarNav() {
  return (
    <nav className="-ml-4 py-4 mr-4">
      <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight">Listas</h3>
      <ul className="space-y-1">
        <SidebarItem Icon={ListPlus}>Criar nova lista</SidebarItem>
        <SidebarItem Icon={ClipboardList}>Minhas listas</SidebarItem>
        <SidebarItem Icon={ListChecks}>Todas as listas</SidebarItem>
      </ul>

      <h3 className="mt-6 mb-2 px-4 text-lg font-semibold tracking-tight">
        Produtos
      </h3>
      <ul className="space-y-1">
        <SidebarItem Icon={PackagePlus}>Criar novo produto</SidebarItem>
        <SidebarItem Icon={Banana}>Hortifruti</SidebarItem>
        <SidebarItem Icon={Beef}>Açougue</SidebarItem>
        <SidebarItem Icon={Fish}>Peixaria</SidebarItem>
        <SidebarItem Icon={Pill}>Farmácia</SidebarItem>
        <SidebarItem Icon={ShoppingCart}>Mercado</SidebarItem>
        <SidebarItem Icon={Package}>Todos os produtos</SidebarItem>
      </ul>
    </nav>
  );
}
