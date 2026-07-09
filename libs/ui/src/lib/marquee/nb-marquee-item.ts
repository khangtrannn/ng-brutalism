import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-marquee-item',
  exportAs: 'nbMarqueeItem',
  host: {
    'data-nb-marquee-item': '',
  },
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbMarqueeItem {}
