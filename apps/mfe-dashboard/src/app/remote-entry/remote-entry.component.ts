import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DashboardLayout } from '../components/dashboard-layout/dashboard-layout';

@Component({
  selector: 'mfe-dashboard-entry',
  standalone: true,
  imports: [DashboardLayout],
  templateUrl: './remote-entry.component.html',
  styleUrls: ['./remote-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {}
