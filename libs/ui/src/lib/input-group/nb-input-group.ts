import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { nbRadiusStyleTransform } from '../core/input-transforms';
import { NB_INPUT_GROUP } from './input-group.types';

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
export class NbInputGroup {
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
}
