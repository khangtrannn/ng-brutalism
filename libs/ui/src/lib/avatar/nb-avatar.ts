import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

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
    '[style.background]': 'backgroundStyle()',
    '[style.color]': 'foregroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-radius]': 'radiusStyle()',
    '[style.box-shadow]': 'shadowStyle()',
    '[style.border-width]': 'borderWidthStyle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAvatar {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string>('');

  private readonly tone = inject(NbToneCapability);
  private readonly radius = inject(NbRadiusCapability);
  private readonly shadow = inject(NbShadowCapability);
  private readonly border = inject(NbBorderCapability);

  protected readonly backgroundStyle = computed(() => this.tone.background());
  protected readonly foregroundStyle = computed(() => this.tone.foreground());
  protected readonly borderColorStyle = computed(() => this.tone.borderColor());
  protected readonly radiusStyle = computed(() => this.radius.value());
  protected readonly shadowStyle = computed(() => this.shadow.value());
  protected readonly borderWidthStyle = computed(() => this.border.width());

  protected readonly classes = nbClass(
    'relative inline-flex h-10 w-10 shrink-0 overflow-hidden',
    'font-bold text-sm items-center justify-center'
  );
}
