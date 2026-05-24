import { ChangeDetectionStrategy, Component } from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-media',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"media"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbMedia {
  protected readonly classes = nbClass(
    '[--nb-media-bg:var(--nb-background)]',
    '[--nb-media-border:var(--nb-border)]',
    '[--nb-media-radius:var(--nb-radius)]',
    '[--nb-media-shadow:2px_2px_0_var(--nb-shadow)]',
    'relative inline-flex items-center justify-center overflow-hidden',
    'bg-(--nb-media-bg)',
    'border-2 border-(--nb-media-border)',
    'rounded-(--nb-media-radius)',
    'shadow-[var(--nb-media-shadow)]'
  );
}
