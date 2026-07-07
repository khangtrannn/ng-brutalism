import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
} from '@angular/core';

import { nbRadiusStyleTransform } from '../core/input-transforms';
import {
  NB_INPUT_GROUP,
  NB_INPUT_PREFIX,
  NB_INPUT_SUFFIX,
  type NbInputGroupContext,
} from './input-group.types';

@Component({
  selector: 'nb-input-group',
  exportAs: 'nbInputGroup',
  template: `<ng-content />`,
  providers: [{ provide: NB_INPUT_GROUP, useExisting: NbInputGroup }],
  host: {
    '[style.--nb-input-group-radius]': 'radius()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbInputGroup implements NbInputGroupContext {
  private readonly prefixes = contentChildren(NB_INPUT_PREFIX);
  private readonly suffixes = contentChildren(NB_INPUT_SUFFIX);

  readonly hasPrefix = computed(() => this.prefixes().length > 0);
  readonly hasSuffix = computed(() => this.suffixes().length > 0);

  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
}
