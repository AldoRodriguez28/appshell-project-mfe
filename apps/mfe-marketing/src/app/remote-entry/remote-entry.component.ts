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
  templateUrl: './remote-entry.component.html',
  styleUrls: ['./remote-entry.component.css'],
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
