import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SsrBrowserChecks } from './components/ssr-browser-checks';
import { SsrIdGeneration } from './components/ssr-id-generation';
import { SsrOverview } from './components/ssr-overview';
import { SsrZoneless } from './components/ssr-zoneless';

@Component({
  selector: 'docs-ssr-page',
  imports: [SsrBrowserChecks, SsrIdGeneration, SsrOverview, SsrZoneless],
  template: `
    <article>
      <docs-ssr-overview />
      <docs-ssr-id-generation />
      <docs-ssr-zoneless />
      <docs-ssr-browser-checks />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SsrPage {}
