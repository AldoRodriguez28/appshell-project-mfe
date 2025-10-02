import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { IconComponent, ButtonComponent } from '@appshell/ui';
import { ThemeService } from '../../core/services/theme.service';
import { AppStateService } from '../../core/services/app-state.service';
import { DASHBOARD_ICONS, DashboardIconName } from '../dashboard-icons';

const MODULE_GRADIENTS: Record<string, string> = {
  dashboard: 'from-indigo-500 to-purple-500',
  tasks: 'from-pink-500 to-rose-500',
  iam: 'from-emerald-500 to-teal-500',
  marketing: 'from-sky-500 to-indigo-500'
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgClass, NgFor, NgIf, IconComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  @ViewChild('menuWrapper') private menuWrapper?: ElementRef<HTMLDivElement>;

  private readonly theme = inject(ThemeService);
  private readonly appState = inject(AppStateService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly mode = this.theme.mode$;
  protected readonly currentUser = this.appState.currentUser;
  protected readonly currentModule = this.appState.activeModule;
  protected query = '';
  protected readonly panelOpen = signal(false);

  private readonly iconCache = new Map<string, SafeHtml>();


  protected readonly moduleTrack = (_: number, module: { id: string }) => module.id;
  protected readonly modules = computed(() =>
    this.appState
      .getMenuItems()
      .filter((item) => item.kind === 'route')
      .map((item) => ({
        id: item.id,
        name: item.label,
        icon: item.icon,
        gradient: MODULE_GRADIENTS[item.id] ?? 'from-purple-500 to-indigo-500'
      }))
  );

  protected iconSvg(name: string): SafeHtml | null {
    const svg = DASHBOARD_ICONS[name as DashboardIconName];
    if (!svg) {
      return null;
    }

    let cached = this.iconCache.get(name);
    if (!cached) {
      cached = this.sanitizer.bypassSecurityTrustHtml(svg);
      this.iconCache.set(name, cached);
    }
    return cached;
  }

  protected togglePanel(event: MouseEvent): void {
    event.stopPropagation();
    this.panelOpen.update((open) => !open);
  }

  protected hidePanel(): void {
    if (this.panelOpen()) {
      this.panelOpen.set(false);
    }
  }

  onToggleTheme(): void {
    this.theme.toggle();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.panelOpen()) {
      return;
    }

    const wrapper = this.menuWrapper?.nativeElement;
    if (wrapper && !wrapper.contains(event.target as Node)) {
      this.hidePanel();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.hidePanel();
  }
}
