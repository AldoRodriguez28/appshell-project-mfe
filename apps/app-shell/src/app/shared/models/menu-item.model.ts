export type MenuCategory = 'main' | 'workflow' | 'dynamic' | 'secondary' | 'utility';

export type MenuItemKind = 'route' | 'action';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  kind: MenuItemKind;
  category: MenuCategory;
  route?: string;
  remoteName?: string;
  requiredClaim?: string;
  description?: string;
}

export interface MenuSection {
  id: MenuCategory;
  title?: string;
  items: MenuItem[];
}
