import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import {
  nbUnderlineGapValue,
  nbUnderlineWidthValue,
  type NbUnderlineGap,
  type NbUnderlineVariant,
  type NbUnderlineWidth,
} from '../../tokens/typography';

/**
 * INTERNAL capability — not part of the public API. Handles the three underline
 * inputs shared by nbText and nbDisplay: the variant (none/bar/wave), the gap
 * between text baseline and the decoration, and the decoration width.
 *
 * Writes `data-underline`, `--nb-underline-gap`, and `--nb-underline-width`
 * onto the host when the Angular inputs are present so the underline CSS in the
 * theme can read them without each text primitive re-implementing the same
 * computed chain.
 */
@Directive({
  selector: '[nbUnderlineCapability]',
  host: {
    '[attr.data-underline]': 'underlineAttr()',
  },
})
export class NbUnderlineCapability {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly writtenCustomProperties = new Set<string>();

  readonly underline = input<NbUnderlineVariant>('none');
  readonly underlineGap = input<NbUnderlineGap | undefined>(undefined);
  readonly underlineWidth = input<NbUnderlineWidth | undefined>(undefined);

  constructor() {
    effect(() => {
      this.syncCustomProperty(
        '--nb-underline-gap',
        this.underlineGapValue(),
      );
    });
    effect(() => {
      this.syncCustomProperty(
        '--nb-underline-width',
        this.underlineWidthValue(),
      );
    });
  }

  protected readonly underlineAttr = computed(() => {
    const u = this.underline();
    return u === 'none' ? null : u;
  });

  protected readonly underlineGapValue = computed(() => {
    const gap = this.underlineGap();
    return gap ? nbUnderlineGapValue(gap) : null;
  });

  protected readonly underlineWidthValue = computed(() => {
    const width = this.underlineWidth();
    return width ? nbUnderlineWidthValue(width) : null;
  });

  private syncCustomProperty(name: string, value: string | null): void {
    const style = this.element.nativeElement.style;

    if (value !== null) {
      style.setProperty(name, value);
      this.writtenCustomProperties.add(name);
      return;
    }

    if (this.writtenCustomProperties.has(name)) {
      style.removeProperty(name);
      this.writtenCustomProperties.delete(name);
    }
  }
}
