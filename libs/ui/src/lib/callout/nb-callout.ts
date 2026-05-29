import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbCalloutTone =
  | 'yellow'
  | 'pink'
  | 'mint'
  | 'lavender'
  | 'blue'
  | 'cream'
  | 'white'
  | 'black'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger';

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
      this.toneClass(),
      this.sizeClass(),
      this.layoutClass(),
      this.shadowClass()
    )
  );

  private toneClass(): string {
    const map: Record<NbCalloutTone, string> = {
      yellow: '[--nb-callout-bg:#ffd84d] [--nb-callout-fg:#000000]',
      pink: '[--nb-callout-bg:#ff7eb6] [--nb-callout-fg:#000000]',
      mint: '[--nb-callout-bg:#9bf2cf] [--nb-callout-fg:#000000]',
      lavender: '[--nb-callout-bg:#b8a4ff] [--nb-callout-fg:#000000]',
      blue: '[--nb-callout-bg:#8ae9ff] [--nb-callout-fg:#000000]',
      cream: '[--nb-callout-bg:#fff8e7] [--nb-callout-fg:#000000]',
      white: '[--nb-callout-bg:#ffffff] [--nb-callout-fg:#000000]',
      black: '[--nb-callout-bg:#000000] [--nb-callout-fg:#ffffff]',
      primary:
        '[--nb-callout-bg:var(--nb-primary)] [--nb-callout-fg:var(--nb-primary-foreground)]',
      secondary:
        '[--nb-callout-bg:var(--nb-secondary)] [--nb-callout-fg:var(--nb-secondary-foreground)]',
      accent:
        '[--nb-callout-bg:var(--nb-accent)] [--nb-callout-fg:var(--nb-accent-foreground)]',
      success:
        '[--nb-callout-bg:var(--nb-success)] [--nb-callout-fg:var(--nb-success-foreground)]',
      warning:
        '[--nb-callout-bg:var(--nb-warning)] [--nb-callout-fg:var(--nb-warning-foreground)]',
      danger:
        '[--nb-callout-bg:var(--nb-danger)] [--nb-callout-fg:var(--nb-danger-foreground)]',
    };

    return map[this.tone()];
  }

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
