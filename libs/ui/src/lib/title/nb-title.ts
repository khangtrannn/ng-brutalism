import { Directive } from '@angular/core';

@Directive({
  selector: '[nbTitle]',
  exportAs: 'nbTitle',
  host: {
    'data-nb-title': '',
    'data-underline': 'wave',
  },
})
export class NbTitle {}
