import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  computed,
  input,
} from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbGapStyleTransform,
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
  nbTokenStyleTransform,
} from '../core/input-transforms';
import { NbIcon, type NbIconSize } from '../icon';
import type {
  NbRadius,
  NbShadow,
  NbSpacing,
  NbTone,
  NbTextTracking,
} from '@ng-brutalism/ui/tokens';
import type { NbTextTransform } from '../text';

export type NbChipTone = NbTone;
export type NbChipRadius = NbRadius;
export type NbChipShadow = NbShadow;

export type NbChipSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

const chipSizeMap: Record<NbChipSize, string> = {
  none: '0',
  sm: '0.125rem 0.5rem',
  md: '0.125rem 0.625rem',
  lg: '0.5rem 1rem',
  xl: '0.625rem 1.25rem',
};

const nbChipSizeStyleTransform = nbTokenStyleTransform<NbChipSize>(
  (size) => chipSizeMap[size]
);

@Component({
  selector: 'span[nbChip]',
  exportAs: 'nbChip',
  imports: [NbIcon],
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  template: `
    @if (icon()) {
    <span nbIcon [src]="icon()!" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    'data-nb-chip': '',
    '[style.--nb-chip-padding]': 'size()',
    '[style.--nb-chip-radius]': 'radius()',
    '[style.--nb-chip-shadow]': 'shadow()',
    '[style.--nb-chip-border-width]': 'border()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChip {
  readonly size = input(null, {
    transform: nbChipSizeStyleTransform,
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

  readonly icon = input<string>();
  readonly iconSize = input<NbIconSize>('sm');
}

export type NbChipGroupDirection = 'horizontal' | 'vertical';
export type NbChipGroupAlign = 'start' | 'center' | 'end' | 'stretch';
export type NbChipGroupGap = NbSpacing;

@Directive({
  selector: '[nbChipGroup]',
  exportAs: 'nbChipGroup',
  host: {
    '[style.--nb-chip-group-gap]': 'gap()',
    '[style.--nb-chip-radius]': 'chipRadiusValue()',
    '[style.--nb-chip-shadow]': 'chipShadowValue()',
    '[style.text-transform]': 'transformValue()',
    'data-nb-chip-group': '',
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
