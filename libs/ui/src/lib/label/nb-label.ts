import { Directive } from '@angular/core';

@Directive({
  selector: 'label[nbLabel]',

  exportAs: 'nbLabel',
})
export class NbLabel {}
