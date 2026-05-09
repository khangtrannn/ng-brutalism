import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NbAccordionComponent } from './accordion';

let nextAccordionItemId = 0;

@Component({
  selector: 'neo-accordion-item',
  standalone: true,
  template: `
    <div class="rounded-base overflow-hidden border-2 border-border shadow-shadow">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionItemComponent {
  readonly open = signal(false);
}
