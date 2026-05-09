import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbAccordionTrigger, NbButton, NbAccordionItem, NbAccordion } from '@ng-neo-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-button-page',
  standalone: true,
  imports: [DocsCodeBlockComponent, DocsExampleComponent, NbButton, NbAccordionTrigger, NbAccordionItem, NbAccordion],
  template: `
    <article>
      <header id="overview" class="mb-8 scroll-mt-32">
        <div>
          <neo-accordion>
<neo-accordion-item>
            <neo-accordion-trigger>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus exercitationem, nihil id illo delectus sint dolor autem enim excepturi vel.
            </neo-accordion-trigger>
          </neo-accordion-item>
          </neo-accordion>

          <p class="mb-2 text-sm font-bold uppercase tracking-wide">
            Components
          </p>
          <h1>Button</h1>
          <p class="mt-0 max-w-3xl text-base font-medium sm:text-lg">
            Displays a button or link that looks like a button, with hard
            borders, offset shadows, strong colors, keyboard focus states, and
            native disabled behavior.
          </p>
        </div>

        <a
          nbButton
          size="sm"
          variant="neutral"
          href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/button"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </header>

      <section id="preview">
        <h2>Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <button nbButton variant="neutral">Button</button>
        </docs-example>
      </section>

      <section id="usage">
        <h2>Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="full-width">
        <h2>Full width</h2>
        <docs-example [code]="fullWidthExampleCode">
          <div class="w-full max-w-md">
            <button nbButton variant="neutral" [fullWidth]="true">
              Full width button
            </button>
          </div>
        </docs-example>
      </section>

      <section id="disabled">
        <h2>Disabled</h2>
        <docs-example [code]="disabledExampleCode">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <button nbButton variant="neutral" disabled>
              Disabled button
            </button>
            <a nbButton href="#" aria-disabled="true">Disabled link style</a>
          </div>
        </docs-example>
      </section>

      <section id="anchor-usage">
        <h2>Anchor usage</h2>
        <docs-example [code]="anchorExampleCode">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              nbButton
              href="https://angular.dev"
              target="_blank"
              rel="noreferrer"
            >
              Angular Docs
            </a>

            <a
              nbButton
              variant="neutral"
              href="https://github.com/khangtrannn/ng-neo-brutalism-workspace"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repo
            </a>
          </div>
        </docs-example>
      </section>

      <section id="api">
        <h2>API</h2>

        <div
          class="overflow-hidden border-4 border-[var(--nb-border)] bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th
                  class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-bold"
                >
                  Input
                </th>
                <th
                  class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-bold"
                >
                  Type
                </th>
                <th
                  class="border-b-4 border-[var(--nb-border)] px-4 py-3 font-bold"
                >
                  Default
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td
                  class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3"
                >
                  variant
                </td>
                <td
                  class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm"
                >
                  'default' | 'reverse' | 'noShadow' | 'neutral'
                </td>
                <td
                  class="border-b-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm"
                >
                  'default'
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3"
                >
                  size
                </td>
                <td
                  class="border-b-4 border-r-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm"
                >
                  'default' | 'sm' | 'lg' | 'icon'
                </td>
                <td
                  class="border-b-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm"
                >
                  'default'
                </td>
              </tr>
              <tr>
                <td class="border-r-4 border-[var(--nb-border)] px-4 py-3">
                  fullWidth
                </td>
                <td
                  class="border-r-4 border-[var(--nb-border)] px-4 py-3 font-mono text-sm"
                >
                  boolean
                </td>
                <td class="px-4 py-3 font-mono text-sm">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonPageComponent {
  protected readonly defaultExampleCode = `<button nbButton variant="neutral">Button</button>`;

  protected readonly importCode = `import { NbButton } from '@ng-neo-brutalism/ui';`;

  protected readonly providerCode = `import { ApplicationConfig } from '@angular/core';
import { provideNgNeoBrutalism } from '@ng-neo-brutalism/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideNgNeoBrutalism()],
};`;

  protected readonly variantsExampleCode = `<button nbButton>Default</button>
<button nbButton variant="reverse">Reverse</button>
<button nbButton variant="noShadow">No shadow</button>
<button nbButton variant="neutral">Neutral</button>`;

  protected readonly sizesExampleCode = `<button nbButton size="sm" variant="neutral">Small</button>
<button nbButton size="default" variant="neutral">Default</button>
<button nbButton size="lg" variant="neutral">Large</button>
<button nbButton size="icon" variant="neutral" aria-label="Icon button">+</button>`;

  protected readonly fullWidthExampleCode = `<button nbButton variant="neutral" [fullWidth]="true">
  Full width button
</button>`;

  protected readonly disabledExampleCode = `<button nbButton variant="neutral" disabled>Disabled button</button>
<a nbButton href="#" aria-disabled="true">Disabled link style</a>`;

  protected readonly anchorExampleCode = `<a nbButton href="https://angular.dev" target="_blank" rel="noreferrer">
  Angular Docs
</a>

<a
  nbButton
  variant="neutral"
  href="https://github.com/khangtrannn/ng-neo-brutalism-workspace"
  target="_blank"
  rel="noreferrer"
>
  GitHub Repo
</a>`;
}
