import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MetricsGrid, MetricCard } from '../metrics-grid/metrics-grid';
import { OrdersTable, OrderRow } from '../orders-table/orders-table';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [MetricsGrid, OrdersTable],
  templateUrl: './dashboard-content.html',
  styleUrl: './dashboard-content.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardContentComponent {
  protected readonly metrics: MetricCard[] = [
    { title: 'Ordenes Abiertas', value: '35', trend: '+10%', trendColor: 'positive' },
    { title: 'Ordenes de Hoy', value: '8', trend: '-5%', trendColor: 'negative' },
    { title: 'Tiempo Promedio', value: '3.2 h', trend: '+2%', trendColor: 'positive' }
  ];

  protected readonly orders: OrderRow[] = [
    { customer: 'MALLAS ORIÓN-FUNDADORES', status: 'Iniciada', statusVariant: 'gradient', folio: '# 47856890', date: '12-09-2025' },
    { customer: 'FUMICOUNTRY AMBIENTAL SAS FUMICOUNTRY AMBIENTAL SAS-BOGOTÁ', status: 'Completada', statusVariant: 'neutral', folio: '# 09875432', date: '12-09-2025' },
    { customer: 'GRÚAS ECONÓMICAS DELTA-NIÑOS HEROES', status: 'Rechazada', statusVariant: 'neutral', folio: '# 67894321', date: '12-09-2025' },
    { customer: 'Spring Launch', status: 'Iniciada', statusVariant: 'gradient', folio: '# 12340987', date: '12-09-2025' },
    { customer: 'Year-End Clearance', status: 'Completada', statusVariant: 'neutral', folio: '# 92018476', date: '12-09-2025' }
  ];
}
