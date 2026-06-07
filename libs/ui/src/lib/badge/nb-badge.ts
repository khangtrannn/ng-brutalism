import { Directive, computed, inject } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbBorderStrength } from '../tokens/border';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbToneToken } from '../tokens/tone';

export type NbBadgeTone = NbToneToken;
export type NbBadgeRadius = NbRadius;
export type NbBadgeShadow = NbShadow;
export type NbBadgeBorder = NbBorderStrength;

@Directive({
  selector: 'span[nbBadge]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'badge' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'white',
        radius: 'full',
        shadow: 'sm',
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
    '[class]': 'classes',
    '[attr.data-nb-badge]': '""',
    '[style.background]': 'backgroundStyle()',
    '[style.color]': 'foregroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-radius]': 'radiusStyle()',
    '[style.box-shadow]': 'shadowStyle()',
    '[style.border-width]': 'borderWidthStyle()',
  },
})
export class NbBadge {
  protected readonly classes = nbClass(
    'inline-flex items-center gap-1.5',
    'px-2.5 py-0.5 text-xs font-bold'
  );

  private readonly tone = inject(NbToneCapability);
  private readonly radius = inject(NbRadiusCapability);
  private readonly shadow = inject(NbShadowCapability);
  private readonly border = inject(NbBorderCapability);

  protected readonly backgroundStyle = computed(() => this.tone.background());
  protected readonly foregroundStyle = computed(() => this.tone.foreground());
  protected readonly borderColorStyle = computed(() => this.tone.borderColor());
  protected readonly radiusStyle = computed(() => this.radius.value());
  protected readonly shadowStyle = computed(() => this.shadow.value());
  protected readonly borderWidthStyle = computed(() => this.border.width());
}
