import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-sticker-face',
  template: `
    <svg
      data-slot="sticker-face-svg"
      viewBox="13 5 320 220"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse data-slot="sticker-face-eye" cx="126" cy="64" rx="20" ry="35" />
      <ellipse data-slot="sticker-face-eye" cx="214" cy="64" rx="20" ry="35" />
      <path
        data-slot="sticker-face-smile"
        d="M78 132 C116 202 226 206 268 150"
      />
    </svg>
  `,
  host: {
    'aria-hidden': 'true',
    '[attr.data-nb-sticker-face]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbStickerFace {}
