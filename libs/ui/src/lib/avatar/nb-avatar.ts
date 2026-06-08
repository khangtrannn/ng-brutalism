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

export type NbAvatarTone = NbToneToken;
export type NbAvatarRadius = NbRadius;
export type NbAvatarShadow = NbShadow;
export type NbAvatarBorder = NbBorderStrength;

@Component({
  selector: 'nb-avatar',
  template: `
    @if (src()) {
    <img [src]="src()" [alt]="alt()" data-slot="avatar-image" />
    } @else {
    <ng-content />
    }
  `,
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'avatar' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'surface',
        radius: 'full',
        shadow: 'sm',
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
    '[attr.data-slot]': '"avatar"',
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'alt()',
    '[style.background]': 'tone.background()',
    '[style.color]': 'tone.foreground()',
    '[style.border-color]': 'tone.borderColor()',
    '[style.border-radius]': 'radius.value()',
    '[style.box-shadow]': 'shadow.value()',
    '[style.border-width]': 'border.width()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAvatar {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string>('');

  protected readonly tone = inject(NbToneCapability);
  protected readonly radius = inject(NbRadiusCapability);
  protected readonly shadow = inject(NbShadowCapability);
  protected readonly border = inject(NbBorderCapability);
}
