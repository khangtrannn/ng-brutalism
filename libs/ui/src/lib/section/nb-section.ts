import { Directive, booleanAttribute, input } from '@angular/core';

import { nbPaddingStyleTransform } from '../core/input-transforms';
import type {
  NbDivider,
  NbLayoutAlign,
  NbPadding,
} from '@ng-brutalism/ui/tokens';
export type NbSectionPadding = NbPadding;

export type NbSectionDivider = NbDivider;

export type NbSectionDividerStyle = 'solid' | 'dashed' | 'dotted';

export type NbSectionLayout = 'default' | 'center' | 'between';

export type NbSectionAlign = NbLayoutAlign;

@Directive({
  selector: '[nbSection]',
  exportAs: 'nbSection',
  host: {
    '[attr.data-nb-section]': '""',
    '[attr.data-divider]': 'divider()',
    '[attr.data-divider-style]': 'dividerStyle()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-align]': 'align()',
    '[attr.data-flush]': 'flush() ? "" : null',
    '[style.--nb-section-padding]': 'padding()',
  },
})
export class NbSection {
  readonly divider = input<NbSectionDivider>('none');
  readonly dividerStyle = input<NbSectionDividerStyle>('solid');
  readonly layout = input<NbSectionLayout>('default');
  readonly align = input<NbSectionAlign>('stretch');
  readonly flush = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  readonly padding = input(null, {
    transform: nbPaddingStyleTransform,
  });
}
