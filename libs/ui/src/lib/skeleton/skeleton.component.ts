import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  template: `
    <span
      class="inline-block animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
      [style.width.px]="width"
      [style.height.px]="height"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
  @Input() width = 160;
  @Input() height = 16;
}
