import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { IconComponent, ButtonComponent } from '@appshell/ui';
import { ThemeService } from '../../core/theme.service';
import { DASHBOARD_ICONS, DashboardIconName } from '../dashboard-icons';

interface HeaderModule {
  name: string;
  gradient: string;
  icon: DashboardIconName;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgClass, NgFor, IconComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  @ViewChild('menuWrapper') private menuWrapper?: ElementRef<HTMLDivElement>;

  private readonly theme = inject(ThemeService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly mode = this.theme.mode$;
  protected query = '';
  protected readonly panelOpen = signal(false);

  private readonly iconCache = new Map<DashboardIconName, SafeHtml>();

  protected readonly modules: HeaderModule[] = [
    { name: 'Ventas', gradient: 'from-indigo-500 to-purple-500', icon: 'sales' },
    { name: 'Marketing', gradient: 'from-pink-500 to-rose-500', icon: 'marketing' },
    { name: 'Operaciones', gradient: 'from-emerald-500 to-teal-500', icon: 'operations' },
    { name: 'Analytics', gradient: 'from-sky-500 to-indigo-500', icon: 'analytics' },
    { name: 'Productos', gradient: 'from-amber-500 to-orange-500', icon: 'products' },
    { name: 'Clientes', gradient: 'from-lime-500 to-green-500', icon: 'customers' },
    { name: 'Reportes', gradient: 'from-teal-500 to-cyan-500', icon: 'reports' },
    { name: 'Integraciones', gradient: 'from-fuchsia-500 to-purple-500', icon: 'integrations' }
  ];

  protected iconSvg(name: DashboardIconName): SafeHtml {
    let cached = this.iconCache.get(name);
    if (!cached) {
      cached = this.sanitizer.bypassSecurityTrustHtml(DASHBOARD_ICONS[name]);
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
