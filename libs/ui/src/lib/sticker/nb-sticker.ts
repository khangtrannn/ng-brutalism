import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import { NB_STICKER_PATHS } from './sticker.paths';
import type { NbStickerShape } from './sticker.types';

function nbStickerRotateTransform(value: unknown): string | null {
  if (value == null) {
    return null;
  }
  const deg = numberAttribute(value);
  return Number.isNaN(deg) ? null : `${deg}deg`;
}

function nbStickerScaleTransform(value: unknown): string | null {
  if (value == null) {
    return null;
  }
  const scale = numberAttribute(value);
  return Number.isNaN(scale) ? null : `${scale}`;
}

@Component({
  selector: 'nb-sticker',
  exportAs: 'nbSticker',
  template: `
    <span data-slot="sticker-root">
      <svg
        data-slot="sticker-svg"
        [attr.viewBox]="config().viewBox"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          data-slot="sticker-shadow"
          [attr.d]="config().path"
          [attr.transform]="config().shadowTransform"
        />
        <path data-slot="sticker-shape" [attr.d]="config().path" />
      </svg>

      <span data-slot="sticker-content">
        <ng-content />
      </span>
    </span>
  `,
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-shape]': 'shape()',
    '[attr.data-nb-sticker]': '""',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
    '[attr.role]': 'decorative() ? null : "img"',
    '[style.--nb-sticker-rotate]': 'rotate()',
    '[style.--nb-sticker-scale]': 'size()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSticker {
  readonly shape = input<NbStickerShape>('burst');
  readonly decorative = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly rotate = input(null, { transform: nbStickerRotateTransform });
  readonly size = input(null, { transform: nbStickerScaleTransform });

  protected readonly config = computed(() => NB_STICKER_PATHS[this.shape()]);
}
