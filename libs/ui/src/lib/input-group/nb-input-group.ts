import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
} from '@angular/core';

import {
  NB_INPUT_GROUP,
  NB_INPUT_PREFIX,
  NB_INPUT_SUFFIX,
  type NbInputGroupContext,
} from './input-group.types';

@Component({
  selector: 'nb-input-group',
  template: `<ng-content />`,
  providers: [{ provide: NB_INPUT_GROUP, useExisting: NbInputGroup }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbInputGroup implements NbInputGroupContext {
  private readonly prefixes = contentChildren(NB_INPUT_PREFIX);
  private readonly suffixes = contentChildren(NB_INPUT_SUFFIX);

  readonly hasPrefix = computed(() => this.prefixes().length > 0);
  readonly hasSuffix = computed(() => this.suffixes().length > 0);
}
