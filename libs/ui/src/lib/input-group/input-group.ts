import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NB_SELECT } from '../select/select.types';
import {
  NB_INPUT_GROUP,
  NB_INPUT_PREFIX,
  NB_INPUT_SUFFIX,
  type NbInputGroupContext,
} from './input-group.types';

@Component({
  selector: 'nb-input-group',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
  },
  providers: [{ provide: NB_INPUT_GROUP, useExisting: NbInputGroup }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbInputGroup implements NbInputGroupContext {
  private readonly prefixes = contentChildren(NB_INPUT_PREFIX);
  private readonly suffixes = contentChildren(NB_INPUT_SUFFIX);
  private readonly selects = contentChildren(NB_SELECT);

  readonly hasPrefix = computed(() => this.prefixes().length > 0);
  readonly hasSuffix = computed(() => this.suffixes().length > 0);

  protected readonly classes = computed(() => {
    const hasSelect = this.selects().length > 0;
    return nbClass(
      'relative inline-flex w-full rounded-nb border-2 border-(--nb-border)',
      'bg-(--nb-surface) shadow-nb focus-within:outline-none',
      hasSelect
        ? 'focus-within:border-(--nb-focus,#8b5cf6)'
        : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-(--nb-border) focus-within:shadow-none'
    );
  });
}
