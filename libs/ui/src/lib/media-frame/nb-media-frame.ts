import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbMediaFrameTone =
  | 'default'
  | 'cream'
  | 'white'
  | 'black'
  | 'yellow'
  | 'pink'
  | 'mint'
  | 'lavender'
  | 'blue'
  | 'primary'
  | 'secondary'
  | 'accent';

export type NbMediaFrameRatio =
  | 'auto'
  | '1/1'
  | '4/3'
  | '3/2'
  | '16/9'
  | '21/9';

export type NbMediaFrameFit = 'cover' | 'contain' | 'fill';

export type NbMediaFrameRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type NbMediaFrameShadow = 'none' | 'default' | 'hard';

@Directive({
  selector: '[nbMediaFrame]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-media-frame]': '""',
    '[attr.data-tone]': 'tone()',
    '[attr.data-ratio]': 'ratio()',
    '[attr.data-fit]': 'fit()',
    '[attr.data-radius]': 'radius()',
    '[attr.data-shadow]': 'shadow()',
  },
})
export class NbMediaFrame {
  readonly tone = input<NbMediaFrameTone>('default');
  readonly ratio = input<NbMediaFrameRatio>('auto');
  readonly fit = input<NbMediaFrameFit>('cover');
  readonly radius = input<NbMediaFrameRadius>('lg');
  readonly shadow = input<NbMediaFrameShadow>('none');

  protected readonly classes = computed(() =>
    nbClass(
      'relative isolate block overflow-hidden',
      'border-(length:--nb-media-frame-border-width) border-(--nb-border)',
      'bg-(--nb-media-frame-bg) text-(--nb-media-frame-fg)',
      'rounded-(--nb-media-frame-radius)',
      'shadow-[var(--nb-media-frame-shadow)]',
      '[&>img]:h-full [&>img]:w-full',
      '[&>video]:h-full [&>video]:w-full',
      '[&>picture]:block [&>picture]:h-full [&>picture]:w-full',
      '[&>picture>img]:h-full [&>picture>img]:w-full',
      this.toneClass(),
      this.ratioClass(),
      this.fitClass(),
      this.radiusClass(),
      this.shadowClass()
    )
  );

  private toneClass(): string {
    const map: Record<NbMediaFrameTone, string> = {
      default:
        '[--nb-media-frame-bg:var(--nb-surface)] [--nb-media-frame-fg:var(--nb-surface-foreground)]',
      cream:
        '[--nb-media-frame-bg:#fff8e7] [--nb-media-frame-fg:#000000]',
      white:
        '[--nb-media-frame-bg:#ffffff] [--nb-media-frame-fg:#000000]',
      black:
        '[--nb-media-frame-bg:#000000] [--nb-media-frame-fg:#ffffff]',
      yellow:
        '[--nb-media-frame-bg:#ffd84d] [--nb-media-frame-fg:#000000]',
      pink: '[--nb-media-frame-bg:#ff7eb6] [--nb-media-frame-fg:#000000]',
      mint: '[--nb-media-frame-bg:#9bf2cf] [--nb-media-frame-fg:#000000]',
      lavender:
        '[--nb-media-frame-bg:#b8a4ff] [--nb-media-frame-fg:#000000]',
      blue: '[--nb-media-frame-bg:#8ae9ff] [--nb-media-frame-fg:#000000]',
      primary:
        '[--nb-media-frame-bg:var(--nb-primary)] [--nb-media-frame-fg:var(--nb-primary-foreground)]',
      secondary:
        '[--nb-media-frame-bg:var(--nb-secondary)] [--nb-media-frame-fg:var(--nb-secondary-foreground)]',
      accent:
        '[--nb-media-frame-bg:var(--nb-accent)] [--nb-media-frame-fg:var(--nb-accent-foreground)]',
    };

    return map[this.tone()];
  }

  private ratioClass(): string {
    const map: Record<NbMediaFrameRatio, string> = {
      auto: '',
      '1/1': 'aspect-square',
      '4/3': 'aspect-[4/3]',
      '3/2': 'aspect-[3/2]',
      '16/9': 'aspect-video',
      '21/9': 'aspect-[21/9]',
    };

    return map[this.ratio()];
  }

  private fitClass(): string {
    const map: Record<NbMediaFrameFit, string> = {
      cover:
        '[&>img]:object-cover [&>video]:object-cover [&>picture>img]:object-cover',
      contain:
        '[&>img]:object-contain [&>video]:object-contain [&>picture>img]:object-contain',
      fill:
        '[&>img]:object-fill [&>video]:object-fill [&>picture>img]:object-fill',
    };

    return map[this.fit()];
  }

  private radiusClass(): string {
    const map: Record<NbMediaFrameRadius, string> = {
      none: '[--nb-media-frame-radius:0px]',
      sm: '[--nb-media-frame-radius:0.375rem]',
      md: '[--nb-media-frame-radius:var(--nb-radius)]',
      lg: '[--nb-media-frame-radius:1rem]',
      xl: '[--nb-media-frame-radius:1.5rem]',
      full: '[--nb-media-frame-radius:9999px]',
    };

    return map[this.radius()];
  }

  private shadowClass(): string {
    const map: Record<NbMediaFrameShadow, string> = {
      none:
        '[--nb-media-frame-shadow:none] [--nb-media-frame-border-width:var(--nb-border-width)]',
      default:
        '[--nb-media-frame-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_0_var(--nb-shadow)] [--nb-media-frame-border-width:var(--nb-border-width)]',
      hard:
        '[--nb-media-frame-shadow:6px_6px_0_0_var(--nb-shadow)] [--nb-media-frame-border-width:3px]',
    };

    return map[this.shadow()];
  }
}
