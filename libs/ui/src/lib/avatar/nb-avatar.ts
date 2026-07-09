import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type {
  NbBorderStrength,
  NbRadius,
  NbShadow,
  NbTone,
} from '@ng-brutalism/ui/tokens';
export type NbAvatarTone = NbTone;
export type NbAvatarRadius = NbRadius;
export type NbAvatarShadow = NbShadow;
export type NbAvatarBorder = NbBorderStrength;

@Component({
  selector: 'nb-avatar',
  exportAs: 'nbAvatar',
  template: `
    @if (src()) {
    <img [src]="src()" [alt]="alt()" data-slot="avatar-image" />
    } @else {
    <ng-content />
    }
  `,
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    'data-slot': 'avatar',
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'alt()',
    '[style.--nb-avatar-radius]': 'radius()',
    '[style.--nb-avatar-shadow]': 'shadow()',
    '[style.--nb-avatar-border-width]': 'border()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAvatar {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string>('');
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
}
