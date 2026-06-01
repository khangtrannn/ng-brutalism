import { Directive } from '@angular/core';

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
  },
})
export class NbBadge {
  protected readonly classes = nbClass(
    'inline-flex items-center gap-1.5',
    'rounded-(--nb-badge-radius)',
    'border-(length:--nb-badge-border-width) border-(--nb-badge-border-color)',
    'bg-(--nb-badge-bg) text-(--nb-badge-fg)',
    'px-2.5 py-0.5 text-xs font-bold',
    'shadow-[var(--nb-badge-shadow)]'
  );
}
