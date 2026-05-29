import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-sticker-face',
  template: `
    <svg
      class="nb-sticker-face__svg"
      viewBox="0 0 320 220"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse class="nb-sticker-face__eye" cx="126" cy="64" rx="20" ry="35" />
      <ellipse class="nb-sticker-face__eye" cx="214" cy="68" rx="20" ry="35" />
      <path
        class="nb-sticker-face__smile"
        d="M78 132 C116 202 226 206 268 150"
      />
    </svg>
  `,
  host: {
    class: 'nb-sticker-face',
    'aria-hidden': 'true',
    '[attr.data-nb-sticker-face]': '""',
  },
  styles: [
    `
      :host {
        --nb-sticker-face-ink: var(--nb-sticker-ink, #050505);

        display: block;
        width: var(--nb-sticker-face-size, 5.55rem);
        height: calc(var(--nb-sticker-face-size, 5.55rem) * 0.64);
        transform: translate(-29%, 2%);
      }

      .nb-sticker-face__svg {
        display: block;
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      .nb-sticker-face__eye {
        fill: var(--nb-sticker-face-ink);
      }

      .nb-sticker-face__smile {
        fill: none;
        stroke: var(--nb-sticker-face-ink);
        stroke-width: 36;
        stroke-linecap: round;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbStickerFace {}
