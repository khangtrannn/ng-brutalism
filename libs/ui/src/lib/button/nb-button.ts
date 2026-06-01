import { Directive, booleanAttribute, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbButtonPress, NbButtonSize } from './button.types';

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
      useValue: {
        tone: 'primary',
        radius: 'md',
        shadow: 'default',
        border: 'default',
      } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: {
    '[class]': 'classes()',
    '[attr.data-press]': 'press()',
    '[attr.data-size]': 'size()',
    '[attr.data-full-width]': 'fullWidth() ? "" : null',
  },
})
export class NbButton {
  readonly press = input<NbButtonPress>('push');
  readonly size = input<NbButtonSize>('md');
  readonly fullWidth = input<boolean, unknown>(false, { transform: booleanAttribute });

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center justify-center whitespace-nowrap select-none font-bold',
      'bg-(--nb-button-bg) text-(--nb-button-fg)',
      'border-(--nb-button-border-color)',
      'transition-all duration-150 ease-out',
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none',
      this.shadowClass(),
      this.sizeClass(),
      this.fullWidth() && 'w-full'
    )
  );

  private shadowClass(): string {
    const map: Record<NbButtonPress, string> = {
      push:
        'hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none',
      reverse:
        'hover:-translate-x-(--nb-reverse-shadow-offset-x) hover:-translate-y-(--nb-reverse-shadow-offset-y)',
      none: '',
    };
    return map[this.press()];
  }

  private sizeClass(): string {
    return sizeMap[this.size()];
  }
}
