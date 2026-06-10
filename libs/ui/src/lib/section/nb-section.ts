import {
  Directive,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

import type { NbDivider } from '../tokens/divider';
import type { NbLayoutAlign } from '../tokens/layout';
import { nbPaddingValue, type NbPadding } from '../tokens/padding';

export type NbSectionPadding = NbPadding;

// `divider` is line placement between regions — distinct from `border`
// (outline strength) elsewhere in the library. Renamed from the former
// `border` input so `border` means strength library-wide.
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
    '[style.padding]': 'paddingStyle()',
    '[style.margin-inline]': 'flushMarginStyle()',
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

  // Padding feeds both the host padding and the flush negative-margin calc, so
  // it is resolved locally rather than via a host-painting capability.
  readonly padding = input<NbPadding | undefined>(undefined);

  protected readonly paddingStyle = computed(() => {
    const padding = this.padding();
    return padding ? nbPaddingValue(padding) : null;
  });

  // `flush` negates the section's own padding so content can bleed to the edge.
  // It mirrors an explicit padding input when present; CSS owns the public hook
  // fallback chain when it is absent.
  protected readonly flushMarginStyle = computed(() => {
    const paddingStyle = this.paddingStyle();
    return this.flush() && paddingStyle
      ? `calc(${paddingStyle} * -1)`
      : null;
  });
}
