import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type {
  NbBorderStrength,
  NbRadius,
  NbShadow,
  NbTone,
} from '@ng-brutalism/ui/tokens';
export type NbImageCardTone = NbTone;
export type NbImageCardRadius = NbRadius;
export type NbImageCardShadow = NbShadow;
export type NbImageCardBorder = NbBorderStrength;

@Component({
  selector: 'nb-image-card',
  exportAs: 'nbImageCard',
  template: `
    <img
      [src]="image()"
      [alt]="alt()"
      data-slot="image-card-image"
      loading="lazy"
      decoding="async"
    />
    <ng-content select="nb-image-card-caption" />
  `,
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-slot]': '"image-card"',
    '[style.--nb-image-card-radius]': 'radius()',
    '[style.--nb-image-card-shadow]': 'shadow()',
    '[style.--nb-image-card-border-width]': 'border()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbImageCard {
  readonly image = input.required<string>();
  readonly alt = input.required<string>();
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
}

@Component({
  selector: 'nb-image-card-caption',
  exportAs: 'nbImageCardCaption',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"image-card-caption"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbImageCardCaption {}
