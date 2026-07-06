import { Directive, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type { NbBorderStrength } from '../tokens/border';
import type { NbRadius } from '../tokens/radius';
import type { NbTone } from '../tokens/tone';

export type NbCalloutTone = NbTone;

export type NbCalloutSize = 'sm' | 'md' | 'lg' | 'xl';

export type NbCalloutLayout = 'inline' | 'between' | 'center';

export type NbCalloutShadow = 'none' | 'default' | 'hard';

export type NbCalloutRadius = NbRadius;

export type NbCalloutBorder = NbBorderStrength;

@Directive({
  selector: '[nbCallout]',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-nb-callout]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[style.--nb-callout-radius]': 'radius()',
    '[style.--nb-callout-shadow]': 'shadow()',
    '[style.--nb-callout-border-width]': 'border()',
  },
})
export class NbCallout {
  readonly size = input<NbCalloutSize>('lg');
  readonly layout = input<NbCalloutLayout>('inline');
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
}
