import { computed, Directive, input } from '@angular/core';

import {
  nbTypographyFontValue,
  type NbTypographyFont,
} from '../tokens/typography';

/**
 * Typography context. Picks a font *role* and writes the resolved stack as
 * `font-family` on the host so every descendant primitive (nbText, nbDisplay,
 * nbButton, nbChip, nbMediaItemTitle, …) inherits it through the cascade — no
 * raw font-family strings in templates.
 *
 * Precedence falls out of the cascade: a nested context overrides an outer one
 * (closest wins), and an inline token override (`--nb-font-accent: …`) wins over
 * the preset because the resolved value reads that token first.
 *
 * Also available as the `typography` input on nbSurface, which composes this
 * directive directly.
 */
@Directive({
  selector: '[nbTypography]',
  exportAs: 'nbTypography',
  host: {
    '[attr.data-nb-typography]': 'font()',
    '[style.--nb-typography-font]': 'fontValue()',
  },
})
export class NbTypography {
  readonly font = input<NbTypographyFont>('inherit');

  protected readonly fontValue = computed(() =>
    nbTypographyFontValue(this.font()),
  );
}
