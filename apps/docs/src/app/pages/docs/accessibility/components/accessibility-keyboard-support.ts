import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-accessibility-keyboard-support',
  template: `
    <section id="keyboard-support">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        What "disabled" means
      </h2>
      <p class="font-medium">
        <code class="font-mono">nb-select</code> options use
        <code class="font-mono">aria-disabled</code> and stay
        keyboard-reachable-but-not-activatable, per APG - arrow/Home/End/
        typeahead can land on them, but they can't be selected.
        <code class="font-mono">nb-accordion</code> headers use real
        <code class="font-mono">disabled</code> buttons instead and are
        skipped entirely by header navigation, since a genuinely disabled
        <code class="font-mono">&lt;button&gt;</code> can't receive focus at
        all - the two components intentionally follow different disabled
        semantics because their underlying elements do.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessibilityKeyboardSupport {}
