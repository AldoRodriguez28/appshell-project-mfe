import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { MODULE_CATALOG, MENU_SECTION_TITLES } from '../../shared/constants/module-catalog';
import { MenuCategory, MenuItem, MenuSection } from '../../shared/models/menu-item.model';
import { User } from '../../shared/models/user.model';
import { AuthService } from './auth.service';

const CATEGORY_ORDER: MenuCategory[] = ['main', 'workflow', 'dynamic', 'secondary', 'utility'];

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly auth = inject(AuthService);
  private readonly userSignal = this.auth.user();

  private readonly allowedItemsSignal = signal<MenuItem[]>([]);
  private readonly menuSectionsSignal = signal<MenuSection[]>([]);
  private readonly activeModuleSignal = signal<MenuItem | null>(null);

  readonly currentUser = computed<User | null>(() => this.userSignal());
  readonly menuSections = this.menuSectionsSignal.asReadonly();
  readonly activeModule = this.activeModuleSignal.asReadonly();

  readonly menuItems = computed(() => this.allowedItemsSignal());

  constructor() {
    effect(() => {
      const user = this.userSignal();
      if (!user) {
        this.allowedItemsSignal.set([]);
        this.menuSectionsSignal.set([]);
        this.activeModuleSignal.set(null);
        return;
      }

      const allowed = MODULE_CATALOG.filter((item) =>
        !item.requiredClaim || user.claims.includes(item.requiredClaim)
      );

      this.allowedItemsSignal.set(allowed);

      const sections: MenuSection[] = [];
      for (const category of CATEGORY_ORDER) {
        const items = allowed.filter((item) => item.category === category);
        if (!items.length) {
          continue;
        }

        sections.push({
          id: category,
          title: MENU_SECTION_TITLES[category],
          items
        });
      }

      this.menuSectionsSignal.set(sections);

      const current = this.activeModuleSignal();
      const isCurrentAllowed = current && allowed.some((item) => item.id === current.id);
      if (!isCurrentAllowed) {
        const firstRoute = allowed.find((item) => item.kind === 'route');
        this.activeModuleSignal.set(firstRoute ?? allowed[0] ?? null);
      }
    });
  }

  setActiveModuleById(id: string): void {
    const match = this.allowedItemsSignal().find((item) => item.id === id);
    if (match) {
      this.activeModuleSignal.set(match);
    }
  }

  setActiveModuleByRoute(route: string): void {
    const match = this.allowedItemsSignal().find(
      (item) => item.route && route.startsWith(item.route)
    );
    if (match) {
      this.activeModuleSignal.set(match);
    }
  }

  getMenuItems(): MenuItem[] {
    return this.allowedItemsSignal();
  }
}
