import { Directive, booleanAttribute, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbRadiusCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { nbToneTokens } from '../tokens/tone';
import type {
  NbButtonShadow,
  NbButtonSize,
  NbButtonTone,
  NbButtonVariant,
} from './button.types';

const sizeMap: Record<NbButtonSize, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-base gap-2',
  lg: 'h-[3.25rem] px-5 text-lg gap-2.5',
  xl: 'h-14 px-4 text-xl gap-3',
};

@Directive({
  selector: 'button[nbButton], a[nbButton]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'button' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { radius: 'md' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [{ directive: NbRadiusCapability, inputs: ['radius'] }],
  host: {
    '[class]': 'classes()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-shadow]': 'shadow()',
    '[attr.data-size]': 'size()',
    '[attr.data-full-width]': 'fullWidth() ? "" : null',
    '[style.--nb-button-bg]': 'toneBg()',
    '[style.--nb-button-fg]': 'toneFg()',
  },
})
export class NbButton {
  readonly variant = input<NbButtonVariant>('default');
  readonly tone = input<NbButtonTone | undefined>(undefined);
  readonly shadow = input<NbButtonShadow>('default');
  readonly size = input<NbButtonSize>('md');
  readonly fullWidth = input<boolean, unknown>(false, { transform: booleanAttribute });

  protected readonly toneBg = computed(() => {
    const t = this.tone();
    return t !== undefined ? nbToneTokens(t).bg : null;
  });

  protected readonly toneFg = computed(() => {
    const t = this.tone();
    return t !== undefined ? nbToneTokens(t).fg : null;
  });

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center justify-center whitespace-nowrap select-none font-bold',
      '[--nb-button-bg:var(--nb-main)]',
      '[--nb-button-fg:var(--nb-main-foreground)]',
      '[--nb-button-border:var(--nb-border)]',
      '[--nb-button-border-width:var(--nb-border-width)]',
      '[--nb-button-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
      'bg-(--nb-button-bg) text-(--nb-button-fg)',
      'rounded-(--nb-button-radius)',
      'border-(length:--nb-button-border-width) border-(--nb-button-border)',
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
    return map[this.variant()];
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
    return sizeMap[this.size()];
  }
}
