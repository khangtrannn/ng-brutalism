import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import { nbToneTokens, type NbTone } from '../tokens/tone';

export type NbChipTone = NbTone | 'ink';

@Directive({
  selector: 'span[nbChip]',
  host: {
    '[class]': 'classes()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-nb-chip]': '""',
    '[style.--nb-chip-bg]': 'toneTokens().bg',
    '[style.--nb-chip-fg]': 'toneTokens().fg',
  },
})
export class NbChip {
  readonly tone = input<NbChipTone>('default');

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center gap-1.5',
      'border-2 border-(--nb-border)',
      'bg-[var(--nb-chip-bg,var(--nb-surface))] text-[var(--nb-chip-fg,var(--nb-foreground))]',
      'rounded-[var(--nb-chip-radius,0px)] shadow-[var(--nb-chip-shadow,2px_2px_0_0_var(--nb-shadow))]',
      'px-2.5 py-0.5 text-xs font-bold',
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
