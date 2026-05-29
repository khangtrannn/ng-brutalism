import { Directive, booleanAttribute, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbSurfaceTone =
  | 'default'
  | 'background'
  | 'surface'
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
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger';

export type NbSurfaceRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type NbSurfaceBorder = 'none' | 'thin' | 'default' | 'thick';

export type NbSurfaceShadow = 'none' | 'sm' | 'default' | 'hard' | 'heavy';

@Directive({
  selector: '[nbSurface]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-surface]': '""',
    '[attr.data-tone]': 'tone()',
    '[attr.data-radius]': 'radius()',
    '[attr.data-border]': 'border()',
    '[attr.data-shadow]': 'shadow()',
  },
})
export class NbSurface {
  readonly tone = input<NbSurfaceTone>('default');
  readonly radius = input<NbSurfaceRadius>('md');
  readonly border = input<NbSurfaceBorder>('default');
  readonly shadow = input<NbSurfaceShadow>('default');
  readonly clip = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(() =>
    nbClass(
      'relative',
      'bg-(--nb-surface-bg) text-(--nb-surface-fg)',
      'border-(length:--nb-surface-border-width) border-(--nb-surface-border)',
      'rounded-(--nb-surface-radius)',
      'shadow-[var(--nb-surface-shadow)]',
      this.clip() && 'overflow-hidden',
      this.toneClass(),
      this.radiusClass(),
      this.borderClass(),
      this.shadowClass()
    )
  );

  private toneClass(): string {
    const map: Record<NbSurfaceTone, string> = {
      default:
        '[--nb-surface-bg:var(--nb-surface)] [--nb-surface-fg:var(--nb-surface-foreground)]',
      background:
        '[--nb-surface-bg:var(--nb-background)] [--nb-surface-fg:var(--nb-foreground)]',
      surface:
        '[--nb-surface-bg:var(--nb-surface)] [--nb-surface-fg:var(--nb-surface-foreground)]',
      cream: '[--nb-surface-bg:#fff8e7] [--nb-surface-fg:#000000]',
      white: '[--nb-surface-bg:#ffffff] [--nb-surface-fg:#000000]',
      black: '[--nb-surface-bg:#000000] [--nb-surface-fg:#ffffff]',
      yellow: '[--nb-surface-bg:#ffd24a] [--nb-surface-fg:#000000]',
      pink: '[--nb-surface-bg:#ff6aa2] [--nb-surface-fg:#000000]',
      mint: '[--nb-surface-bg:#b8f7c5] [--nb-surface-fg:#000000]',
      lavender: '[--nb-surface-bg:#dcc8ff] [--nb-surface-fg:#000000]',
      blue: '[--nb-surface-bg:#69b7ff] [--nb-surface-fg:#000000]',
      primary:
        '[--nb-surface-bg:var(--nb-primary)] [--nb-surface-fg:var(--nb-primary-foreground)]',
      secondary:
        '[--nb-surface-bg:var(--nb-secondary)] [--nb-surface-fg:var(--nb-secondary-foreground)]',
      accent:
        '[--nb-surface-bg:var(--nb-accent)] [--nb-surface-fg:var(--nb-accent-foreground)]',
      success:
        '[--nb-surface-bg:var(--nb-success)] [--nb-surface-fg:var(--nb-success-foreground)]',
      warning:
        '[--nb-surface-bg:var(--nb-warning)] [--nb-surface-fg:var(--nb-warning-foreground)]',
      danger:
        '[--nb-surface-bg:var(--nb-danger)] [--nb-surface-fg:var(--nb-danger-foreground)]',
    };

    return map[this.tone()];
  }

  private radiusClass(): string {
    const map: Record<NbSurfaceRadius, string> = {
      none: '[--nb-surface-radius:0px]',
      sm: '[--nb-surface-radius:0.375rem]',
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
      heavy: '[--nb-surface-shadow:10px_10px_0_0_var(--nb-shadow)]',
    };

    return map[this.shadow()];
  }
}
