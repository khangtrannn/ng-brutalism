import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbIconButton } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-icon-button-shapes',
  imports: [NbIconButton, DocsExample],
  template: `
    <section id="shapes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shapes</h2>
      <docs-example [code]="shapesExampleCode">
        <div class="flex items-center gap-6 p-4">
          <div class="flex flex-col items-center gap-2">
            <button nbIconButton aria-label="Action">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </button>
            <span class="font-mono text-xs font-bold">square</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <button nbIconButton shape="circle" aria-label="Action">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </button>
            <span class="font-mono text-xs font-bold">circle</span>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonShapes {
  protected readonly shapesExampleCode = `<button nbIconButton aria-label="Square action">
  <svg ...>...</svg>
</button>
<button nbIconButton shape="circle" aria-label="Circle action">
  <svg ...>...</svg>
</button>`;
}
