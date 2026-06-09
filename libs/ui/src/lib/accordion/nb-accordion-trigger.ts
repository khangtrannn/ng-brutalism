import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { nbToneVars, type NbTone } from '../tokens/tone';
import { NbAccordionItem } from './nb-accordion-item';

@Component({
  selector: 'nb-accordion-trigger',
  template: `
    <h3 data-slot="accordion-trigger-heading">
      <button
        type="button"
        data-slot="accordion-trigger-button"
        [id]="item.triggerId"
        [attr.aria-expanded]="item.open()"
        [attr.aria-controls]="item.contentId"
        [attr.data-state]="item.open() ? 'open' : 'closed'"
        [disabled]="item.disabled()"
        [style.background-color]="backgroundStyle()"
        [style.color]="foregroundStyle()"
        [style.outline-color]="borderColorStyle()"
        [style.border-bottom-color]="borderColorStyle()"
        (click)="item.toggle()"
      >
        <ng-content />
        <svg data-slot="accordion-trigger-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path [attr.d]="item.open() ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'" />
        </svg>
      </button>
    </h3>
  `,
  host: {
    '[attr.data-nb-accordion-trigger]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionTrigger {
  // Trigger styles an inner <button>, so it resolves only its own optional
  // tone. Without a trigger tone, the button inherits the item host surface.
  readonly tone = input<NbTone | undefined>(undefined);

  protected readonly item = inject(NbAccordionItem);

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  protected readonly backgroundStyle = computed(
    () => this.toneVars()?.bg ?? null,
  );
  protected readonly foregroundStyle = computed(
    () => this.toneVars()?.fg ?? null,
  );
  protected readonly borderColorStyle = computed(
    () => this.toneVars()?.borderColor ?? null,
  );
}
