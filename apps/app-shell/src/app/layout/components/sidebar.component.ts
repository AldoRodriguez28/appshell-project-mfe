import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { IconComponent } from '@appshell/ui';

import { AppStateService } from '../../core/services/app-state.service';
import { DASHBOARD_ICONS, DashboardIconName } from '../dashboard-icons';
import { MenuItem, MenuSection } from '../../shared/models/menu-item.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input() mobileOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  private readonly appState = inject(AppStateService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly menuSections = this.appState.menuSections;
  protected readonly activeModule = this.appState.activeModule;
  protected readonly currentUser = this.appState.currentUser;
  protected readonly menuItems = this.appState.menuItems;

  private readonly iconCache = new Map<string, SafeHtml>();

  protected readonly sectionTrack = (_: number, section: MenuSection) => section.id;
  protected readonly itemTrack = (_: number, item: MenuItem) => item.id;

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.appState.setActiveModuleByRoute(event.urlAfterRedirects));

    this.appState.setActiveModuleByRoute(this.router.url);
  }

  protected isActive(item: MenuItem): boolean {
    return this.activeModule()?.id === item.id;
  }

  protected onAction(item: MenuItem): void {
    this.appState.setActiveModuleById(item.id);
  }

  protected iconSvg(icon: string): SafeHtml | null {
    const key = icon as DashboardIconName;
    const svg = DASHBOARD_ICONS[key];
    if (!svg) {
      return null;
    }

    if (!this.iconCache.has(icon)) {
      this.iconCache.set(icon, this.sanitizer.bypassSecurityTrustHtml(svg));
    }

    return this.iconCache.get(icon)!;
  }

  @HostListener('keydown.escape')
  protected onEscape(): void {
    if (this.mobileOpen) {
      this.closeMenu.emit();
    }
  }
}
