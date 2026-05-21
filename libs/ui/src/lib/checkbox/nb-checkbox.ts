import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import type { NbCheckboxSize } from './checkbox.types';

@Directive({
  selector: 'input[nbCheckbox]',
  host: {
    '[class]': 'classes()',
    '[attr.data-size]': 'size()',
  },
})
export class NbCheckbox {
  readonly size = input<NbCheckboxSize>('default');

  protected readonly classes = computed(() =>
    nbClass(
      '[--nb-checkbox-bg:var(--nb-main)]',
      '[--nb-checkbox-fg:#fff]',
      '[--nb-checkbox-border:var(--nb-border)]',
      '[--nb-checkbox-radius:0]',
      'peer grid shrink-0 cursor-pointer appearance-none place-content-center',
      'rounded-(--nb-checkbox-radius) outline-2 outline-(--nb-checkbox-border) ring-offset-white',
      'checked:bg-(--nb-checkbox-bg) checked:text-(--nb-checkbox-fg)',
      'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--nb-checkbox-border) focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      this.sizeClass()
    )
  );

  private sizeClass(): string {
    const map: Record<NbCheckboxSize, string> = {
      default: 'size-4',
      sm: 'size-3.5',
      lg: 'size-5',
    };
    return map[this.size()];
  }
}
