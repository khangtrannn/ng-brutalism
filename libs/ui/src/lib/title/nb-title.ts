import { Directive } from '@angular/core';

@Directive({
  selector: '[nbTitle]',
  standalone: true,
  host: {
    '[attr.data-nb-title]': '""',
  },
})
export class NbTitle {}
