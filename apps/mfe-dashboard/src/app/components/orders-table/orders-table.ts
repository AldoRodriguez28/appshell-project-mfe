import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

export interface OrderRow {
  customer: string;
  status: 'Iniciada' | 'Completada' | 'Rechazada';
  statusVariant: 'gradient' | 'neutral';
  folio: string;
  date: string;
}

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './orders-table.html',
  styleUrl: './orders-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersTable {
  @Input({ required: true }) orders: OrderRow[] = [];

  protected statusClasses(order: OrderRow): string {
    if (order.statusVariant === 'gradient') {
      return 'animated-gradient text-white shadow-lg';
    }

    return 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100';
  }

  protected trackOrder = (_: number, order: OrderRow) => order.folio;
}
