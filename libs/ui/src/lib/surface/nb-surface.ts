import { Directive, booleanAttribute, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbPaddingStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type {
  NbBorderStrength,
  NbPadding,
  NbRadius,
  NbShadow,
  NbSize,
  NbTone,
} from '@ng-brutalism/ui/tokens';
import { NbTypography } from '../typography';

export type NbSurfaceTone = NbTone;
export type NbSurfaceRadius = NbRadius;
export type NbSurfaceBorder = NbBorderStrength;
export type NbSurfaceShadow = NbShadow;
export type NbSurfacePadding = NbPadding;

export type NbSurfaceSize = 'auto' | NbSize;
export type NbSurfaceLayout = 'block' | 'center' | 'row' | 'stack';
export type NbSurfaceEdge = 'none' | 'top' | 'bottom';

@Directive({
  selector: '[nbSurface]',
  exportAs: 'nbSurface',
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbTypography, inputs: ['font: typography'] },
  ],
  host: {
    'data-nb-surface': '',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-edge]': 'edge()',
    '[attr.data-clip]': 'clip() ? "" : null',
    '[attr.data-interactive]': 'interactive() ? "" : null',
    '[style.--nb-surface-radius]': 'radius()',
    '[style.--nb-surface-shadow-base]': 'shadow()',
    '[style.--nb-surface-border-width]': 'border()',
    '[style.--nb-surface-padding]': 'padding()',
  },
})
export class NbSurface {
  readonly size = input<NbSurfaceSize>('auto');
  readonly layout = input<NbSurfaceLayout>('block');
  readonly edge = input<NbSurfaceEdge>('none');
  readonly clip = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly interactive = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
  readonly padding = input(null, {
    transform: nbPaddingStyleTransform,
  });
}
