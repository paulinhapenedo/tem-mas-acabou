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

import { strings } from './strings';

const mapListToMenuItems = [
  {
    icon: ListPlus,
    href: '/lists/add-new',
    label: strings.newList,
  },
  {
    icon: ClipboardList,
    href: '/lists',
    label: strings.myLists,
  },
  {
    icon: ListChecks,
    href: '/lists',
    label: strings.allLists,
  },
];

const mapProductToMenuItems = [
  {
    icon: PackagePlus,
    href: '/products/add-new',
    label: strings.newProduct,
  },
  {
    icon: Banana,
    href: '/products',
    label: strings.fruitsAndVegetables,
  },
  {
    icon: Beef,
    href: '/products',
    label: strings.butchery,
  },
  {
    icon: Fish,
    href: '/products',
    label: strings.fishmonger,
  },
  {
    icon: Pill,
    href: '/products',
    label: strings.pharmacy,
  },
  {
    icon: ShoppingCart,
    href: '/products',
    label: strings.market,
  },
  {
    icon: Package,
    href: '/products',
    label: strings.allProducts,
  },
];

export { mapListToMenuItems, mapProductToMenuItems };
