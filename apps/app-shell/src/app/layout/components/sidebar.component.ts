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
  template: `
    <div class="flex h-full flex-col gap-6 rounded-2xl bg-white/90 px-4 py-6 shadow-lg ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/80 dark:ring-slate-800">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 text-lg font-semibold text-slate-800 dark:text-slate-100">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">A</span>
          <span>AppShell</span>
        </div>
        <button
          *ngIf="mobileOpen"
          type="button"
          class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Cerrar menú"
          (click)="closeMenu.emit()"
        >
          <span [innerHTML]="iconSvg('close')" aria-hidden="true"></span>
        </button>
      </div>

      <nav aria-label="Navegación principal" class="flex-1 overflow-y-auto">
        <div class="space-y-4">
          <ng-container *ngIf="mainItem as main">
            <a
              *ngIf="main.route; else mainButton"
              #menuItem
              [routerLink]="main.route"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              [class.active]="isActive(main.id)"
              [attr.data-id]="main.id"
              (click)="onSelect(main, menuItem)"
            >
              <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(main.icon)" aria-hidden="true"></span>
              <span>{{ main.label }}</span>
            </a>
            <ng-template #mainButton>
              <button
                #menuItem
                type="button"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                [class.active]="isActive(main.id)"
                [attr.data-id]="main.id"
                (click)="onSelect(main, menuItem)"
              >
                <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(main.icon)" aria-hidden="true"></span>
                <span>{{ main.label }}</span>
              </button>
            </ng-template>
          </ng-container>

          <div>
            <h2 class="px-3 text-base font-medium text-[#111418] dark:text-slate-100">Workflow Manager</h2>
            <div class="mt-2 flex flex-col gap-2">
              <ng-container *ngFor="let item of workflowItems">
                <ng-container *ngIf="item.route; else workflowStatic">
                  <a
                    #menuItem
                    [routerLink]="item.route"
                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    [class.active]="isActive(item.id)"
                    [attr.data-id]="item.id"
                    (click)="onSelect(item, menuItem)"
                  >
                    <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(item.icon)" aria-hidden="true"></span>
                    <span>{{ item.label }}</span>
                  </a>
                </ng-container>
                <ng-template #workflowStatic>
                  <button
                    #menuItem
                    type="button"
                    class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    [class.active]="isActive(item.id)"
                    [attr.data-id]="item.id"
                    (click)="onSelect(item, menuItem)"
                  >
                    <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(item.icon)" aria-hidden="true"></span>
                    <span>{{ item.label }}</span>
                  </button>
                </ng-template>
              </ng-container>
            </div>
          </div>

          <div class="px-3">
            <hr class="border-slate-200/70 dark:border-slate-700/70" />
          </div>

          <div>
            <h2 class="px-3 text-base font-medium text-[#111418] dark:text-slate-100">Opciones Dinámicas</h2>
            <div class="mt-2 flex flex-col gap-2">
              <button
                *ngFor="let item of dynamicOptions"
                #menuItem
                type="button"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                [class.active]="isActive(item.id)"
                [attr.data-id]="item.id"
                (click)="onSelect(item, menuItem)"
              >
                <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(item.icon)" aria-hidden="true"></span>
                <span>{{ item.label }}</span>
              </button>
            </div>
          </div>

          <div class="px-3">
            <hr class="border-slate-200/70 dark:border-slate-700/70" />
          </div>

          <div>
            <div class="flex flex-col gap-2">
              <button
                *ngFor="let item of otherOptions"
                #menuItem
                type="button"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                [class.active]="isActive(item.id)"
                [attr.data-id]="item.id"
                (click)="onSelect(item, menuItem)"
              >
                <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(item.icon)" aria-hidden="true"></span>
                <span>{{ item.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="flex flex-col gap-1">
        <button
          *ngFor="let item of utilityItems"
          #menuItem
          type="button"
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#111418] transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          [class.active]="isActive(item.id)"
          [attr.data-id]="item.id"
          (click)="onSelect(item, menuItem)"
        >
          <span class="text-[#111418] dark:text-slate-200" [innerHTML]="iconSvg(item.icon)" aria-hidden="true"></span>
          <span>{{ item.label }}</span>
        </button>
      </div>
    </div>
  `,
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
