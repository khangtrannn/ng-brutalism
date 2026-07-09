import { Directive, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type {
  NbBorderStrength,
  NbRadius,
  NbShadow,
  NbSize,
  NbTone,
} from '@ng-brutalism/ui/tokens';
export type NbCalloutTone = NbTone;

export type NbCalloutSize = NbSize;

export type NbCalloutLayout = 'inline' | 'between' | 'center';

export type NbCalloutShadow = NbShadow;

export type NbCalloutRadius = NbRadius;

export type NbCalloutBorder = NbBorderStrength;

@Directive({
  selector: '[nbCallout]',
  exportAs: 'nbCallout',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    'data-nb-callout': '',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[style.--nb-callout-radius]': 'radius()',
    '[style.--nb-callout-shadow]': 'shadow()',
    '[style.--nb-callout-border-width]': 'border()',
  },
})
export class NbCallout {
  readonly size = input<NbCalloutSize>('md');
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
