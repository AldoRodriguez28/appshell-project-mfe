import { NgComponentOutlet, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, Type, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { CardComponent, IconComponent, SkeletonComponent } from '@appshell/ui';

@Component({
  selector: 'app-remote-container',
  standalone: true,
  imports: [NgIf, NgComponentOutlet, CardComponent, SkeletonComponent, IconComponent],
  templateUrl: './remote-container.component.html',
  styleUrls: ['./remote-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteContainerComponent implements OnInit {
  @Input() remoteName?: string;
  @Input() moduleId?: string;
  @Input() title?: string;
  @Input() icon?: string;

  protected readonly component = signal<Type<unknown> | null>(null);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly state = signal<'loading' | 'ready'>('loading');

  private readonly destroyRef = inject(DestroyRef);
  private readonly appState = inject(AppStateService);

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data as Record<string, string | undefined>;
    const moduleId = this.moduleId ?? data['moduleId'];
    if (moduleId) {
      this.appState.setActiveModuleById(moduleId);
    }

    this.remoteName ??= data['remoteName'];
    this.title ??= data['title'];
    this.icon ??= data['icon'];

    if (!this.remoteName) {
      this.errorMessage.set('No se encontró la configuración del remote.');
      this.state.set('ready');
      return;
    }

    from(loadRemoteModule(this.remoteName, './Component'))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (moduleExports) => {
          const resolved = (moduleExports.RemoteEntryComponent ?? moduleExports.default ?? null) as Type<unknown> | null;
          if (!resolved) {
            this.errorMessage.set('El remote no expone RemoteEntryComponent.');
          }
          this.component.set(resolved);
          this.state.set('ready');
        },
        error: (error) => {
          this.errorMessage.set(error?.message ?? 'Error desconocido al cargar el remote.');
          this.state.set('ready');
          console.error(`Remote ${this.remoteName} failed to load`, error);
        }
      });
  }
}
