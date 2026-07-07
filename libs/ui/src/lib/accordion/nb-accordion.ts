import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
  model,
} from '@angular/core';

import { NbAccordionItem } from './nb-accordion-item';
import { NbAccordionTrigger } from './nb-accordion-trigger';
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
  readonly triggers = contentChildren(NbAccordionTrigger, {
    descendants: true,
  });

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

  focusPreviousTrigger(current: NbAccordionTrigger): void {
    this.focusRelativeTrigger(current, -1);
  }

  focusNextTrigger(current: NbAccordionTrigger): void {
    this.focusRelativeTrigger(current, 1);
  }

  focusFirstTrigger(): void {
    this.enabledTriggers()[0]?.focus();
  }

  focusLastTrigger(): void {
    const triggers = this.enabledTriggers();
    triggers[triggers.length - 1]?.focus();
  }

  private focusRelativeTrigger(
    current: NbAccordionTrigger,
    direction: 1 | -1
  ): void {
    const triggers = this.enabledTriggers();
    const currentIndex = triggers.indexOf(current);
    const nextIndex =
      (currentIndex + direction + triggers.length) % triggers.length;

    triggers[nextIndex]?.focus();
  }

  private enabledTriggers(): NbAccordionTrigger[] {
    return this.triggers().filter((trigger) => !trigger.item.disabled());
  }
}
