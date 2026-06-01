import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
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
    '[class]': 'classes',
    '[attr.data-slot]': '"card"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCard {
  protected readonly classes = nbClass(
    'flex flex-col gap-6 py-6',
    'font-medium'
  );
}

@Component({
  selector: 'nb-card-header',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-header"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardHeader {
  protected readonly classes = nbClass(
    'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6',
    '[.border-b]:pb-6'
  );
}

@Component({
  selector: 'nb-card-title',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-title"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardTitle {
  protected readonly classes = nbClass('font-bold leading-none');
}

@Component({
  selector: 'nb-card-description',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-description"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardDescription {
  protected readonly classes = nbClass('text-sm font-medium');
}

@Component({
  selector: 'nb-card-actions',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"card-actions"',
    '[attr.data-align]': 'align()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardActions {
  readonly align = input<NbCardActionsAlign>('start');

  protected readonly classes = computed(() =>
    nbClass(
      'flex flex-wrap items-center gap-3 px-6',
      '[[data-slot=card-footer]_&]:px-0',
      this.align() === 'end' ? 'justify-end' : 'justify-start'
    )
  );
}

@Component({
  selector: 'nb-card-content',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-content"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardContent {
  protected readonly classes = nbClass('px-6');
}

@Component({
  selector: 'nb-card-footer',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-footer"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardFooter {
  protected readonly classes = nbClass(
    'flex items-center px-6',
    'has-[[data-slot=card-actions]]:flex-wrap',
    'has-[[data-slot=card-actions]]:justify-between',
    'has-[[data-slot=card-actions]]:gap-4',
    '[.border-t]:pt-6'
  );
}
