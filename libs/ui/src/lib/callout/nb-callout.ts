import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbShadowCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
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
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'callout' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { tone: 'yellow', shadow: 'hard' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
  ],
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-callout]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-radius]': 'radius() ?? null',
    '[style.--nb-callout-radius]': 'radiusStyle()',
  },
})
export class NbCallout {
  readonly size = input<NbCalloutSize>('lg');
  readonly layout = input<NbCalloutLayout>('inline');
  readonly radius = input<NbCalloutRadius | undefined>(undefined);

  protected readonly classes = computed(() =>
    nbClass(
      'relative inline-flex items-center gap-3',
      'bg-(--nb-callout-bg) text-(--nb-callout-fg)',
      'border-(length:--nb-callout-border-width) border-(--nb-callout-border-color)',
      'rounded-(--nb-callout-radius)',
      'shadow-[var(--nb-callout-shadow)]',
      'font-black uppercase leading-none',
      this.sizeClass(),
      this.layoutClass()
    )
  );

  // Inline style wins over the size-derived `--nb-callout-radius` class, so an
  // explicit `radius` always takes precedence; null leaves the size default.
  protected readonly radiusStyle = computed(() => {
    const r = this.radius();

    return r !== undefined ? nbRadiusValue(r) : null;
  });

  private sizeClass(): string {
    const map: Record<NbCalloutSize, string> = {
      sm: 'min-h-9 px-3 py-2 text-sm [--nb-callout-radius:0.5rem] [--nb-callout-border-width:2px]',
      md: 'min-h-11 px-4 py-2 text-base [--nb-callout-radius:0.625rem] [--nb-callout-border-width:2px]',
      lg: 'min-h-14 px-5 py-3 text-2xl [--nb-callout-radius:0.75rem] [--nb-callout-border-width:3px]',
      xl: 'min-h-20 px-6 py-4 text-5xl [--nb-callout-radius:0.875rem] [--nb-callout-border-width:4px]',
    };

    return map[this.size()];
  }

  private layoutClass(): string {
    const map: Record<NbCalloutLayout, string> = {
      inline: 'justify-start',
      between: 'w-full justify-between',
      center: 'justify-center text-center',
    };

    return map[this.layout()];
  }
}
