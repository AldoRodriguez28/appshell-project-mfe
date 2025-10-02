import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, NgIf],
  templateUrl: './shell-layout.component.html',
  styleUrls: ['./shell-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellLayoutComponent {
  readonly mobileSidebarOpen = signal(false);

  toggleSidebar(force?: boolean): void {
    if (force === true) {
      this.mobileSidebarOpen.set(true);
    } else if (force === false) {
      this.mobileSidebarOpen.set(false);
    } else {
      this.mobileSidebarOpen.update((value) => !value);
    }
  }
}
