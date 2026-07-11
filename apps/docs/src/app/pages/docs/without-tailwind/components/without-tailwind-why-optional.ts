import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-without-tailwind-why-optional',
  imports: [NbCallout],
  template: `
    <section id="why-optional">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Why it's optional
      </h2>
      <p class="mb-4 font-medium">
        Every component's stylesheet is hand-authored, plain CSS - custom
        properties, native
        <code class="font-mono">@layer</code>, ordinary selectors like
        <code class="font-mono">:where(span[nbBadge])</code>. There is no
        <code class="font-mono">@apply</code>, no Tailwind utility class, and
        no <code class="font-mono">@import "tailwindcss"</code> inside any
        file the library ships.
        <code class="font-mono">@ng-brutalism/ui/styles.css</code>
        is the fully bundled output - importing it is enough for every
        component to render correctly, with zero build-time processing.
      </p>
      <div nbCallout tone="cream" size="sm">
        <p class="normal-case">
          <code class="font-mono">tailwindcss</code> is marked
          <code class="font-mono">optional</code> in the package's
          <code class="font-mono">peerDependenciesMeta</code>, so installing
          without it produces no unmet-peer-dependency warning.
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutTailwindWhyOptional {}
