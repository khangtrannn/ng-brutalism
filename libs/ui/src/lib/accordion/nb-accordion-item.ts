import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import {
  NbToneCapability,
} from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import { NB_ACCORDION } from './accordion.types';

let nextAccordionItemId = 0;

@Component({
  selector: 'nb-accordion-item',
  template: `<ng-content />`,
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-nb-accordion-item]': '""',
    '[attr.data-slot]': '"accordion-item-surface"',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-orientation]': '"vertical"',
    '[style.--nb-accordion-item-radius]': 'radius()',
    '[style.--nb-accordion-item-shadow]': 'shadow()',
    '[style.--nb-accordion-item-border-width]': 'border()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionItem {
  private readonly id = nextAccordionItemId++;

  readonly value = input<string>(`neo-accordion-item-${this.id}`);
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
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
