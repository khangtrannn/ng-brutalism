import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
  model,
} from '@angular/core';

import { NbAccordionItem } from './nb-accordion-item';
import {
  NB_ACCORDION,
  type NbAccordionController,
  type NbAccordionType,
  type NbAccordionValue,
} from './accordion.types';

@Component({
  selector: 'nb-accordion',
  exportAs: 'nbAccordion',
  template: `
    <div data-slot="accordion-items">
      <ng-content />
    </div>
  `,
  host: {
    '[attr.data-nb-accordion]': '""',
    '[attr.data-orientation]': '"vertical"',
    '[attr.data-type]': 'type()',
  },
  providers: [{ provide: NB_ACCORDION, useExisting: NbAccordion }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordion implements NbAccordionController {
  readonly type = input<NbAccordionType>('single');
  readonly collapsible = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly value = model<NbAccordionValue>(null);

  readonly items = contentChildren(NbAccordionItem);

  isItemOpen(value: string): boolean {
    const currentValue = this.value();

    return Array.isArray(currentValue)
      ? currentValue.includes(value)
      : currentValue === value;
  }

  toggleItem(value: string): void {
    if (this.type() === 'multiple') {
      this.toggleMultipleItem(value);
      return;
    }

    if (this.isItemOpen(value)) {
      if (this.collapsible()) {
        this.value.set(null);
      }

      return;
    }

    this.value.set(value);
  }

  private toggleMultipleItem(value: string): void {
    const currentValue = this.value();
    const values = Array.isArray(currentValue)
      ? currentValue
      : currentValue
      ? [currentValue]
      : [];

    this.value.set(
      values.includes(value)
        ? values.filter((itemValue) => itemValue !== value)
        : [...values, value]
    );
  }
}
