import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-versioning-page',
  imports: [NbCallout],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Project</p>
          <h1>Versioning &amp; Roadmap</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Ng Brutalism is pre-1.0. The components are usable today, but the
            public API can still change between minor versions while the
            library settles.
          </p>
        </div>
      </header>

      <section id="v0x-contract">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          The v0.x contract
        </h2>
        <p class="mb-4 font-medium">
          Until the library publishes v1.0.0, the public API may change
          between minor versions — a 0.1.x → 0.2.0 bump can carry a breaking
          change. This is stated up front so consumers can set explicit
          expectations rather than assume semver stability that doesn't
          exist yet.
        </p>
        <div nbCallout tone="warning" size="sm">
          Pre-1.0 breaking changes are called out per-release in
          <code class="font-mono">CHANGELOG.md</code> at the repository
          root.
        </div>
      </section>

      <section id="v1-gate">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          What it takes to cut v1.0.0
        </h2>
        <p class="mb-4 font-medium">Both conditions, not either:</p>
        <ol class="list-decimal space-y-2 pl-6 font-medium">
          <li>
            The public API has been stable for <strong>6+ months</strong> —
            no breaking changes in that window.
          </li>
          <li>
            <strong>At least one external user</strong> has reported issues —
            the signal that the API is actually being exercised outside this
            repository, not just untouched because nobody's using it yet.
          </li>
        </ol>
        <p class="mt-4 font-medium">
          The second condition is deliberate: an API can look "stable"
          purely because no one has tried to break it. Real usage — and the
          friction reports that come with it — is what earns the v1.0 claim.
        </p>
      </section>

      <section id="hardening-status">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          What's been hardened
        </h2>
        <p class="font-medium">
          A design-system audit and phased refactor closed the release
          blockers, packaging friction, token/theming gaps, and
          accessibility/forms gaps identified against mature component
          libraries: release blockers and CI package-smoke coverage;
          optional-Tailwind packaging and a public
          <code class="font-mono">/tokens</code> entry point with an API
          guard; the full 4-layer token model with zero remaining color
          literals; and <code class="font-mono">ControlValueAccessor</code>
          support, APG keyboard completion, and <code class="font-mono">vitest-axe</code>
          coverage across the select/accordion/dialog/field primitives. Rename
          and alias windows were taken pre-1.0, while the cost of a breaking
          change is still low.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VersioningPage {}
