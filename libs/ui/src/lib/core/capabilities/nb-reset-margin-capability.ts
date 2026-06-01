import { booleanAttribute, computed, Directive, input } from '@angular/core';

/**
 * INTERNAL capability — not part of the public API. Resets the host element's
 * margin to `0` when `reset` is true (the default), so browser-default margins
 * on `<p>`, `<h1>`–`<h6>`, and other typographic elements don't interfere with
 * layout-primitive spacing (nbStack, nbCluster, etc.).
 *
 * Shared by nbText and nbDisplay so neither primitive re-implements the same
 * one-line computed.
 */
@Directive({
  selector: '[nbResetMarginCapability]',
  host: {
    '[style.margin]': 'marginValue()',
  },
})
export class NbResetMarginCapability {
  readonly reset = input<boolean, unknown>(true, { transform: booleanAttribute });

  protected readonly marginValue = computed(() => (this.reset() ? '0' : null));
}
