import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import { NbAccordionItem } from './nb-accordion-item';
import { NB_ACCORDION } from './accordion.types';

@Component({
  selector: 'nb-accordion-trigger',
  exportAs: 'nbAccordionTrigger',
  template: `
    <h3 data-slot="accordion-trigger-heading">
      <button
        #button
        type="button"
        data-slot="accordion-trigger-button"
        [id]="item.triggerId"
        [attr.aria-expanded]="item.open()"
        [attr.aria-controls]="item.contentId"
        [attr.data-state]="item.open() ? 'open' : 'closed'"
        [disabled]="item.disabled()"
        (click)="item.toggle()"
        (keydown)="onKeydown($event)"
      >
        <ng-content />
        <svg
          data-slot="accordion-trigger-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path [attr.d]="item.open() ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'" />
        </svg>
      </button>
    </h3>
  `,
  host: {
    '[attr.data-nb-accordion-trigger]': '""',
  },
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionTrigger {
  readonly item = inject(NbAccordionItem);
  private readonly accordion = inject(NB_ACCORDION);
  private readonly button =
    viewChild.required<ElementRef<HTMLButtonElement>>('button');

  focus(): void {
    this.button().nativeElement.focus();
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.accordion.focusPreviousTrigger(this);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.accordion.focusNextTrigger(this);
        break;
      case 'Home':
        event.preventDefault();
        this.accordion.focusFirstTrigger();
        break;
      case 'End':
        event.preventDefault();
        this.accordion.focusLastTrigger();
        break;
    }
  }
}
