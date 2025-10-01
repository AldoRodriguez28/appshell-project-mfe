import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./remote-entry/remote-entry.component').then((m) => m.RemoteEntryComponent)
  }
];
