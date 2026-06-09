import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import {
  NbRadiusCapability,
  NbShadowCapability,
  nbBorderWidthFallback,
  nbToneFallbacks,
} from '../core/capabilities';
import { nbBorderWidthValue, type NbBorderStrength } from '../tokens/border';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import { nbToneVars, type NbTone } from '../tokens/tone';

export type NbImageCardTone = NbTone;
export type NbImageCardRadius = NbRadius;
export type NbImageCardShadow = NbShadow;
export type NbImageCardBorder = NbBorderStrength;

@Component({
  selector: 'nb-image-card',
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
  // radius/shadow are painted on the host, so they compose the painters.
  // tone/border are also needed by the caption child, so they are hand-rolled.
  hostDirectives: [
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
  ],
  host: {
    '[attr.data-slot]': '"image-card"',
    '[style.background]': 'backgroundStyle()',
    '[style.color]': 'foregroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-width]': 'borderWidthStyle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbImageCard {
  readonly image = input.required<string>();
  readonly alt = input.required<string>();
  readonly tone = input<NbTone | undefined>(undefined);
  readonly border = input<NbBorderStrength | undefined>(undefined);

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  protected readonly backgroundStyle = computed(
    () => this.toneVars()?.bg ?? null,
  );
  protected readonly foregroundStyle = computed(
    () => this.toneVars()?.fg ?? null,
  );
  protected readonly borderColorStyle = computed(
    () => this.toneVars()?.borderColor ?? null,
  );
  protected readonly borderWidthStyle = computed(() => {
    const border = this.border();
    return border ? nbBorderWidthValue(border) : null;
  });

  readonly captionBorderWidth = computed(
    () =>
      this.borderWidthStyle() ??
      nbBorderWidthFallback('image-card', 'default'),
  );
  readonly captionBorderColor = computed(
    () =>
      this.borderColorStyle() ??
      nbToneFallbacks('image-card', 'background').borderColor,
  );
}

@Component({
  selector: 'nb-image-card-caption',
  template: `<ng-content />`,
  host: {
    '[attr.data-slot]': '"image-card-caption"',
    '[style.border-top-width]': 'borderTopWidthStyle()',
    '[style.border-top-color]': 'borderTopColorStyle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbImageCardCaption {
  private readonly card = inject(NbImageCard);

  protected readonly borderTopWidthStyle = computed(() =>
    this.card.captionBorderWidth(),
  );
  protected readonly borderTopColorStyle = computed(() =>
    this.card.captionBorderColor(),
  );
}
