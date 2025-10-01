import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DashboardLayout } from '../components/dashboard-layout/dashboard-layout';

@Component({
  selector: 'mfe-dashboard-entry',
  standalone: true,
  imports: [DashboardLayout],
  template: `<app-dashboard-layout></app-dashboard-layout>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {}
