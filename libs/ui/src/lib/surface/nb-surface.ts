import { Directive, booleanAttribute, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import { nbToneTokens, type NbTone, type NbToneTokens } from '../tokens/tone';

export type NbSurfaceTone =
  | NbTone
  | 'background'
  | 'surface';

export type NbSurfaceRadius =
  | 'none'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full';

export type NbSurfaceBorder =
  | 'none'
  | 'thin'
  | 'default'
  | 'strong'
  | 'thick';

export type NbSurfaceShadow =
  | 'none'
  | 'sm'
  | 'default'
  | 'hard'
  | 'lifted'
  | 'heavy';

export type NbSurfaceSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl';

export type NbSurfaceLayout = 'block' | 'center' | 'row' | 'stack';

export type NbSurfacePadding = 'none' | 'sm' | 'md' | 'lg';

export type NbSurfaceEdge = 'none' | 'top' | 'bottom';

@Directive({
  selector: '[nbSurface]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-surface]': '""',
    '[attr.data-tone]': 'tone()',
    '[attr.data-radius]': 'radius()',
    '[attr.data-border]': 'border()',
    '[attr.data-shadow]': 'shadow()',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-padding]': 'padding()',
    '[attr.data-edge]': 'edge()',
    '[style.--nb-surface-bg]': 'toneTokens().bg',
    '[style.--nb-surface-fg]': 'toneTokens().fg',
  },
})
export class NbSurface {
  readonly tone = input<NbSurfaceTone>('default');
  readonly radius = input<NbSurfaceRadius>('md');
  readonly border = input<NbSurfaceBorder>('default');
  readonly shadow = input<NbSurfaceShadow>('default');
  readonly size = input<NbSurfaceSize>('auto');
  readonly layout = input<NbSurfaceLayout>('block');
  readonly padding = input<NbSurfacePadding>('none');
  readonly edge = input<NbSurfaceEdge>('none');
  readonly clip = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(() =>
    nbClass(
      'relative',
      'bg-(--nb-surface-bg) text-(--nb-surface-fg)',
      'border-(length:--nb-surface-border-width) border-(--nb-surface-border)',
      'rounded-(--nb-surface-radius)',
      'shadow-[var(--nb-surface-shadow)]',
      this.clip() && 'overflow-hidden',
      this.radiusClass(),
      this.borderClass(),
      this.shadowClass(),
      this.sizeClass(),
      this.layoutClass(),
      this.paddingClass(),
      this.edgeClass()
    )
  );

  protected readonly toneTokens = computed<NbToneTokens>(() => {
    const tone = this.tone();

    if (tone === 'background') {
      return {
        bg: 'var(--nb-background)',
        fg: 'var(--nb-foreground)',
      };
    }

    if (tone === 'surface') {
      return nbToneTokens('default');
    }

    return nbToneTokens(tone);
  });

  private radiusClass(): string {
    const map: Record<NbSurfaceRadius, string> = {
      none: '[--nb-surface-radius:0px]',
      sm: '[--nb-surface-radius:0.375rem]',
      base: '[--nb-surface-radius:0.5rem]',
      md: '[--nb-surface-radius:var(--nb-radius)]',
      lg: '[--nb-surface-radius:1rem]',
      xl: '[--nb-surface-radius:1.5rem]',
      full: '[--nb-surface-radius:9999px]',
    };

    return map[this.radius()];
  }

  private borderClass(): string {
    const map: Record<NbSurfaceBorder, string> = {
      none: '[--nb-surface-border-width:0px] [--nb-surface-border:transparent]',
      thin: '[--nb-surface-border-width:1px] [--nb-surface-border:var(--nb-border)]',
      default:
        '[--nb-surface-border-width:var(--nb-border-width)] [--nb-surface-border:var(--nb-border)]',
      strong:
        '[--nb-surface-border-width:3px] [--nb-surface-border:var(--nb-border)]',
      thick:
        '[--nb-surface-border-width:4px] [--nb-surface-border:var(--nb-border)]',
    };

    return map[this.border()];
  }

  private shadowClass(): string {
    const map: Record<NbSurfaceShadow, string> = {
      none: '[--nb-surface-shadow:none]',
      sm: '[--nb-surface-shadow:2px_2px_0_0_var(--nb-shadow)]',
      default:
        '[--nb-surface-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_0_var(--nb-shadow)]',
      hard: '[--nb-surface-shadow:6px_6px_0_0_var(--nb-shadow)]',
      lifted: '[--nb-surface-shadow:7px_7px_0_0_var(--nb-shadow)]',
      heavy: '[--nb-surface-shadow:10px_10px_0_0_var(--nb-shadow)]',
    };

    return map[this.shadow()];
  }

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

  private paddingClass(): string {
    const map: Record<NbSurfacePadding, string> = {
      none: '',
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    };

    return map[this.padding()];
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
