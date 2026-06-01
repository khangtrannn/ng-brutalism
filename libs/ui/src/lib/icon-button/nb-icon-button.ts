import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { NbIcon, type NbIconSize } from '../icon';

export type NbIconButtonShape = 'square' | 'circle';
export type NbIconButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// Each size sets the square touch target plus a matching glyph size. The glyph
// size feeds both the projected `<svg>` (via `[&_svg]:size-*`) and the internal
// `nbIcon` (via `iconSize`) so the two authoring styles render identically.
const sizeMap: Record<NbIconButtonSize, string> = {
  sm: 'size-8 [&_svg]:size-4',
  md: 'size-10 [&_svg]:size-5',
  lg: 'size-12 [&_svg]:size-6',
  xl: 'size-14 [&_svg]:size-8',
};

const iconSizeMap: Record<NbIconButtonSize, NbIconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

@Component({
  selector: 'button[nbIconButton]',
  imports: [NbIcon],
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'icon-button' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'default',
        radius: 'none',
        shadow: 'default',
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
  template: `
    @if (icon(); as iconSrc) {
      <span nbIcon [src]="iconSrc" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.data-shape]': 'shape()',
    '[attr.data-nb-icon-button]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbIconButton {
  readonly shape = input<NbIconButtonShape>('square');
  readonly size = input<NbIconButtonSize>('md');
  // Optional icon, given as an SVG/image URL. Rendered through nbIcon in mask
  // mode so it tints to the button's foreground color and sizes to match the
  // button. For full-color or custom icons, project an `<svg>`/`nbIcon` as
  // content instead — the internal slot is only used when `icon` is set.
  readonly icon = input<string>();

  protected readonly iconSize = computed<NbIconSize>(() => iconSizeMap[this.size()]);

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center justify-center shrink-0 select-none',
      'hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none',
      'transition-all duration-150 ease-out',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      sizeMap[this.size()],
      this.shape() === 'circle' && 'rounded-full',
    )
  );
}
