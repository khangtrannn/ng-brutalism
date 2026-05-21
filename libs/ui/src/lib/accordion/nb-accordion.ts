import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
  template: `
    <div class="flex w-full flex-col gap-3">
      <ng-content />
    </div>
  `,
  host: {
    class: 'block w-full',
    '[attr.data-orientation]': '"vertical"',
    '[attr.data-type]': 'type()',
  },
  providers: [{ provide: NB_ACCORDION, useExisting: NbAccordion }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordion implements NbAccordionController, OnInit {
  readonly type = input<NbAccordionType>('single');
  readonly collapsible = input(false, { transform: booleanAttribute });
  readonly defaultValue = input<NbAccordionValue>(null);
  readonly value = model<NbAccordionValue>(null);

  readonly items = contentChildren(NbAccordionItem);

  ngOnInit(): void {
    if (this.value() === null && this.defaultValue() !== null) {
      this.value.set(this.normalizeValue(this.defaultValue()));
    }
  }

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

  private normalizeValue(value: NbAccordionValue): NbAccordionValue {
    if (this.type() === 'multiple') {
      return Array.isArray(value) ? value : value ? [value] : [];
    }

    return Array.isArray(value) ? value[0] ?? null : value;
  }
}
