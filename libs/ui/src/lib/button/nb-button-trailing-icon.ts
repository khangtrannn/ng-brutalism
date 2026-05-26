import { Directive } from '@angular/core';

@Directive({
  selector: '[nbButtonTrailingIcon]',
  host: {
    '[class]': '"ml-auto [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"',
    '[attr.data-nb-button-trailing-icon]': '""',
  },
})
export class NbButtonTrailingIcon {}
