import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
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
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAvatar {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string>('');
}
