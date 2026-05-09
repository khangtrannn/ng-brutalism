import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  booleanAttribute,
  OnInit,
  contentChild,
  contentChildren,
} from '@angular/core';

import { NbAccordionItemComponent } from './accordion-item';
import type { NbAccordionType, NbAccordionValue } from './accordion.types';

@Component({
  selector: 'neo-accordion',
  standalone: true,
  template: `
    <div class="w-full max-w-xl">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionComponent {
  readonly type = input<NbAccordionType>('single');

  readonly items = contentChildren(NbAccordionItemComponent);
}
