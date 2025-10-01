import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { DashboardIconName, DASHBOARD_ICONS } from '../dashboard-icons';
import { NavItem } from '../navigation';

interface SidebarNavItem {
  id: string;
  label: string;
  icon: DashboardIconName;
  route?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnChanges, AfterViewInit {
  @Input() items: NavItem[] = [];
  @Input() mobileOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  @ViewChildren('menuItem', { read: ElementRef })
  private readonly menuItems!: QueryList<ElementRef<HTMLElement>>;

  protected mainItem: SidebarNavItem | null = null;
  protected workflowItems: SidebarNavItem[] = [];
  protected readonly dynamicOptions: SidebarNavItem[] = [
    { id: 'create-order', label: 'Crear Orden', icon: 'create' },
    { id: 'search-order', label: 'Buscar Orden', icon: 'search' },
    { id: 'close-order', label: 'Cerrar Orden', icon: 'close' }
  ];
  protected readonly otherOptions: SidebarNavItem[] = [
    { id: 'sales', label: 'Sales', icon: 'sales' },
    { id: 'marketing-secondary', label: 'Marketing', icon: 'marketing' },
    { id: 'operations', label: 'Operations', icon: 'operations' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' }
  ];
  protected readonly utilityItems: SidebarNavItem[] = [
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'help', label: 'Help', icon: 'help' }
  ];

  protected readonly activeId = signal<string>('');

  private activeElement?: HTMLElement;
  private readonly iconCache = new Map<DashboardIconName, SafeHtml>();
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);

  ngOnChanges(changes: SimpleChanges): void {
    if ('items' in changes) {
      this.initializeNavItems();
      queueMicrotask(() => this.updateActiveFromRouter());
    }
  }

  ngAfterViewInit(): void {
    this.initializeNavItems();
    this.updateActiveFromRouter();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.updateActiveFromRouter());

    setTimeout(() => this.applyShiftToActive(), 0);
  }

  protected isActive(id: string): boolean {
    return this.activeId() === id;
  }

  protected onSelect(item: SidebarNavItem, element: HTMLElement): void {
    this.activeId.set(item.id);
    this.updateActiveElement(item.id, element);

    if (this.mobileOpen && item.route) {
      this.closeMenu.emit();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.activeElement) {
      this.applyShift(this.activeElement);
    }
  }

  private initializeNavItems(): void {
    if (!this.items?.length) {
      return;
    }

    const [first, ...rest] = this.items;
    this.mainItem = this.toSidebarItem(first);
    this.workflowItems = rest.map((item) => this.toSidebarItem(item));
  }

  private toSidebarItem(item: NavItem): SidebarNavItem {
    const iconMap: Record<string, DashboardIconName> = {
      dashboard: 'dashboard',
      checklist: 'tasks',
      shield_person: 'shield',
      campaign: 'marketing'
    };

    const icon = iconMap[item.icon] ?? 'dashboard';
    return { id: item.route, label: item.label, icon, route: item.route };
  }

  protected iconSvg(name: DashboardIconName): SafeHtml {
    let cached = this.iconCache.get(name);
    if (!cached) {
      cached = this.sanitizer.bypassSecurityTrustHtml(DASHBOARD_ICONS[name]);
      this.iconCache.set(name, cached);
    }
    return cached;
  }

  private updateActiveFromRouter(): void {
    const url = this.router.url.split('?')[0];
    const candidates = [this.mainItem, ...this.workflowItems].filter((item): item is SidebarNavItem => !!item);
    const match = candidates.find((item) => item.route && url.startsWith(item.route));
    if (match) {
      this.activeId.set(match.id);
      this.updateActiveElement(match.id);
    }
  }

  private updateActiveElement(id: string, element?: HTMLElement): void {
    const host = element ?? this.findElementById(id);
    if (!host) {
      return;
    }

    if (this.activeElement && this.activeElement !== host) {
      this.activeElement.style.setProperty('--active-shift', '0px');
    }

    this.activeElement = host;
    this.applyShift(host);
  }

  private findElementById(id: string): HTMLElement | undefined {
    const elements = this.menuItems?.toArray().map((ref) => ref.nativeElement) ?? [];
    return elements.find((el) => el.dataset['id'] === id);
  }

  private applyShiftToActive(): void {
    if (this.activeElement) {
      this.applyShift(this.activeElement);
    }
  }

  private applyShift(element: HTMLElement): void {
    const delta = this.computeShift(element);
    element.style.setProperty('--active-shift', `${delta}px`);
  }

  private computeShift(container: HTMLElement): number {
    const rect = container.getBoundingClientRect();
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) {
      return 0;
    }

    const left = Math.min(...children.map((child) => child.getBoundingClientRect().left));
    const right = Math.max(...children.map((child) => child.getBoundingClientRect().right));
    const groupWidth = right - left;
    const leftOffset = left - rect.left;
    const desiredLeft = (rect.width - groupWidth) / 2;
    return desiredLeft - leftOffset;
  }
}
