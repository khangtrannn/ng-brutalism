import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NB_ACCORDION } from './accordion.types';

let nextAccordionItemId = 0;

@Component({
  selector: 'nb-accordion-item',
  standalone: true,
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  host: {
    class: 'block',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-orientation]': '"vertical"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionItemComponent {
  private readonly id = nextAccordionItemId++;

  readonly value = input(`neo-accordion-item-${this.id}`);
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly accordion = inject(NB_ACCORDION);

  readonly triggerId = `neo-accordion-trigger-${this.id}`;
  readonly contentId = `neo-accordion-content-${this.id}`;

  readonly open = computed(() => this.accordion.isItemOpen(this.value()));

  protected readonly classes = computed(() =>
    nbClass(
      'overflow-hidden rounded-nb border-2 border-(--nb-border)',
      'bg-(--nb-surface) text-(--nb-surface-foreground) shadow-nb',
      this.disabled() && 'opacity-50'
    )
  );

  toggle(): void {
    if (!this.disabled()) {
      this.accordion.toggleItem(this.value());
    }
  }
}
