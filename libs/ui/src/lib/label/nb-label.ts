import { Directive } from '@angular/core';

import { nbClass } from '../core/class';

@Directive({
  selector: 'label[nbLabel]',
  host: {
    '[class]': 'classes',
  },
})
export class NbLabel {
  protected readonly classes = nbClass(
    'font-bold leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
  );
}
