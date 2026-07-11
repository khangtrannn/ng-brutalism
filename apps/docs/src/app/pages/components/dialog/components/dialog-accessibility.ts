import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-dialog-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="mb-4 font-medium">
        <strong>APG pattern:</strong>
        <a
          href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
          target="_blank"
          rel="noreferrer"
          class="underline"
          >Dialog (Modal)</a
        >
        · <strong>Status:</strong> Stable.
      </p>
      <p class="mb-4 font-medium">
        Built on the native
        <code class="font-mono">&lt;dialog&gt;</code> element's
        <code class="font-mono">showModal()</code>, so focus trapping,
        <code class="font-mono">Escape</code>-to-close, and
        <code class="font-mono">role="dialog"</code>/
        <code class="font-mono">aria-modal</code> come from the browser itself
        rather than a hand-rolled implementation. Opening locks
        <code class="font-mono">body</code> scroll; the
        <code class="font-mono">dismissible</code> input controls whether a
        backdrop click closes it, and a <code class="font-mono">close</code>/
        <code class="font-mono">cancel</code> output syncs consumer state on
        every close path (backdrop, Escape, or
        <code class="font-mono">[nbDialogClose]</code>).
      </p>
      <p class="font-medium">
        Initial focus follows native behavior - the browser focuses the first
        <code class="font-mono">[autofocus]</code> or focusable element
        inside, so make sure at least one exists. Verified with
        <code class="font-mono">vitest-axe</code> against a fixture with the
        native <code class="font-mono">open</code> attribute set directly
        (jsdom doesn't implement <code class="font-mono">showModal()</code>).
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAccessibility {}
