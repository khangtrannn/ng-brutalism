import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbCallout } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';

@Component({
  selector: 'docs-customization-page',
  imports: [DocsCodeBlock, NbCallout, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Concepts</p>
          <h1>Customization</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            ng-brutalism has one customization surface, not three. Angular
            inputs and CSS custom properties write to the
            <strong>same public slot</strong> — there's no separate class API
            and no input-only escape hatch. Once you know the rule, you can
            predict how any override resolves without reading source.
          </p>
        </div>
      </header>

      <section id="mental-model">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          The core rule
        </h2>
        <p class="mb-4 font-medium">
          Every customizable scalar (radius, shadow, padding, a color slot...)
          gets exactly one public CSS variable. A design-prop input writes an
          inline value onto that variable; a CSS rule targeting the same
          variable resolves through the normal cascade. Both paths land on
          the identical property — there's nothing input-specific about what
          an input does under the hood.
        </p>
        <docs-code-block title="Component CSS" [code]="cssRuleCode" />
        <p class="mt-5 mb-2 font-medium">
          Setting the input and overriding the CSS variable both resolve to
          the same rendered radius:
        </p>
        <docs-code-block title="Equivalent" [code]="equivalentCode" />
      </section>

      <section id="precedence">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Precedence contract
        </h2>
        <p class="mb-4 font-medium">
          When nothing about a slot has been touched on a given element,
          resolution follows the normal CSS cascade — local rule, then
          inherited rule, then the component's built-in fallback:
        </p>
        <ol class="mb-5 list-decimal space-y-2 pl-6 font-medium">
          <li>
            An input on the element writes the variable
            <strong>inline</strong> — inline styles win over any stylesheet
            rule, including your own, short of <code class="font-mono">!important</code>.
          </li>
          <li>
            With no input set, the variable resolves like any other custom
            property: a rule targeting the element wins, otherwise an
            inherited value from an ancestor, otherwise the component's own
            <code class="font-mono">var(--nb-x, fallback)</code> default.
          </li>
          <li>
            <code class="font-mono">!important</code> on a stylesheet rule
            beats an inline input value — the one documented escape hatch,
            useful when a consumer needs to force an override for an
            accessibility fix regardless of what inputs are set upstream.
          </li>
        </ol>
        <div nbCallout tone="danger" size="sm" class="mb-2">
          <strong>Don't set both</strong> an input and a same-name CSS
          variable override on the <em>same element</em> — the input's inline
          value always wins there, so the CSS rule silently does nothing.
          Use the input for one-off, per-instance overrides; use a CSS rule
          when you want to restyle every instance under a selector.
        </div>
      </section>

      <section id="scope">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Choosing a scope
        </h2>
        <p class="mb-4 font-medium">
          Pick the narrowest rule that gets the job done:
        </p>
        <docs-code-block title="Scopes" [code]="scopesCode" />
      </section>

      <section id="tone">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Tone is different
        </h2>
        <p class="font-medium">
          Scalar props (radius, shadow, padding...) are single variables.
          <code class="font-mono">tone</code> is semantic instead — setting it
          reflects <code class="font-mono">data-nb-tone="..."</code> on the
          host, and a whole recipe of background/foreground/border variables
          resolves from that attribute through
          <code class="font-mono">tone.css</code>. See
          <a routerLink="/docs/design-props" class="underline">Design Props</a>
          for the full vocabulary this applies to.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomizationPage {
  protected readonly cssRuleCode = `[data-nb-callout] {
  border-radius: var(--nb-callout-radius, 0.75rem);
}`;

  protected readonly equivalentCode = `<div nbCallout radius="xl">...</div>

<div nbCallout class="marketing-callout">...</div>

.marketing-callout {
  --nb-callout-radius: var(--nb-radius-xl);
}`;

  protected readonly scopesCode = `<nb-card radius="xl">...</nb-card>

.pricing-section nb-card {
  --nb-card-radius: var(--nb-radius-xl);
}

:root {
  --nb-card-radius: var(--nb-radius-xl);
}`;
}
