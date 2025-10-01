import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CardComponent, IconComponent } from '@appshell/ui';

interface Campaign {
  name: string;
  channel: string;
  ctr: string;
  cpa: string;
  status: 'Activa' | 'Programada' | 'Pausada';
}

@Component({
  selector: 'mfe-marketing-entry',
  standalone: true,
  imports: [NgFor, CardComponent, IconComponent],
  template: `
    <section class="space-y-6">
      <header class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Marketing</h1>
        <p class="text-sm text-slate-500 dark:text-slate-300">
          Monitoriza campañas y su desempeño en tiempo real.
        </p>
      </header>

      <div class="grid gap-4 lg:grid-cols-2">
        <ui-card *ngFor="let campaign of campaigns" [title]="campaign.name" [subtitle]="campaign.channel">
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2 text-slate-500 dark:text-slate-300">
              <ui-icon name="bolt" size="sm"></ui-icon>
              CTR: <strong class="text-slate-900 dark:text-white">{{ campaign.ctr }}</strong>
            </div>
            <div class="flex items-center gap-2 text-slate-500 dark:text-slate-300">
              <ui-icon name="paid" size="sm"></ui-icon>
              CPA: <strong class="text-slate-900 dark:text-white">{{ campaign.cpa }}</strong>
            </div>
          </div>
          <p class="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/20 dark:text-blue-200">
            <ui-icon name="play_circle" size="sm"></ui-icon>
            {{ campaign.status }}
          </p>
        </ui-card>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {
  protected readonly campaigns: Campaign[] = [
    { name: 'Lanzamiento Q3 SaaS', channel: 'LinkedIn Ads', ctr: '3.2%', cpa: '$18', status: 'Activa' },
    { name: 'Retención clientes', channel: 'Email Automation', ctr: '4.9%', cpa: '$8', status: 'Programada' },
    { name: 'Campaña SEO contenidos', channel: 'Blog + PR', ctr: '2.1%', cpa: '$12', status: 'Activa' },
    { name: 'Upsell product tour', channel: 'In-app Messages', ctr: '5.4%', cpa: '$6', status: 'Pausada' }
  ];
}
