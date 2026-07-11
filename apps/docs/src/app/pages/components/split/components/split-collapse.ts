import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbSplit,
  NbStack,
  NbSurface,
  type NbSplitCollapse,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SplitCollapseDemo {
  readonly value: NbSplitCollapse;
  readonly label: string;
}

@Component({
  selector: 'docs-split-collapse',
  imports: [NbSplit, NbStack, NbSurface, DocsExample],
  template: `
    <section id="collapse">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Collapse
      </h2>
      <p class="mb-4 font-medium">
        Split stacks by default until the
        <code class="font-mono">md</code> breakpoint. Use
        <code class="font-mono">collapse="none"</code> for a permanent
        two-column split.
      </p>
      <docs-example [code]="collapseExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
          @for (collapse of collapses; track collapse.value) {
          <div nbSurface tone="yellow" shadow="sm" class="p-4">
            <div nbStack gap="sm">
              <span class="font-mono text-xs font-black uppercase">{{
                collapse.label
              }}</span>
              <div nbSplit gap="sm" [collapse]="collapse.value">
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-mint) p-3 font-black"
                  >Main</span
                >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-lavender) p-3 font-black"
                  >Aside</span
                >
              </div>
            </div>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitCollapse {
  protected readonly collapseExampleCode = `<div nbSplit collapse="none">...</div>
<div nbSplit collapse="sm">...</div>
<div nbSplit collapse="md">...</div>
<div nbSplit collapse="lg">...</div>`;

  protected readonly collapses = [
    { value: 'none', label: 'none' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md' },
    { value: 'lg', label: 'lg' },
  ] satisfies readonly SplitCollapseDemo[];
}
