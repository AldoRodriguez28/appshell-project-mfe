import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CardComponent, IconComponent } from '@appshell/ui';

interface Member {
  name: string;
  email: string;
  role: string;
  status: 'Activo' | 'Invitado' | 'Suspendido';
}

@Component({
  selector: 'mfe-iam-entry',
  standalone: true,
  imports: [NgFor, CardComponent, IconComponent],
  templateUrl: './remote-entry.component.html',
  styleUrls: ['./remote-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {
  protected readonly members: Member[] = [
    { name: 'Sandra Páez', email: 'sandra.paez@example.com', role: 'Administrador', status: 'Activo' },
    { name: 'Marco Cárdenas', email: 'marco.cardenas@example.com', role: 'Auditor', status: 'Activo' },
    { name: 'Ingrid Flores', email: 'ingrid.flores@example.com', role: 'Soporte', status: 'Invitado' },
    { name: 'David Pino', email: 'david.pino@example.com', role: 'Marketing', status: 'Activo' }
  ];
}
