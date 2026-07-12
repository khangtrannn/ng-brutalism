import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-stack-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Add <code class="font-mono">nbStack</code> to the parent that owns the
        vertical flow. Use <code class="font-mono">gap</code> for rhythm,
        <code class="font-mono">align</code> for cross-axis alignment, and
        <code class="font-mono">justify</code> when the stack has a fixed
        height.
      </p>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackUsage {
  protected readonly importCode = `import { NbStack } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbStack gap="lg">
  <h2 nbDisplay>Build loud.</h2>

  <p>
    Stack gives you brutalist vertical rhythm without repeating flex and gap
    classes everywhere.
  </p>

  <button nbButton>Stay sharp</button>
</div>`;
}
