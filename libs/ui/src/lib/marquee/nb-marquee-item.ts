import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-marquee-item',
  standalone: true,
  host: {
    class: 'mx-4 inline-flex shrink-0 items-center text-4xl whitespace-nowrap',
  },
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbMarqueeItem {}
