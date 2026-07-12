import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-installation-manual',
  imports: [DocsCodeBlock, RouterLink],
  template: `
    <section id="manual">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Manual setup
      </h2>
      <p class="mb-5 text-base font-medium">
        Use manual setup when Tailwind is already managed by your app or when
        you want to review each change yourself. Skipping Tailwind altogether?
        Follow
        <a routerLink="/docs/without-tailwind" class="underline"
          >Without Tailwind</a
        >
        instead.
      </p>
      <docs-code-block title="Install" [code]="manualInstallCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationManual {
  protected readonly manualInstallCode = `npm install @ng-brutalism/ui
# or
pnpm add @ng-brutalism/ui`;
}
