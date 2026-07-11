import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-versioning-hardening-status',
  template: `
    <section id="hardening-status">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        What's been hardened
      </h2>
      <p class="font-medium">
        A design-system audit and phased refactor closed the release blockers,
        packaging friction, token/theming gaps, and accessibility/forms gaps
        identified against mature component libraries: release blockers and CI
        package-smoke coverage; optional-Tailwind packaging and a public
        <code class="font-mono">/tokens</code> entry point with an API guard;
        the full three-tier token model (raw palette →
        <code class="font-mono">--nb-tone-*</code> slots → per-component
        <code class="font-mono">--nb-&lt;component&gt;-*</code> hooks) with zero
        remaining color literals; and
        <code class="font-mono">ControlValueAccessor</code> support, APG
        keyboard completion, and <code class="font-mono">vitest-axe</code>
        coverage across the select/accordion/dialog/field primitives. Rename
        and alias windows were taken pre-1.0, while the cost of a breaking
        change is still low.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersioningHardeningStatus {}
