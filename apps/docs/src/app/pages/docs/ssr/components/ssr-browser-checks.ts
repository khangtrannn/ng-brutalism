import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-ssr-browser-checks',
  imports: [NbCallout],
  template: `
    <section id="browser-checks">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Browser-only behavior
      </h2>
      <p class="mb-4 font-medium">
        Where a feature genuinely has no server-side equivalent - the native
        <code class="font-mono">&lt;dialog&gt;</code> element's
        <code class="font-mono">showModal()</code>, the select popup's
        Popover-API positioning, clipboard access in code-block copy buttons -
        the browser-dependent call is guarded behind Angular's platform checks
        (<code class="font-mono">isPlatformBrowser</code>) rather than assumed
        to exist.
      </p>
      <div nbCallout tone="cream" size="sm">
        <p class="normal-case">
          If you hit a hydration mismatch that isn't covered here, it's a bug
          - please open an issue with a minimal repro.
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SsrBrowserChecks {}
