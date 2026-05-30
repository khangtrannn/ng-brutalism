import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import { nbToneTokens, type NbTone } from '../tokens/tone';

export type NbCalloutTone = NbTone;

export type NbCalloutSize = 'sm' | 'md' | 'lg' | 'xl';

export type NbCalloutLayout = 'inline' | 'between' | 'center';

export type NbCalloutShadow = 'none' | 'default' | 'hard';

@Directive({
  selector: '[nbCallout]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-callout]': '""',
    '[attr.data-tone]': 'tone()',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-shadow]': 'shadow()',
    '[style.--nb-callout-bg]': 'toneTokens().bg',
    '[style.--nb-callout-fg]': 'toneTokens().fg',
  },
})
export class NbCallout {
  readonly tone = input<NbCalloutTone>('yellow');
  readonly size = input<NbCalloutSize>('lg');
  readonly layout = input<NbCalloutLayout>('inline');
  readonly shadow = input<NbCalloutShadow>('hard');

  protected readonly classes = computed(() =>
    nbClass(
      'relative inline-flex items-center gap-3',
      'bg-(--nb-callout-bg) text-(--nb-callout-fg)',
      'border-(length:--nb-callout-border-width) border-(--nb-border)',
      'rounded-(--nb-callout-radius)',
      'shadow-[var(--nb-callout-shadow)]',
      'font-black uppercase leading-none',
      this.sizeClass(),
      this.layoutClass(),
      this.shadowClass()
    )
  );

  protected readonly toneTokens = computed(() => nbToneTokens(this.tone()));

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

  private shadowClass(): string {
    const map: Record<NbCalloutShadow, string> = {
      none: '[--nb-callout-shadow:none]',
      default:
        '[--nb-callout-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_0_var(--nb-shadow)]',
      hard: '[--nb-callout-shadow:6px_6px_0_0_var(--nb-shadow)]',
    };

    return map[this.shadow()];
  }
}
