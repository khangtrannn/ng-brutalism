import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: '[nbResetMarginCapability]',
  host: {
    '[attr.data-nb-reset-margin]': 'reset() ? "" : null',
  },
})
export class NbResetMarginCapability {
  readonly reset = input<boolean, unknown>(true, { transform: booleanAttribute });
}
