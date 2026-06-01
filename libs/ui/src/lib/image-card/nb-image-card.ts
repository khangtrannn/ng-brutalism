import {
  ChangeDetectionStrategy,
  Component,
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

export type NbImageCardTone = NbToneToken;
export type NbImageCardRadius = NbRadius;
export type NbImageCardShadow = NbShadow;
export type NbImageCardBorder = NbBorderStrength;

@Component({
  selector: 'nb-image-card',
  template: `
    <img
      [src]="image()"
      [alt]="alt()"
      [class]="imageClasses"
      loading="lazy"
      decoding="async"
    />
    <ng-content select="nb-image-card-caption" />
  `,
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'image-card' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'background',
        radius: 'md',
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
    '[attr.data-slot]': '"image-card"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbImageCard {
  readonly image = input.required<string>();
  readonly alt = input.required<string>();

  protected readonly classes = nbClass(
    'flex flex-col overflow-hidden',
    'font-medium'
  );

  protected readonly imageClasses = nbClass('block w-full h-auto');
}

@Component({
  selector: 'nb-image-card-caption',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"image-card-caption"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbImageCardCaption {
  protected readonly classes = nbClass(
    'border-t-[length:var(--nb-border-width-token,var(--_nb-border-width-default))] border-t-[var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]',
    'px-6 py-4 text-center font-bold text-base'
  );
}
