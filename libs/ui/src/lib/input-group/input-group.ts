import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
} from '@angular/core';

import { nbClass } from '../core/class';
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

  readonly hasPrefix = computed(() => this.prefixes().length > 0);
  readonly hasSuffix = computed(() => this.suffixes().length > 0);

  protected readonly classes = computed(() =>
    nbClass(
      '[--nb-input-group-bg:var(--nb-input-bg,var(--nb-field-bg))]',
      'relative inline-flex w-full rounded-nb border-2 border-(--nb-border)',
      'bg-(--nb-input-group-bg) shadow-nb focus-within:outline-none',
      'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-(--nb-border) focus-within:shadow-none'
    )
  );
}
