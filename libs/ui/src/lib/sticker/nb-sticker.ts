import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

import {
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { nbToneVars } from '../tokens/tone';
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
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'sticker' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { tone: 'mint' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
  ],
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

  private readonly capability = inject(NbToneCapability);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  protected readonly config = computed(() => NB_STICKER_PATHS[this.shape()]);

  protected readonly fillBg = computed(() => {
    const tone = this.capability.tone() ?? this.defaults.tone ?? 'mint';
    return nbToneVars(tone).bg;
  });

  protected readonly fillInk = computed(() => {
    const tone = this.capability.tone() ?? this.defaults.tone ?? 'mint';
    return nbToneVars(tone).fg;
  });

  protected readonly rotateStyle = computed(() => `${this.rotate()}deg`);
}
