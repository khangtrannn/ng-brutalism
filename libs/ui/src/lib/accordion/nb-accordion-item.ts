import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
} from '../core/capabilities';
import { NB_ACCORDION } from './accordion.types';

let nextAccordionItemId = 0;

@Component({
  selector: 'nb-accordion-item',
  template: `<ng-content />`,
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: {
    '[attr.data-nb-accordion-item]': '""',
    '[attr.data-slot]': '"accordion-item-surface"',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-orientation]': '"vertical"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionItem {
  private readonly id = nextAccordionItemId++;

  readonly value = input<string>(`neo-accordion-item-${this.id}`);
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  private readonly accordion = inject(NB_ACCORDION);

  readonly triggerId = `neo-accordion-trigger-${this.id}`;
  readonly contentId = `neo-accordion-content-${this.id}`;

  readonly open = computed(() => this.accordion.isItemOpen(this.value()));

  toggle(): void {
    if (!this.disabled()) {
      this.accordion.toggleItem(this.value());
    }
  }
}
