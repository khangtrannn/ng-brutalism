import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-versioning-v0x-contract',
  imports: [NbCallout],
  template: `
    <section id="v0x-contract">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        The v0.x contract
      </h2>
      <p class="mb-4 font-medium">
        Until the library publishes v1.0.0, the public API may change between
        minor versions - a 0.1.x → 0.2.0 bump can carry a breaking change. This
        is stated up front so consumers can set explicit expectations rather
        than assume semver stability that doesn't exist yet.
      </p>
      <div nbCallout tone="cream" size="sm">
        <p class="normal-case">
          Pre-1.0 breaking changes are called out per-release in
          <code class="font-mono">CHANGELOG.md</code> at the repository root.
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersioningV0xContract {}
