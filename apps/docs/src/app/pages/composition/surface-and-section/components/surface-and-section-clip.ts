import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSection, NbSurface, NbText } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-surface-section-clip',
  imports: [DocsExample, NbSurface, NbSection, NbText],
  template: `
    <section id="clip" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        The clip input
      </h2>
      <p class="mb-5 text-base font-medium">
        When a surface has a non-zero radius, add
        <code class="font-mono">clip</code> so that section backgrounds,
        dividers, and other inner content respect the outer rounded corners.
        Without <code class="font-mono">clip</code>, inner backgrounds bleed
        through the corners.
      </p>
      <docs-example [code]="clipCode">
        <div class="grid w-full gap-5 sm:grid-cols-2">
          <div>
            <p class="mb-2 font-mono text-xs font-bold uppercase opacity-70">
              With clip
            </p>
            <article
              nbSurface
              tone="pink"
              radius="xl"
              shadow="hard"
              border="strong"
              clip
              class="relative w-full"
            >
              <header
                nbSection
                padding="md"
                divider="bottom"
                class="relative min-h-32 bg-(--nb-blue) text-white"
              >
                <div
                  class="absolute -right-5 -top-5 size-16 rounded-full border-2 border-(--nb-border) bg-(--nb-yellow)"
                  aria-hidden="true"
                ></div>
                <div
                  class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] border-2 border-(--nb-border) bg-(--nb-primary)"
                  aria-hidden="true"
                ></div>
                <h3
                  nbText
                  size="2xl"
                  weight="black"
                  leading="tight"
                  class="relative z-10"
                >
                  With clip
                </h3>
              </header>
              <div nbSection padding="md">
                <p nbText size="sm">
                  The pushed-out dot and stripe are cut at the rounded edge.
                </p>
              </div>
            </article>
          </div>
          <div>
            <p class="mb-2 font-mono text-xs font-bold uppercase opacity-70">
              Without clip
            </p>
            <article
              nbSurface
              tone="lavender"
              radius="xl"
              shadow="hard"
              border="strong"
              class="relative w-full"
            >
              <header
                nbSection
                padding="md"
                divider="bottom"
                class="relative min-h-32 bg-(--nb-blue) text-white"
              >
                <div
                  class="absolute -right-5 -top-5 size-16 rounded-full border-2 border-(--nb-border) bg-(--nb-yellow)"
                  aria-hidden="true"
                ></div>
                <div
                  class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] border-2 border-(--nb-border) bg-(--nb-primary)"
                  aria-hidden="true"
                ></div>
                <h3
                  nbText
                  size="2xl"
                  weight="black"
                  leading="tight"
                  class="relative z-10"
                >
                  Without clip
                </h3>
              </header>
              <div nbSection padding="md">
                <p nbText size="sm">
                  The same inner children spill past the surface radius.
                </p>
              </div>
            </article>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSurfaceSectionClip {
  protected readonly clipCode = `<article nbSurface tone="cream" radius="xl" shadow="hard" clip class="relative">
  <header nbSection padding="md" divider="bottom" class="relative bg-(--nb-blue)">
    <div class="absolute -right-5 -top-5 size-16 rounded-full bg-(--nb-yellow)"></div>
    <div class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] bg-(--nb-primary)"></div>
  </header>
  <div nbSection padding="md">Decorative children are clipped by the surface.</div>
</article>

<article nbSurface tone="cream" radius="xl" shadow="hard" class="relative">
  <header nbSection padding="md" divider="bottom" class="relative bg-(--nb-blue)">
    <div class="absolute -right-5 -top-5 size-16 rounded-full bg-(--nb-yellow)"></div>
    <div class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] bg-(--nb-primary)"></div>
  </header>
  <div nbSection padding="md">Decorative children can spill outside the surface.</div>
</article>`;
}
