import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

export interface MetricCard {
  title: string;
  value: string;
  trend: string;
  trendColor: 'positive' | 'negative';
}

@Component({
  selector: 'app-metrics-grid',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './metrics-grid.html',
  styleUrl: './metrics-grid.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricsGrid {
  @Input({ required: true }) metrics: MetricCard[] = [];

  protected trendClass(trend: MetricCard['trendColor']): string {
    return trend === 'positive' ? 'text-green-500' : 'text-red-500';
  }

  protected metricTrack = (_: number, metric: MetricCard) => metric.title;
}
