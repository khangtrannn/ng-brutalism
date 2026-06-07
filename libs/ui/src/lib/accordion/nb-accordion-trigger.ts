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
    <h3>
      <button
        type="button"
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
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path [attr.d]="item.open() ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'" />
        </svg>
      </button>
    </h3>
  `,
  styles: [
    `
      h3 {
        display: flex;
      }

      button {
        display: flex;
        min-height: var(--nb-accordion-trigger-min-height, 3.5rem);
        flex: 1;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
        padding: 1rem;
        text-align: left;
        font-size: 1rem;
        font-weight: 700;
        background-color: var(
          --nb-accordion-trigger-bg,
          var(--nb-accordion-item-bg, var(--nb-surface))
        );
        color: var(
          --nb-accordion-trigger-fg,
          var(--nb-accordion-item-fg, var(--nb-surface-foreground))
        );
        transition: all 200ms;
      }

      button:focus-visible {
        outline: 2px solid var(--nb-accordion-item-border-color, var(--nb-border));
        outline-offset: 2px;
      }

      button:disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      button[data-state='open'] {
        border-bottom-style: solid;
        border-bottom-width: var(
          --nb-accordion-item-border-width,
          var(--nb-border-width)
        );
        border-bottom-color: var(--nb-accordion-item-border-color, var(--nb-border));
      }

      svg {
        width: var(--nb-accordion-trigger-icon-size, 1.5rem);
        height: var(--nb-accordion-trigger-icon-size, 1.5rem);
        flex-shrink: 0;
        fill: none;
        stroke: currentColor;
        stroke-width: var(--nb-accordion-trigger-icon-stroke, 3);
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `,
  ],
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'accordion-trigger' },
    { provide: NB_STYLE_DEFAULTS, useValue: {} },
  ],
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
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
