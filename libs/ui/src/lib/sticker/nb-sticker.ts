import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

import { NB_STICKER_PATHS } from './sticker.paths';
import type { NbStickerShape, NbStickerTone } from './sticker.types';

interface NbStickerToneTokens {
  fill: string;
  ink: string;
  shadow: string;
}

const NB_STICKER_TONE_TOKENS: Record<NbStickerTone, NbStickerToneTokens> = {
  default: {
    fill: 'var(--nb-surface, var(--nb-background, #fff))',
    ink: 'var(--nb-foreground, #050505)',
    shadow: 'var(--nb-shadow, #050505)',
  },
  yellow: {
    fill: 'var(--nb-yellow, #ffd24a)',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  pink: {
    fill: 'var(--nb-pink, #ff6fc7)',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  mint: {
    fill: 'var(--nb-mint, #9af7b5)',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  lavender: {
    fill: 'var(--nb-lavender, #b8a4ff)',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  purple: {
    fill: 'var(--nb-purple, var(--nb-lavender, #b994ff))',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  accent: {
    fill: 'var(--nb-accent)',
    ink: 'var(--nb-accent-foreground)',
    shadow: 'var(--nb-shadow, #050505)',
  },
  success: {
    fill: 'var(--nb-success)',
    ink: 'var(--nb-success-foreground)',
    shadow: 'var(--nb-shadow, #050505)',
  },
  warning: {
    fill: 'var(--nb-warning)',
    ink: 'var(--nb-warning-foreground)',
    shadow: 'var(--nb-shadow, #050505)',
  },
  danger: {
    fill: 'var(--nb-danger)',
    ink: 'var(--nb-danger-foreground)',
    shadow: 'var(--nb-shadow, #050505)',
  },
};

@Component({
  selector: 'nb-sticker',
  template: `
    <span class="nb-sticker__root">
      <svg
        class="nb-sticker__svg"
        [attr.viewBox]="config().viewBox"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          class="nb-sticker__shadow"
          [attr.d]="config().path"
          [attr.transform]="config().shadowTransform"
        />
        <path class="nb-sticker__shape" [attr.d]="config().path" />
      </svg>

      <span class="nb-sticker__content">
        <ng-content />
      </span>
    </span>
  `,
  host: {
    class: 'nb-sticker',
    '[attr.data-shape]': 'shape()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-nb-sticker]': '""',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
    '[attr.role]': 'decorative() ? null : "img"',
    '[style.--nb-sticker-fill]': 'toneTokens().fill',
    '[style.--nb-sticker-ink]': 'toneTokens().ink',
    '[style.--nb-sticker-shadow]': 'toneTokens().shadow',
    '[style.--nb-sticker-rotate]': 'rotateStyle()',
    '[style.--nb-sticker-scale]': 'size()',
  },
  styles: [
    `
      :host {
        --nb-sticker-min-block-size: 8.75rem;
        --nb-sticker-padding-inline: 3.5rem;
        --nb-sticker-padding-block: 3rem;
        --nb-sticker-fill: var(--nb-mint, #9af7b5);
        --nb-sticker-ink: var(--nb-black, #050505);
        --nb-sticker-shadow: var(--nb-shadow, var(--nb-black, #050505));
        --nb-sticker-stroke-width: 5px;
        --nb-sticker-rotate: -6deg;
        --nb-sticker-font-size: 1.5rem;

        display: inline-block;
        vertical-align: middle;
      }

      :host([data-shape='burst-wide']) {
        --nb-sticker-padding-inline: 4rem;
        --nb-sticker-padding-block: 3rem;
        --nb-sticker-font-size: 1.5rem;
      }

      :host([data-shape='star']) {
        --nb-sticker-min-block-size: 7.5rem;
        --nb-sticker-padding-inline: 2.5rem;
        --nb-sticker-padding-block: 2.5rem;
        --nb-sticker-face-size: 3.5rem;
        --nb-sticker-rotate: 0deg;
        --nb-sticker-stroke-width: 5px;
      }

      :host([data-shape='splat']) {
        --nb-sticker-size: 6rem;
        --nb-sticker-shadow-x: 6px;
        --nb-sticker-shadow-y: 6px;
        --nb-sticker-stroke-width: 4px;
        --nb-sticker-rotate: -10deg;
      }

      .nb-sticker__root {
        position: relative;
        isolation: isolate;

        display: inline-grid;
        place-items: center;

        box-sizing: border-box;
        min-block-size: var(--nb-sticker-min-block-size);
        inline-size: max-content;
        block-size: max-content;

        transform: rotate(var(--nb-sticker-rotate)) scale(var(--nb-sticker-scale, 1));
        transform-origin: center;
      }

      :host([data-shape='splat']) .nb-sticker__root {
        inline-size: var(--nb-sticker-size);
        block-size: var(--nb-sticker-size);
        min-block-size: var(--nb-sticker-size);
      }

      .nb-sticker__svg {
        position: absolute;
        inset: 0;
        z-index: -1;

        inline-size: 100%;
        block-size: 100%;

        overflow: visible;
      }

      .nb-sticker__shadow {
        fill: var(--nb-sticker-shadow);
      }

      :host([data-shape='splat']) .nb-sticker__shadow {
        transform: translate(
          var(--nb-sticker-shadow-x),
          var(--nb-sticker-shadow-y)
        );
      }

      .nb-sticker__shape {
        fill: var(--nb-sticker-fill);
        stroke: var(--nb-sticker-ink);
        stroke-width: var(--nb-sticker-stroke-width);
        stroke-linejoin: round;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
      }

      .nb-sticker__content {
        color: var(--nb-sticker-ink);

        display: block;
        max-width: 300px;
        padding-inline: var(--nb-sticker-padding-inline);
        padding-block: var(--nb-sticker-padding-block);
        overflow-wrap: break-word;

        font-family: var(--nb-font-display, system-ui, sans-serif);
        font-size: var(--nb-sticker-font-size);
        font-weight: 950;
        line-height: 0.9;
        letter-spacing: 0;
        text-align: center;
        text-transform: uppercase;

        pointer-events: none;
        user-select: none;
      }

      :host([data-shape='splat']) .nb-sticker__content {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSticker {
  readonly shape = input<NbStickerShape>('burst');
  readonly tone = input<NbStickerTone>('mint');
  readonly decorative = input(false, { transform: booleanAttribute });
  readonly rotate = input(0, { transform: numberAttribute });
  readonly size = input(1, { transform: numberAttribute });

  protected readonly config = computed(() => NB_STICKER_PATHS[this.shape()]);
  protected readonly toneTokens = computed(
    () => NB_STICKER_TONE_TOKENS[this.tone()]
  );
  protected readonly rotateStyle = computed(() => `${this.rotate()}deg`);
}
