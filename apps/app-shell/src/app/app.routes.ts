import { Routes } from '@angular/router';

import { ShellLayoutComponent } from './layout/components/shell-layout.component';

const remoteRoute = (
  path: string,
  remoteName: string,
  title: string,
  icon: string
) => ({
  path,
  loadComponent: () => import('./remote/remote-container.component').then((m) => m.RemoteContainerComponent),
  data: { remoteName, title, icon }
});

export const routes: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      remoteRoute('dashboard', 'mfe-dashboard', 'Dashboard', 'dashboard'),
      remoteRoute('tasks', 'mfe-tasks', 'Lista de tareas', 'checklist'),
      remoteRoute('iam', 'mfe-iam', 'Identity & Access', 'shield_person'),
      remoteRoute('marketing', 'mfe-marketing', 'Marketing', 'campaign')
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
