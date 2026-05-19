import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'docs-portfolio-footer',
    imports: [],
    template: `
    <footer
      class="border-t-4 border-black bg-white px-5 py-8 dark:bg-[#212121]"
    >
      <div
        class="mx-auto flex max-w-full flex-col gap-4 font-bold sm:flex-row sm:items-center sm:justify-between"
      >
        <p>Khang Tran | Built with ❤ &amp; ☕</p>
        <p
          class="border-2 border-black bg-yellow-300 px-3 py-1 font-mono text-sm text-black shadow-[4px_4px_0px_0px_#000]"
        >
          &lt;/&gt; with Angular + ng-brutalism
        </p>
      </div>
    </footer>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioFooterComponent {}
