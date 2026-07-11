import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-introduction-quick-start',
  imports: [DocsCodeBlock],
  template: `
    <section id="quick-start">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Quick start
      </h2>
      <p class="mb-5 text-base font-medium">
        Install the package, import the stylesheet once, then pull each
        primitive into the Angular component that actually uses it.
      </p>
      <docs-code-block title="Component" [code]="quickStartCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionQuickStart {
  protected readonly quickStartCode = `import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-ship-button',
  imports: [NbButton],
  template: \`
    <button nbButton type="button">
      Ship the thing
    </button>
  \`,
})
export class ShipButton {}`;
}
