import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-comparison-when-to-use',
  template: `
    <section id="when-to-use">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        When it fits
      </h2>
      <ul class="list-disc space-y-2 pl-6 font-medium">
        <li>
          You want the brutalist look on day one - chunky borders, offset
          shadows, punchy tones - without hand-rolling it.
        </li>
        <li>
          Portfolios, launch pages, side projects, prototypes, or products where
          a bold visual identity is the point.
        </li>
        <li>
          You're comfortable tuning CSS variables and Tailwind utilities close
          to the markup instead of a large theme-object abstraction.
        </li>
        <li>
          You're building with modern Angular (signals, zoneless, standalone)
          and don't need to support older Angular versions.
        </li>
      </ul>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonWhenToUse {}
