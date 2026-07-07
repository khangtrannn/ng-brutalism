import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  computed,
  input,
} from '@angular/core';

import {
  NbToneCapability,
} from '../core/capabilities';
import {
  nbGapStyleTransform,
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
  nbTokenStyleTransform,
} from '../core/input-transforms';
import { NbIcon, type NbIconSize } from '../icon';
import { type NbRadius } from '../tokens/radius';
import { type NbShadow } from '../tokens/shadow';
import type { NbSpacing } from '../tokens/spacing';
import type { NbTone } from '../tokens/tone';
import type { NbTextTracking } from '../tokens/typography';
import type { NbTextTransform } from '../text';

export type NbChipTone = NbTone;
export type NbChipRadius = NbRadius;
export type NbChipShadow = NbShadow;
// Token scale mirrors the layout directives for API consistency, but values
// stay chip-specific and asymmetric (horizontal > vertical) because a chip is
// an inline pill, not a container — uniform container padding would make it a
// box. Padding therefore stays primitive-local rather than using the shared
// padding capability.
export type NbChipPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

const chipPaddingMap: Record<NbChipPadding, string> = {
  none: '0',
  sm: '0.125rem 0.5rem',
  md: '0.125rem 0.625rem',
  lg: '0.5rem 1rem',
  xl: '0.625rem 1.25rem',
};

const nbChipPaddingStyleTransform = nbTokenStyleTransform<NbChipPadding>(
  (padding) => chipPaddingMap[padding]
);

@Component({
  selector: 'span[nbChip]',
  imports: [NbIcon],
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  template: `
    @if (icon()) {
      <span nbIcon [src]="icon()!" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    '[attr.data-nb-chip]': '""',
    '[style.--nb-chip-padding]': 'padding()',
    '[style.--nb-chip-radius]': 'radius()',
    '[style.--nb-chip-shadow]': 'shadow()',
    '[style.--nb-chip-border-width]': 'border()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChip {
  readonly padding = input(null, {
    transform: nbChipPaddingStyleTransform,
  });
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });

  // Optional leading icon, given as an SVG/image URL. Rendered through nbIcon
  // in mask mode so it tints to the chip's foreground color. For full-color
  // or labeled icons, compose an `nbIcon` (or any element) as projected
  // content instead — the leading slot is only used when `icon` is set.
  readonly icon = input<string>();
  readonly iconSize = input<NbIconSize>('sm');
}

export type NbChipGroupDirection = 'horizontal' | 'vertical';
export type NbChipGroupAlign = 'start' | 'center' | 'end' | 'stretch';
export type NbChipGroupGap = NbSpacing;

@Directive({
  selector: '[nbChipGroup]',
  host: {
    '[style.--nb-chip-group-gap]': 'gap()',
    '[style.--nb-chip-radius]': 'chipRadiusValue()',
    '[style.--nb-chip-shadow]': 'chipShadowValue()',
    '[style.text-transform]': 'transformValue()',
    '[attr.data-nb-chip-group]': '""',
    '[attr.data-direction]': 'direction()',
    '[attr.data-align]': 'align()',
    '[attr.data-tracking]': 'tracking()',
  },
})
export class NbChipGroup {
  readonly direction = input<NbChipGroupDirection>('horizontal');
  readonly gap = input(null, {
    transform: nbGapStyleTransform,
  });
  readonly align = input<NbChipGroupAlign>('stretch');
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly transform = input<NbTextTransform>('none');
  readonly tracking = input<NbTextTracking>('normal');

  protected readonly chipRadiusValue = this.radius;

  protected readonly chipShadowValue = this.shadow;

  protected readonly transformValue = computed(() => {
    const transform = this.transform();
    return transform === 'none' ? null : transform;
  });
}
