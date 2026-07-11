import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCallout,
  NbChip,
  NbCluster,
  NbDisplay,
  NbSection,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-common-patterns-callout-panel',
  imports: [
    DocsExample,
    NbSurface,
    NbSection,
    NbCluster,
    NbDisplay,
    NbChip,
    NbStack,
    NbCallout,
    NbText,
    NbButton,
  ],
  template: `
    <section id="callout-panel" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Callout panel
      </h2>
      <p class="mb-6 text-base font-medium">
        Combine <code class="font-mono">nbCallout</code> inside a Surface for
        an eye-catching notice or price highlight.
      </p>

      <docs-example [code]="calloutPanelCode">
        <article
          nbSurface
          tone="cream"
          radius="xl"
          shadow="hard"
          border="strong"
          clip
          class="w-full max-w-md"
        >
          <header nbSection padding="lg" divider="bottom">
            <div nbCluster gap="sm" align="center" justify="between">
              <h2
                nbDisplay
                size="sm"
                underline="bar"
                underlineGap="xs"
                class="inline-flex flex-col items-start"
                style="--nb-underline-width: 45%"
              >
                Pricing
              </h2>
              <span nbChip tone="yellow">Early access</span>
            </div>
          </header>

          <div nbSection padding="lg">
            <div nbStack gap="lg">
              <div nbCallout tone="yellow" size="xl" shadow="hard">
                $49/mo
              </div>
              <p nbText>
                Everything included. No usage limits. Cancel any time.
              </p>
              <button nbButton tone="black" size="lg">
                Start free trial
              </button>
            </div>
          </div>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionCommonPatternsCalloutPanel {
  protected readonly calloutPanelCode = `<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Pricing</h2>
      <span nbChip tone="yellow">Early access</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="lg">
      <div nbCallout tone="yellow" size="xl" shadow="hard">$49/mo</div>
      <p nbText>
        Everything included. No usage limits. Cancel any time.
      </p>
      <button nbButton tone="black" size="lg">Start free trial</button>
    </div>
  </div>
</article>`;
}
