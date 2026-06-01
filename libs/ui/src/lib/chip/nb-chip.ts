import {
  ChangeDetectionStrategy,
  Component,
  Directive,
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
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbToneToken } from '../tokens/tone';

export type NbChipTone = NbToneToken;
export type NbChipRadius = NbRadius;
export type NbChipShadow = NbShadow;
// Token scale mirrors the layout directives for API consistency, but values
// stay chip-specific and asymmetric (horizontal > vertical) because a chip is
// an inline pill, not a container — uniform container padding would make it a
// box. Padding therefore stays primitive-local rather than using the shared
// padding capability.
export type NbChipPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

const paddingMap: Record<NbChipPadding, string> = {
  none: 'px-0 py-0',
  sm: 'px-2 py-0.5',
  md: 'px-2.5 py-0.5',
  lg: 'px-4 py-2',
  xl: 'px-5 py-2.5',
};

@Component({
  selector: 'span[nbChip]',
  imports: [NbIcon],
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'chip' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'default',
        radius: 'none',
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
  template: `
    @if (icon()) {
      <span nbIcon [src]="icon()!" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.data-padding]': 'padding()',
    '[attr.data-nb-chip]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChip {
  readonly padding = input<NbChipPadding>('md');
  // Optional leading icon, given as an SVG/image URL. Rendered through nbIcon
  // in mask mode so it tints to the chip's foreground color. For full-color
  // or labeled icons, compose an `nbIcon` (or any element) as projected
  // content instead — the leading slot is only used when `icon` is set.
  readonly icon = input<string>();
  readonly iconSize = input<NbIconSize>('sm');

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center gap-1.5',
      'border-[length:var(--nb-chip-border-width,var(--nb-chip-border-width-default))] border-(--nb-chip-border-color)',
      'bg-(--nb-chip-bg) text-(--nb-chip-fg)',
      'rounded-[var(--nb-chip-radius,var(--nb-chip-radius-default))] shadow-[var(--nb-chip-shadow,var(--nb-chip-shadow-default))]',
      'text-xs font-bold',
      paddingMap[this.padding()],
      '[&_svg]:size-[var(--nb-chip-icon-size,0.75rem)] [&_svg]:shrink-0'
    )
  );
}

@Directive({
  selector: '[nbChipGroup]',
  host: {
    class: 'flex flex-wrap gap-2',
    '[attr.data-nb-chip-group]': '""',
  },
})
export class NbChipGroup {}
