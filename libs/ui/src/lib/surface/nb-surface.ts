import { Directive, booleanAttribute, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbBorderCapability,
  NbPaddingCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbBorderStrength } from '../tokens/border';
import type { NbPadding } from '../tokens/padding';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbToneToken } from '../tokens/tone';

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
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'surface' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'default',
        radius: 'md',
        shadow: 'default',
        border: 'default',
        padding: 'none',
      } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
    { directive: NbPaddingCapability, inputs: ['padding'] },
  ],
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-surface]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-padding]': 'padding()',
    '[attr.data-edge]': 'edge()',
  },
})
export class NbSurface {
  readonly size = input<NbSurfaceSize>('auto');
  readonly layout = input<NbSurfaceLayout>('block');
  readonly padding = input<NbSurfacePadding>('none');
  readonly edge = input<NbSurfaceEdge>('none');
  readonly clip = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  // Tone, radius, shadow, and border-width are written as `--nb-surface-*`
  // variables by the composed capabilities; here we only *consume* them.
  protected readonly classes = computed(() =>
    nbClass(
      'relative',
      'bg-(--nb-surface-bg) text-(--nb-surface-fg)',
      'border-(length:--nb-surface-border-width) border-(--nb-surface-border-color)',
      'rounded-(--nb-surface-radius)',
      'shadow-[var(--nb-surface-shadow)]',
      'p-[var(--nb-surface-padding)]',
      this.clip() && 'overflow-hidden',
      this.sizeClass(),
      this.layoutClass(),
      this.edgeClass()
    )
  );

  private sizeClass(): string {
    const map: Record<NbSurfaceSize, string> = {
      auto: '',
      sm: 'size-8 shrink-0',
      md: 'size-10 shrink-0',
      lg: 'size-11 shrink-0',
      xl: 'size-12 shrink-0',
    };

    return map[this.size()];
  }

  private layoutClass(): string {
    const map: Record<NbSurfaceLayout, string> = {
      block: '',
      center: 'inline-flex items-center justify-center',
      row: 'flex items-center',
      stack: 'flex flex-col',
    };

    return map[this.layout()];
  }

  private edgeClass(): string {
    const map: Record<NbSurfaceEdge, string> = {
      none: '',
      top: '[--nb-surface-edge-width:2px] [--nb-surface-edge-color:var(--nb-border)] border-t-(length:--nb-surface-edge-width) border-t-(--nb-surface-edge-color)',
      bottom:
        '[--nb-surface-edge-width:2px] [--nb-surface-edge-color:var(--nb-border)] border-b-(length:--nb-surface-edge-width) border-b-(--nb-surface-edge-color)',
    };

    return map[this.edge()];
  }
}
