import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-versioning-v1-gate',
  template: `
    <section id="v1-gate">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        What it takes to cut v1.0.0
      </h2>
      <p class="mb-4 font-medium">Both conditions, not either:</p>
      <ol class="list-decimal space-y-2 pl-6 font-medium">
        <li>
          The public API has been stable for <strong>6+ months</strong> - no
          breaking changes in that window.
        </li>
        <li>
          <strong>At least one external user</strong> has reported issues -
          the signal that the API is actually being exercised outside this
          repository, not just untouched because nobody's using it yet.
        </li>
      </ol>
      <p class="mt-4 font-medium">
        The second condition is deliberate: an API can look "stable" purely
        because no one has tried to break it. Real usage - and the friction
        reports that come with it - is what earns the v1.0 claim.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersioningV1Gate {}
