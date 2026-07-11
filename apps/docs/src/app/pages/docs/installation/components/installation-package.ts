import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-installation-package',
  imports: [DocsCodeBlock],
  template: `
    <section id="package">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Automatic setup
      </h2>
      <p class="mb-5 text-base font-medium">
        Use the schematic when you want the package, Tailwind CSS v4, PostCSS,
        and global style imports configured for you.
      </p>
      <docs-code-block title="Angular CLI" [code]="schematicInstallCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationPackage {
  protected readonly schematicInstallCode = `ng add @ng-brutalism/ui`;
}
