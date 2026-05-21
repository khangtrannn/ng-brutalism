import { Directive } from '@angular/core';

@Directive({
  selector: '[nbTitle]',
  host: {
    '[attr.data-nb-title]': '""',
  },
})
export class NbTitle {}
