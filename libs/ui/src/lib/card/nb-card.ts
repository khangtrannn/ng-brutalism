import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  NbToneCapability,
} from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type { NbBorderStrength } from '../tokens/border';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbTone } from '../tokens/tone';

export type NbCardActionsAlign = 'start' | 'end';
export type NbCardTone = NbTone;
export type NbCardRadius = NbRadius;
export type NbCardShadow = NbShadow;
export type NbCardBorder = NbBorderStrength;

@Component({
  selector: 'nb-card',
  template: `<ng-content />`,
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-slot]': '"card"',
    '[style.--nb-card-radius]': 'radius()',
    '[style.--nb-card-shadow]': 'shadow()',
    '[style.--nb-card-border-width]': 'border()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCard {
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
  selector: 'nb-card-header',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"card-header"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardHeader {}

@Component({
  selector: 'nb-card-title',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"card-title"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardTitle {}

@Component({
  selector: 'nb-card-description',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"card-description"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardDescription {}

@Component({
  selector: 'nb-card-actions',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"card-actions"',
    '[attr.data-align]': 'align()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardActions {
  readonly align = input<NbCardActionsAlign>('start');
}

@Component({
  selector: 'nb-card-content',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"card-content"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardContent {}

@Component({
  selector: 'nb-card-footer',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"card-footer"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardFooter {}
