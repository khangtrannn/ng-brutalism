import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbBorderStrength } from '../tokens/border';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbToneToken } from '../tokens/tone';

export type NbCardActionsAlign = 'start' | 'end';
export type NbCardTone = NbToneToken;
export type NbCardRadius = NbRadius;
export type NbCardShadow = NbShadow;
export type NbCardBorder = NbBorderStrength;

@Component({
  selector: 'nb-card',
  template: `<ng-content />`,
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'card' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'background',
        radius: 'lg',
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
    '[attr.data-slot]': '"card"',
    '[style.background]': 'tone.background()',
    '[style.color]': 'tone.foreground()',
    '[style.border-color]': 'tone.borderColor()',
    '[style.border-radius]': 'radius.value()',
    '[style.box-shadow]': 'shadow.value()',
    '[style.border-width]': 'border.width()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCard {
  protected readonly tone = inject(NbToneCapability);
  protected readonly radius = inject(NbRadiusCapability);
  protected readonly shadow = inject(NbShadowCapability);
  protected readonly border = inject(NbBorderCapability);
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
