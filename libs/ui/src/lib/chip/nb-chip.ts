import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  computed,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NbIcon, type NbIconSize } from '../icon';
import { nbToneTokens, type NbTone } from '../tokens/tone';

export type NbChipTone = NbTone | 'ink';
// Token scale mirrors NbSplitPadding (`none | sm | md | lg | xl`) for API
// consistency with the layout directives. Values stay chip-specific and
// asymmetric (horizontal > vertical) because a chip is an inline pill, not a
// container — uniform container padding would make it a box.
export type NbChipPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type NbChipRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type NbChipShadow = 'none' | 'sm' | 'default' | 'hard';

const paddingMap: Record<NbChipPadding, string> = {
  none: 'px-0 py-0',
  sm: 'px-2 py-0.5',
  md: 'px-2.5 py-0.5',
  lg: 'px-4 py-2',
  xl: 'px-5 py-2.5',
};

const radiusMap: Record<NbChipRadius, string> = {
  none: '[--nb-chip-radius:0px]',
  sm: '[--nb-chip-radius:0.375rem]',
  md: '[--nb-chip-radius:0.5rem]',
  lg: '[--nb-chip-radius:0.75rem]',
  full: '[--nb-chip-radius:9999px]',
};

const shadowMap: Record<NbChipShadow, string> = {
  none: '[--nb-chip-shadow:none]',
  sm: '[--nb-chip-shadow:2px_2px_0_0_var(--nb-shadow)]',
  default:
    '[--nb-chip-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_0_var(--nb-shadow)]',
  hard: '[--nb-chip-shadow:6px_6px_0_0_var(--nb-shadow)]',
};

@Component({
  selector: 'span[nbChip]',
  imports: [NbIcon],
  template: `
    @if (icon()) {
      <span nbIcon [src]="icon()!" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-padding]': 'padding()',
    '[attr.data-radius]': 'radius()',
    '[attr.data-shadow]': 'shadow()',
    '[attr.data-nb-chip]': '""',
    '[style.--nb-chip-bg]': 'toneTokens().bg',
    '[style.--nb-chip-fg]': 'toneTokens().fg',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChip {
  readonly tone = input<NbChipTone>('default');
  readonly padding = input<NbChipPadding>('md');
  readonly radius = input<NbChipRadius>('none');
  readonly shadow = input<NbChipShadow>('sm');
  // Optional leading icon, given as an SVG/image URL. Rendered through nbIcon
  // in mask mode so it tints to the chip's foreground color. For full-color
  // or labeled icons, compose an `nbIcon` (or any element) as projected
  // content instead — the leading slot is only used when `icon` is set.
  readonly icon = input<string>();
  readonly iconSize = input<NbIconSize>('sm');

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center gap-1.5',
      'border-2 border-(--nb-border)',
      'bg-[var(--nb-chip-bg,var(--nb-surface))] text-[var(--nb-chip-fg,var(--nb-foreground))]',
      'rounded-(--nb-chip-radius) shadow-[var(--nb-chip-shadow)]',
      'text-xs font-bold',
      paddingMap[this.padding()],
      radiusMap[this.radius()],
      shadowMap[this.shadow()],
      '[&_svg]:size-[var(--nb-chip-icon-size,0.75rem)] [&_svg]:shrink-0'
    )
  );

  protected readonly toneTokens = computed(() => {
    const tone = this.tone();

    return tone === 'ink' ? nbToneTokens('black') : nbToneTokens(tone);
  });
}

@Directive({
  selector: '[nbChipGroup]',
  host: {
    class: 'flex flex-wrap gap-2',
    '[attr.data-nb-chip-group]': '""',
  },
})
export class NbChipGroup {}
