import { Routes } from '@angular/router';

import { MODULE_CATALOG } from './shared/constants/module-catalog';
import { ShellLayoutComponent } from './layout/components/shell-layout.component';

const ROUTE_COMPONENT = () =>
  import('./features/remote/remote-container.component').then((m) => m.RemoteContainerComponent);

const remoteModules = MODULE_CATALOG.filter((item) => item.kind === 'route' && item.remoteName);

const childRoutes = remoteModules.map((item) => {
  const path = item.route?.replace(/^\//, '') ?? item.id;
  return {
    path,
    loadComponent: ROUTE_COMPONENT,
    data: {
      moduleId: item.id,
      remoteName: item.remoteName,
      title: item.label,
      icon: item.icon
    }
  };
});

const defaultPath = childRoutes[0]?.path ?? 'dashboard';

export const routes: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: defaultPath },
      ...childRoutes
    ]
  },
  { path: '**', redirectTo: defaultPath }
];
