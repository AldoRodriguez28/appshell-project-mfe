import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DashboardContentComponent } from '../dashboard-content/dashboard-content';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [DashboardContentComponent],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayout {}
