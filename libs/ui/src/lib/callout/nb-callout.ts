import { Directive, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type { NbRadius } from '../tokens/radius';
import type { NbTone } from '../tokens/tone';

export type NbCalloutTone = NbTone;

export type NbCalloutSize = 'sm' | 'md' | 'lg' | 'xl';

export type NbCalloutLayout = 'inline' | 'between' | 'center';

export type NbCalloutShadow = 'none' | 'default' | 'hard';

// Optional radius override. When unset, the radius is derived from `size`
// (larger callouts get rounder corners). Set this to opt out of that scaling.
export type NbCalloutRadius = NbRadius;

@Directive({
  selector: '[nbCallout]',
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-nb-callout]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[style.--nb-callout-radius]': 'radius()',
    '[style.--nb-callout-shadow]': 'shadow()',
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
}
