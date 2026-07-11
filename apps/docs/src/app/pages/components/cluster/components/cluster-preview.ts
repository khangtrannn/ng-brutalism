import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbCluster, NbDisplay } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-cluster-preview',
  imports: [DocsExample, NbButton, NbCluster, NbDisplay],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div
          nbCluster
          gap="2xl"
          align="center"
          justify="center"
          class="w-full max-w-4xl p-2 text-center"
        >
          <div class="flex shrink-0 flex-col items-center gap-4">
            <div
              class="grid size-24 place-items-center border-3 border-(--nb-border) bg-(--nb-yellow) font-display text-3xl font-black shadow-[7px_7px_0_0_var(--nb-shadow)] sm:size-28 sm:text-4xl"
            >
              NB
            </div>

            <button nbButton size="lg" class="w-36">Ship it</button>
          </div>

          <div class="min-w-0 flex-1 basis-80">
            <div nbCluster gap="sm" justify="center" class="mb-4">
              <span
                class="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]"
                >Logo</span
              >
              <span
                class="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]"
                >Actions</span
              >
              <span
                class="border-2 border-(--nb-border) bg-(--nb-pink) px-3 py-1 font-mono text-xs font-black uppercase text-white shadow-[3px_3px_0_0_var(--nb-shadow)]"
                >Badges</span
              >
            </div>

            <h2
              nbDisplay
              class="mb-3! [--nb-display-size:2.75rem] sm:[--nb-display-size:3.75rem]"
            >
              Cluster loud.
            </h2>
            <p
              class="mx-auto max-w-2xl text-lg font-bold leading-tight sm:text-xl"
            >
              Inline rhythm for logos, actions, badges, and feature rows.
            </p>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterPreview {
  protected readonly defaultExampleCode = `<div nbCluster gap="2xl" align="center" justify="center">
  <div>
    <div>NB</div>
    <button nbButton size="lg">Ship it</button>
  </div>

  <div>
    <div nbCluster gap="sm" justify="center">
      <span>Logo</span>
      <span>Actions</span>
      <span>Badges</span>
    </div>

    <h2 nbDisplay>Cluster loud.</h2>
    <p>Inline rhythm for logos, actions, badges, and feature rows.</p>
  </div>
</div>`;
}
