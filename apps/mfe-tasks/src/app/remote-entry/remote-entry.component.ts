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
  templateUrl: './remote-entry.component.html',
  styleUrls: ['./remote-entry.component.css'],
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
