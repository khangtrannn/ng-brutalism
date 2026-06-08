import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import {
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
} from '../core/capabilities';
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
        [style.border-bottom-width]="item.borderWidthStyle()"
        (click)="item.toggle()"
      >
        <ng-content />
        <svg data-slot="accordion-trigger-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path [attr.d]="item.open() ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'" />
        </svg>
      </button>
    </h3>
  `,
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'accordion-trigger' },
    { provide: NB_STYLE_DEFAULTS, useValue: {} },
  ],
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-nb-accordion-trigger]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionTrigger {
  protected readonly item = inject(NbAccordionItem);
  private readonly tone = inject(NbToneCapability);

  protected readonly backgroundStyle = computed(
    () => this.tone.background() ?? this.item.backgroundStyle()
  );
  protected readonly foregroundStyle = computed(
    () => this.tone.foreground() ?? this.item.foregroundStyle()
  );
  protected readonly borderColorStyle = computed(
    () => this.tone.borderColor() ?? this.item.borderColorStyle()
  );
}
