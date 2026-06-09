import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

import { nbToneVars, type NbTone } from '../tokens/tone';
import { NB_STICKER_PATHS } from './sticker.paths';
import type { NbStickerShape } from './sticker.types';

@Component({
  selector: 'nb-sticker',
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
  host: {
    '[attr.data-shape]': 'shape()',
    '[attr.data-nb-sticker]': '""',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
    '[attr.role]': 'decorative() ? null : "img"',
    '[style.background-color]': '"transparent"',
    '[style.--nb-sticker-fill]': 'fillBg()',
    '[style.--nb-sticker-ink]': 'fillInk()',
    '[style.--nb-sticker-shadow]': '"var(--nb-shadow, #050505)"',
    '[style.--nb-sticker-rotate]': 'rotateStyle()',
    '[style.--nb-sticker-scale]': 'size()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSticker {
  readonly shape = input<NbStickerShape>('burst');
  readonly decorative = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly rotate = input<number, unknown>(0, { transform: numberAttribute });
  readonly size = input<number, unknown>(1, { transform: numberAttribute });
  // SVG fills resolve the tone token to a literal at render time (no CSS
  // fallback chain), so the sticker owns the tone input directly. The 'mint'
  // default stands in when no tone is set.
  readonly tone = input<NbTone | undefined>(undefined);

  protected readonly config = computed(() => NB_STICKER_PATHS[this.shape()]);

  protected readonly fillBg = computed(
    () => nbToneVars(this.tone() ?? 'mint').bg,
  );

  protected readonly fillInk = computed(
    () => nbToneVars(this.tone() ?? 'mint').fg,
  );

  protected readonly rotateStyle = computed(() => `${this.rotate()}deg`);
}
