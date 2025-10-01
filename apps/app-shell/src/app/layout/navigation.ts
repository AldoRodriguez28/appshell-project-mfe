export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
  { label: 'Lista de tareas', icon: 'checklist', route: '/tasks' },
  { label: 'IAM', icon: 'shield_person', route: '/iam' },
  { label: 'Marketing', icon: 'campaign', route: '/marketing' }
];
