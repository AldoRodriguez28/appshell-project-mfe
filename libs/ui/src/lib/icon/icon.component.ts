import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-base',
  md: 'text-2xl',
  lg: 'text-4xl'
};

@Component({
  selector: 'ui-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input({ required: true }) name!: string;

  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Input('aria-label') ariaLabel?: string;

  @HostBinding('class')
  get classList(): string {
    const sizeClass = SIZE_CLASSES[this.size] ?? SIZE_CLASSES.md;
    return 'inline-flex items-center justify-center text-inherit ' + sizeClass;
  }

  get ariaHidden(): 'true' | null {
    return this.ariaLabel ? null : 'true';
  }
}
