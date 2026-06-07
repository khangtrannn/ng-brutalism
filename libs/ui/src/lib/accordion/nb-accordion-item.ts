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
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { NB_ACCORDION } from './accordion.types';

let nextAccordionItemId = 0;

@Component({
  selector: 'nb-accordion-item',
  template: `
    <div
      [style.background]="backgroundStyle()"
      [style.color]="foregroundStyle()"
      [style.border-color]="borderColorStyle()"
      [style.border-radius]="radiusStyle()"
      [style.box-shadow]="shadowStyle()"
      [style.border-width]="borderWidthStyle()"
    >
      <ng-content />
    </div>
  `,
  styles: [
    `
      div {
        overflow: hidden;
        border-style: solid;
        border-radius: var(--nb-accordion-item-radius, var(--nb-radius));
        border-width: var(--nb-accordion-item-border-width, var(--nb-border-width));
        border-color: var(--nb-accordion-item-border-color, var(--nb-border));
        background-color: var(--nb-accordion-item-bg, var(--nb-surface));
        color: var(--nb-accordion-item-fg, var(--nb-surface-foreground));
        box-shadow: var(
          --nb-accordion-item-shadow,
          var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)
        );
      }

      :host([data-disabled]) {
        opacity: 0.5;
      }
    `,
  ],
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'accordion-item' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'surface',
        radius: 'md',
        shadow: 'default',
        border: 'default',
      } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: {
    class: 'block',
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
  private readonly tone = inject(NbToneCapability);
  private readonly radius = inject(NbRadiusCapability);
  private readonly shadow = inject(NbShadowCapability);
  private readonly border = inject(NbBorderCapability);

  readonly triggerId = `neo-accordion-trigger-${this.id}`;
  readonly contentId = `neo-accordion-content-${this.id}`;

  readonly open = computed(() => this.accordion.isItemOpen(this.value()));
  readonly backgroundStyle = computed(() => this.tone.background());
  readonly foregroundStyle = computed(() => this.tone.foreground());
  readonly borderColorStyle = computed(() => this.tone.borderColor());
  readonly radiusStyle = computed(() => this.radius.value());
  readonly shadowStyle = computed(() => this.shadow.value());
  readonly borderWidthStyle = computed(() => this.border.width());

  toggle(): void {
    if (!this.disabled()) {
      this.accordion.toggleItem(this.value());
    }
  }
}
