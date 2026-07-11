import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-installation-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <docs-code-block title="Component" [code]="usageCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationUsage {
  protected readonly usageCode = `import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-example',
  imports: [NbButton],
  template: \`<button nbButton tone="background" style="--nb-button-bg: #fff">Ship it</button>\`,
})
export class Example {}`;
}
