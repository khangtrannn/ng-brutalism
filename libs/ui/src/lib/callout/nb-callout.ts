import { Directive, computed, input } from '@angular/core';

import {
  NbShadowCapability,
  NbToneCapability,
} from '../core/capabilities';
import { nbRadiusValue, type NbRadius } from '../tokens/radius';
import type { NbToneToken } from '../tokens/tone';

export type NbCalloutTone = NbToneToken;

export type NbCalloutSize = 'sm' | 'md' | 'lg' | 'xl';

export type NbCalloutLayout = 'inline' | 'between' | 'center';

export type NbCalloutShadow = 'none' | 'default' | 'hard';

// Optional radius override. When unset, the radius is derived from `size`
// (larger callouts get rounder corners). Set this to opt out of that scaling.
export type NbCalloutRadius = NbRadius;

@Directive({
  selector: '[nbCallout]',
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
  ],
  host: {
    '[attr.data-nb-callout]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-radius]': 'radius() ?? null',
    '[style.border-radius]': 'radiusStyle()',
  },
})
export class NbCallout {
  readonly size = input<NbCalloutSize>('lg');
  readonly layout = input<NbCalloutLayout>('inline');
  readonly radius = input<NbCalloutRadius | undefined>(undefined);

  // Inline style wins over the size-derived CSS rule, so an explicit `radius`
  // always takes precedence; null leaves the size default.
  protected readonly radiusStyle = computed(() => {
    const r = this.radius();

    return r !== undefined ? nbRadiusValue(r) : null;
  });
}
