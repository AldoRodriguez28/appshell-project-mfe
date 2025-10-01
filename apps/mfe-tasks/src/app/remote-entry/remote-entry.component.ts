import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { CardComponent, IconComponent } from '@appshell/ui';

type TaskStatus = 'Pendiente' | 'En progreso' | 'Completada';

interface TaskItem {
  title: string;
  assignee: string;
  status: TaskStatus;
  due: string;
}

@Component({
  selector: 'mfe-tasks-entry',
  standalone: true,
  imports: [NgClass, NgFor, CardComponent, IconComponent],
  template: `
    <section class="space-y-6">
      <header class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Lista de tareas</h1>
        <p class="text-sm text-slate-500 dark:text-slate-300">
          Gestiona el trabajo pendiente y asignado a cada equipo.
        </p>
      </header>

      <ui-card>
        <div class="overflow-x-auto">
          <table class="min-w-full border-separate border-spacing-y-2 text-sm">
            <thead class="text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th class="px-4 py-2">Título</th>
                <th class="px-4 py-2">Responsable</th>
                <th class="px-4 py-2">Estado</th>
                <th class="px-4 py-2">Vence</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 dark:text-slate-200">
              <tr
                *ngFor="let task of tasks"
                class="rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition dark:bg-slate-800 dark:ring-slate-700"
              >
                <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">{{ task.title }}</td>
                <td class="px-4 py-3 flex items-center gap-2">
                  <span class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-200">
                    {{ initials(task.assignee) }}
                  </span>
                  {{ task.assignee }}
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                    [ngClass]="statusClass(task.status)"
                  >
                    <ui-icon [name]="statusIcon(task.status)" size="sm"></ui-icon>
                    {{ task.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-slate-500 dark:text-slate-300">{{ task.due }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ui-card>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {
  protected readonly tasks: TaskItem[] = [
    { title: 'Diseñar wireframes de onboarding', assignee: 'Patricia Gómez', status: 'En progreso', due: '23 AGO' },
    { title: 'Publicar campaña SEM', assignee: 'Luis Rodríguez', status: 'Pendiente', due: '21 AGO' },
    { title: 'Actualizar políticas IAM', assignee: 'Fernanda Ruiz', status: 'Completada', due: '18 AGO' },
    { title: 'Analizar churn mensual', assignee: 'Iván Torres', status: 'En progreso', due: '26 AGO' }
  ];

  initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  statusClass(status: TaskStatus): string {
    switch (status) {
      case 'Completada':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200';
      case 'En progreso':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200';
    }
  }

  statusIcon(status: TaskStatus): string {
    switch (status) {
      case 'Completada':
        return 'check_circle';
      case 'En progreso':
        return 'hourglass_top';
      default:
        return 'radio_button_unchecked';
    }
  }
}
