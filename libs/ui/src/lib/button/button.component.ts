import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'ghost' = 'primary';
  @Input('aria-label') ariaLabel?: string;

  @HostBinding('class') hostClass = 'inline-flex';

  get variantClasses(): string {
    return this.variant === 'ghost'
      ? 'text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-400 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-500'
      : 'bg-primary text-primary-foreground hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400';
  }
}
