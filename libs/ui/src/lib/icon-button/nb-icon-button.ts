import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbIconButtonShape = 'square' | 'circle';
export type NbIconButtonSize = 'sm' | 'default' | 'lg';
export type NbIconButtonVariant = 'default' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning';

@Directive({
  selector: 'button[nbIconButton]',
  host: {
    '[class]': 'classes()',
    '[attr.data-shape]': 'shape()',
    '[attr.data-nb-icon-button]': '""',
  },
})
export class NbIconButton {
  readonly shape = input<NbIconButtonShape>('square');
  readonly size = input<NbIconButtonSize>('default');
  readonly variant = input<NbIconButtonVariant>('default');

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center justify-center shrink-0 select-none',
      '[--nb-icon-button-bg:var(--nb-main)]',
      '[--nb-icon-button-fg:var(--nb-main-foreground)]',
      '[--nb-icon-button-border:var(--nb-border)]',
      'bg-(--nb-icon-button-bg) text-(--nb-icon-button-fg)',
      'border-2 border-(--nb-icon-button-border)',
      'shadow-[var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
      'hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none',
      'transition-all duration-150 ease-out',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      this.shapeClass(),
      this.sizeClass(),
      this.variantClass()
    )
  );

  private shapeClass(): string {
    return this.shape() === 'circle' ? 'rounded-full' : 'rounded-none';
  }

  private sizeClass(): string {
    const map: Record<NbIconButtonSize, string> = {
      sm: 'size-8 [&_svg]:size-4',
      default: 'size-10 [&_svg]:size-5',
      lg: 'size-12 [&_svg]:size-6',
    };
    return map[this.size()];
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
