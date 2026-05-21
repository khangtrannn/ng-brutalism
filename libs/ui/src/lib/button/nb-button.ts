import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import type {
  NbButtonShadow,
  NbButtonSize,
  NbButtonVariant,
} from './button.types';

@Directive({
  selector: 'button[nbButton], a[nbButton]',
  host: {
    '[class]': 'classes()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-shadow]': 'shadow()',
    '[attr.data-size]': 'size()',
    '[attr.data-full-width]': 'fullWidth() ? "" : null',
  },
})
export class NbButton {
  readonly variant = input<NbButtonVariant>('default');
  readonly shadow = input<NbButtonShadow>('default');
  readonly size = input<NbButtonSize>('default');
  readonly fullWidth = input(false);

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center justify-center whitespace-nowrap select-none',
      'gap-2',
      'font-bold',
      '[--nb-button-bg:var(--nb-main)]',
      '[--nb-button-fg:var(--nb-main-foreground)]',
      '[--nb-button-border:var(--nb-border)]',
      '[--nb-button-radius:var(--nb-radius)]',
      '[--nb-button-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
      'bg-(--nb-button-bg) text-(--nb-button-fg)',
      'rounded-(--nb-button-radius)',
      'border-2 border-(--nb-button-border)',
      'shadow-[var(--nb-button-shadow)]',
      'transition-all duration-150 ease-out',
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none',
      this.variantClass(),
      this.shadowClass(),
      this.sizeClass(),
      this.fullWidth() && 'w-full'
    )
  );

  private variantClass(): string {
    const variant = this.variant();

    const map: Record<NbButtonVariant, string> = {
      default: '',
      neutral:
        '[--nb-button-bg:var(--nb-background)] [--nb-button-fg:var(--nb-foreground)]',
      primary:
        '[--nb-button-bg:var(--nb-primary)] [--nb-button-fg:var(--nb-primary-foreground)]',
      secondary:
        '[--nb-button-bg:var(--nb-secondary)] [--nb-button-fg:var(--nb-secondary-foreground)]',
      accent:
        '[--nb-button-bg:var(--nb-accent)] [--nb-button-fg:var(--nb-accent-foreground)]',
      danger:
        '[--nb-button-bg:var(--nb-danger)] [--nb-button-fg:var(--nb-danger-foreground)]',
      success:
        '[--nb-button-bg:var(--nb-success)] [--nb-button-fg:var(--nb-success-foreground)]',
      warning:
        '[--nb-button-bg:var(--nb-warning)] [--nb-button-fg:var(--nb-warning-foreground)]',
    };

    return map[variant];
  }

  private shadowClass(): string {
    const map: Record<NbButtonShadow, string> = {
      default:
        'hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none',
      none: '[--nb-button-shadow:none]',
      reverse:
        '[--nb-button-shadow:none] hover:-translate-x-(--nb-reverse-shadow-offset-x) hover:-translate-y-(--nb-reverse-shadow-offset-y) hover:shadow-[var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
    };

    return map[this.shadow()];
  }

  private sizeClass(): string {
    const map: Record<NbButtonSize, string> = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-9 px-3 text-sm',
      lg: 'h-11 px-8 text-sm',
      icon: 'size-10',
    };

    return map[this.size()];
  }
}
