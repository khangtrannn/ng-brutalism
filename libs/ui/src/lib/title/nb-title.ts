import { Directive } from '@angular/core';

@Directive({
  selector: '[nbTitle]',
  host: {
    '[attr.data-nb-title]': '""',
    '[attr.data-underline]': '"wave"',
  },
})
export class NbTitle {}
