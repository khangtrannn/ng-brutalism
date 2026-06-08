import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import { nbBorderWidthValue, type NbBorderStrength } from '../tokens/border';
import { nbRadiusValue, type NbRadius } from '../tokens/radius';
import { nbShadowValue, type NbShadow } from '../tokens/shadow';
import { nbToneVars, type NbToneToken } from '../tokens/tone';
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

  // The item surface is an inner element, so it resolves the style tokens
  // itself rather than composing the host-painting capabilities.
  readonly tone = input<NbToneToken | undefined>(undefined);
  readonly radius = input<NbRadius | undefined>(undefined);
  readonly shadow = input<NbShadow | undefined>(undefined);
  readonly border = input<NbBorderStrength | undefined>(undefined);

  private readonly accordion = inject(NB_ACCORDION);

  readonly triggerId = `neo-accordion-trigger-${this.id}`;
  readonly contentId = `neo-accordion-content-${this.id}`;

  readonly open = computed(() => this.accordion.isItemOpen(this.value()));

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  readonly backgroundStyle = computed(() => this.toneVars()?.bg ?? null);
  readonly foregroundStyle = computed(() => this.toneVars()?.fg ?? null);
  readonly borderColorStyle = computed(
    () => this.toneVars()?.borderColor ?? null,
  );
  readonly radiusStyle = computed(() => {
    const radius = this.radius();
    return radius ? nbRadiusValue(radius) : null;
  });
  readonly shadowStyle = computed(() => {
    const shadow = this.shadow();
    return shadow ? nbShadowValue(shadow) : null;
  });
  readonly borderWidthStyle = computed(() => {
    const border = this.border();
    return border ? nbBorderWidthValue(border) : null;
  });

  toggle(): void {
    if (!this.disabled()) {
      this.accordion.toggleItem(this.value());
    }
  }
}
