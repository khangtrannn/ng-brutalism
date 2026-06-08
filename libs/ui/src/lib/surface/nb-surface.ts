import { Directive, booleanAttribute, input } from '@angular/core';

import {
  NbBorderCapability,
  NbPaddingCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
} from '../core/capabilities';
import type { NbBorderStrength } from '../tokens/border';
import type { NbPadding } from '../tokens/padding';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbToneToken } from '../tokens/tone';
import { NbTypography } from '../typography';

// Public type aliases — kept for API stability. They now point at the shared
// token contracts so a token means the same thing across every primitive.
export type NbSurfaceTone = NbToneToken;
export type NbSurfaceRadius = NbRadius;
export type NbSurfaceBorder = NbBorderStrength;
export type NbSurfaceShadow = NbShadow;
export type NbSurfacePadding = NbPadding;

// Surface-specific anatomy (not shared tokens).
export type NbSurfaceSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl';
export type NbSurfaceLayout = 'block' | 'center' | 'row' | 'stack';
export type NbSurfaceEdge = 'none' | 'top' | 'bottom';

@Directive({
  selector: '[nbSurface]',
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
    { directive: NbPaddingCapability, inputs: ['padding'] },
    // Typography context — exposes nbTypography's `font` input as `typography`.
    { directive: NbTypography, inputs: ['font: typography'] },
  ],
  host: {
    '[attr.data-nb-surface]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-edge]': 'edge()',
    '[attr.data-clip]': 'clip() ? "" : null',
  },
})
export class NbSurface {
  readonly size = input<NbSurfaceSize>('auto');
  readonly layout = input<NbSurfaceLayout>('block');
  readonly edge = input<NbSurfaceEdge>('none');
  readonly clip = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
}
