import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-without-tailwind-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Concepts</p>
        <h1>Without Tailwind</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          <code class="font-mono">tailwindcss</code> is an optional peer
          dependency. Component styling ships as a static, self-contained CSS
          file - it does not require Tailwind to build or process it.
        </p>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutTailwindOverview {}
