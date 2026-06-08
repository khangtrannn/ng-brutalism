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
      data-slot="accordion-item-surface"
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
    '[attr.data-nb-accordion-item]': '""',
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
  readonly backgroundStyle = this.tone.background;
  readonly foregroundStyle = this.tone.foreground;
  readonly borderColorStyle = this.tone.borderColor;
  readonly radiusStyle = this.radius.value;
  readonly shadowStyle = this.shadow.value;
  readonly borderWidthStyle = this.border.width;

  toggle(): void {
    if (!this.disabled()) {
      this.accordion.toggleItem(this.value());
    }
  }
}
