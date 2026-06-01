import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NbIcon, type NbIconSize } from '../icon';

export type NbIconButtonShape = 'square' | 'circle';
export type NbIconButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type NbIconButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type NbIconButtonVariant = 'default' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning';

// Each size sets the square touch target plus a matching glyph size. The glyph
// size feeds both the projected `<svg>` (via `[&_svg]:size-*`) and the internal
// `nbIcon` (via `iconSize`) so the two authoring styles render identically.
const sizeMap: Record<NbIconButtonSize, string> = {
  sm: 'size-8 [&_svg]:size-4',
  md: 'size-10 [&_svg]:size-5',
  lg: 'size-12 [&_svg]:size-6',
  xl: 'size-14 [&_svg]:size-8',
};

const iconSizeMap: Record<NbIconButtonSize, NbIconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

// Radius tokens mirror NbChip/NbButton (`md` = 0.5rem) so corner rounding is
// consistent across the system. Applies to square buttons; `circle` always
// renders a perfect circle regardless of this value.
const radiusMap: Record<NbIconButtonRadius, string> = {
  none: '[--nb-icon-button-radius:0px]',
  sm: '[--nb-icon-button-radius:0.375rem]',
  md: '[--nb-icon-button-radius:0.5rem]',
  lg: '[--nb-icon-button-radius:0.75rem]',
  xl: '[--nb-icon-button-radius:1rem]',
  full: '[--nb-icon-button-radius:9999px]',
};

@Component({
  selector: 'button[nbIconButton]',
  imports: [NbIcon],
  template: `
    @if (icon(); as iconSrc) {
      <span nbIcon [src]="iconSrc" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.data-shape]': 'shape()',
    '[attr.data-nb-icon-button]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbIconButton {
  readonly shape = input<NbIconButtonShape>('square');
  readonly size = input<NbIconButtonSize>('md');
  readonly radius = input<NbIconButtonRadius>('none');
  readonly variant = input<NbIconButtonVariant>('default');
  // Optional icon, given as an SVG/image URL. Rendered through nbIcon in mask
  // mode so it tints to the button's foreground color and sizes to match the
  // button. For full-color or custom icons, project an `<svg>`/`nbIcon` as
  // content instead — the internal slot is only used when `icon` is set.
  readonly icon = input<string>();

  protected readonly iconSize = computed<NbIconSize>(() => iconSizeMap[this.size()]);

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center justify-center shrink-0 select-none',
      '[--nb-icon-button-bg:var(--nb-main)]',
      '[--nb-icon-button-fg:var(--nb-main-foreground)]',
      '[--nb-icon-button-border:var(--nb-border)]',
      '[--nb-icon-button-radius:0px]',
      'bg-(--nb-icon-button-bg) text-(--nb-icon-button-fg)',
      'border-2 border-(--nb-icon-button-border)',
      'rounded-(--nb-icon-button-radius)',
      'shadow-[var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
      'hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none',
      'transition-all duration-150 ease-out',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      this.sizeClass(),
      radiusMap[this.radius()],
      this.shapeClass(),
      this.variantClass()
    )
  );

  // A circle is just a fully-rounded square: override the radius variable so it
  // wins over any `radius` input (twMerge keeps the last arbitrary property).
  private shapeClass(): string {
    return this.shape() === 'circle' ? '[--nb-icon-button-radius:9999px]' : '';
  }

  private sizeClass(): string {
    return sizeMap[this.size()];
  }

  private variantClass(): string {
    const map: Record<NbIconButtonVariant, string> = {
      default: '',
      neutral: '[--nb-icon-button-bg:var(--nb-background)] [--nb-icon-button-fg:var(--nb-foreground)]',
      primary: '[--nb-icon-button-bg:var(--nb-primary)] [--nb-icon-button-fg:var(--nb-primary-foreground)]',
      secondary: '[--nb-icon-button-bg:var(--nb-secondary)] [--nb-icon-button-fg:var(--nb-secondary-foreground)]',
      accent: '[--nb-icon-button-bg:var(--nb-accent)] [--nb-icon-button-fg:var(--nb-accent-foreground)]',
      danger: '[--nb-icon-button-bg:var(--nb-danger)] [--nb-icon-button-fg:var(--nb-danger-foreground)]',
      success: '[--nb-icon-button-bg:var(--nb-success)] [--nb-icon-button-fg:var(--nb-success-foreground)]',
      warning: '[--nb-icon-button-bg:var(--nb-warning)] [--nb-icon-button-fg:var(--nb-warning-foreground)]',
    };
    return map[this.variant()];
  }
}
