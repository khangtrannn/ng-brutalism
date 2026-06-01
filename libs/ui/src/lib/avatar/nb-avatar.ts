import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { nbClass } from '../core/class';
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
    <img [src]="src()" [alt]="alt()" class="h-full w-full object-cover" />
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
    '[class]': 'classes',
    '[attr.data-slot]': '"avatar"',
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'alt()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAvatar {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string>('');

  protected readonly classes = nbClass(
    'relative inline-flex h-10 w-10 shrink-0 overflow-hidden',
    'rounded-(--nb-avatar-radius)',
    'border-(length:--nb-avatar-border-width) border-(--nb-avatar-border-color)',
    'bg-(--nb-avatar-bg) text-(--nb-avatar-fg)',
    'shadow-[var(--nb-avatar-shadow)]',
    'font-bold text-sm items-center justify-center'
  );
}
