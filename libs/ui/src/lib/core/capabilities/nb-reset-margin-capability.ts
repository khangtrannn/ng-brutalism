import { booleanAttribute, Directive, input } from '@angular/core';

/**
 * INTERNAL capability — not part of the public API. Marks the host for a
 * low-specificity stylesheet margin reset when `reset` is true (the default),
 * so browser-default margins on `<p>`, `<h1>`–`<h6>`, and other typographic
 * elements don't interfere with layout-primitive spacing (nbStack, nbCluster,
 * etc.).
 *
 * Shared by nbText and nbDisplay so neither primitive re-implements the same
 * one-line computed.
 */
@Directive({
  selector: '[nbResetMarginCapability]',
  host: {
    '[attr.data-nb-reset-margin]': 'reset() ? "" : null',
  },
})
export class NbResetMarginCapability {
  readonly reset = input<boolean, unknown>(true, { transform: booleanAttribute });
}
