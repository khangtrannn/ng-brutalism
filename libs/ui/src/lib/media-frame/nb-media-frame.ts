import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import { nbToneTokens, type NbTone } from '../tokens/tone';

export type NbMediaFrameTone = NbTone;

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

export type NbMediaFrameBorder = 'none' | 'default' | 'strong';

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
    '[attr.data-border]': 'border()',
    '[style.--nb-media-frame-bg]': 'toneTokens().bg',
    '[style.--nb-media-frame-fg]': 'toneTokens().fg',
  },
})
export class NbMediaFrame {
  readonly tone = input<NbMediaFrameTone>('default');
  readonly ratio = input<NbMediaFrameRatio>('auto');
  readonly fit = input<NbMediaFrameFit>('cover');
  readonly radius = input<NbMediaFrameRadius>('lg');
  readonly shadow = input<NbMediaFrameShadow>('none');
  readonly border = input<NbMediaFrameBorder>('default');

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
      this.ratioClass(),
      this.fitClass(),
      this.radiusClass(),
      this.shadowClass(),
      this.borderClass()
    )
  );

  protected readonly toneTokens = computed(() => nbToneTokens(this.tone()));

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
      none: '[--nb-media-frame-shadow:none]',
      default:
        '[--nb-media-frame-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_0_var(--nb-shadow)]',
      hard: '[--nb-media-frame-shadow:6px_6px_0_0_var(--nb-shadow)]',
    };

    return map[this.shadow()];
  }

  private borderClass(): string {
    const map: Record<NbMediaFrameBorder, string> = {
      none: '[--nb-media-frame-border-width:0px]',
      default: '[--nb-media-frame-border-width:var(--nb-border-width)]',
      strong: '[--nb-media-frame-border-width:3px]',
    };

    return map[this.border()];
  }
}
