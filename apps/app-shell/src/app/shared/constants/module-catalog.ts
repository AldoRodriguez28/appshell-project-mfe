import { MenuItem, MenuCategory } from '../models/menu-item.model';

export const MODULE_CATALOG: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    kind: 'route',
    category: 'main',
    route: '/dashboard',
    remoteName: 'mfe-dashboard',
    requiredClaim: 'module:dashboard'
  },
  {
    id: 'tasks',
    label: 'Lista de tareas',
    icon: 'tasks',
    kind: 'route',
    category: 'workflow',
    route: '/tasks',
    remoteName: 'mfe-tasks',
    requiredClaim: 'module:tasks'
  },
  {
    id: 'create-order',
    label: 'Crear Orden',
    icon: 'create',
    kind: 'action',
    category: 'dynamic',
    requiredClaim: 'action:create-order'
  },
  {
    id: 'search-order',
    label: 'Buscar Orden',
    icon: 'search',
    kind: 'action',
    category: 'dynamic',
    requiredClaim: 'action:search-order'
  },
  {
    id: 'close-order',
    label: 'Cerrar Orden',
    icon: 'close',
    kind: 'action',
    category: 'dynamic',
    requiredClaim: 'action:close-order'
  },
  {
    id: 'iam',
    label: 'Identity & Access',
    icon: 'shield_person',
    kind: 'route',
    category: 'workflow',
    route: '/iam',
    remoteName: 'mfe-iam',
    requiredClaim: 'module:iam'
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: 'campaign',
    kind: 'route',
    category: 'workflow',
    route: '/marketing',
    remoteName: 'mfe-marketing',
    requiredClaim: 'module:marketing'
  },
  {
    id: 'sales',
    label: 'Sales',
    icon: 'sales',
    kind: 'action',
    category: 'secondary',
    requiredClaim: 'module:sales'
  },
  {
    id: 'marketing-secondary',
    label: 'Marketing',
    icon: 'marketing',
    kind: 'action',
    category: 'secondary',
    requiredClaim: 'module:marketing-secondary'
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: 'operations',
    kind: 'action',
    category: 'secondary',
    requiredClaim: 'module:operations'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'analytics',
    kind: 'action',
    category: 'secondary',
    requiredClaim: 'module:analytics'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    kind: 'action',
    category: 'utility',
    requiredClaim: 'utility:settings'
  },
  {
    id: 'help',
    label: 'Help',
    icon: 'help',
    kind: 'action',
    category: 'utility',
    requiredClaim: 'utility:help'
  }
];

export const MENU_SECTION_TITLES: Partial<Record<MenuCategory, string>> = {
  workflow: 'Workflow Manager',
  dynamic: 'Opciones Dinámicas'
};
