import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import { nbToneTokens, type NbTone } from '../tokens/tone';

export type NbChipTone = NbTone | 'ink';
// Token scale mirrors NbSplitPadding (`none | sm | md | lg | xl`) for API
// consistency with the layout directives. Values stay chip-specific and
// asymmetric (horizontal > vertical) because a chip is an inline pill, not a
// container — uniform container padding would make it a box.
export type NbChipPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

const paddingMap: Record<NbChipPadding, string> = {
  none: 'px-0 py-0',
  sm: 'px-2 py-0.5',
  md: 'px-2.5 py-0.5',
  lg: 'px-4 py-2',
  xl: 'px-5 py-2.5',
};

@Directive({
  selector: 'span[nbChip]',
  host: {
    '[class]': 'classes()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-padding]': 'padding()',
    '[attr.data-nb-chip]': '""',
    '[style.--nb-chip-bg]': 'toneTokens().bg',
    '[style.--nb-chip-fg]': 'toneTokens().fg',
  },
})
export class NbChip {
  readonly tone = input<NbChipTone>('default');
  readonly padding = input<NbChipPadding>('md');

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center gap-1.5',
      'border-2 border-(--nb-border)',
      'bg-[var(--nb-chip-bg,var(--nb-surface))] text-[var(--nb-chip-fg,var(--nb-foreground))]',
      'rounded-[var(--nb-chip-radius,0px)] shadow-[var(--nb-chip-shadow,2px_2px_0_0_var(--nb-shadow))]',
      'text-xs font-bold',
      paddingMap[this.padding()],
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
