import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbStack, NbSurface } from '@ng-brutalism/ui';
import type { NbTone } from '@ng-brutalism/ui/tokens';

@Component({
  selector: 'docs-composition-overview-mental-model',
  imports: [NbStack, NbSurface, RouterLink],
  template: `
    <section id="mental-model" nbStack gap="md" class="scroll-mt-32">
      <h2 data-docs-heading class="text-2xl font-bold">The mental model</h2>
      <p class="text-base font-medium">
        Every ng-brutalism UI starts with a surface. Regions inside that surface
        are sections. Content flows vertically in stacks and horizontally in
        clusters. Two-column layouts use split. Actions and metadata complete
        the picture.
      </p>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        @for (item of primitiveMap; track item.name) {
          <a
            nbSurface
            [tone]="item.tone"
            border="strong"
            interactive
            [routerLink]="item.path"
            class="block p-4"
          >
            <code class="font-mono text-sm font-black">{{ item.name }}</code>
            <p class="mt-1 text-sm font-medium">{{ item.role }}</p>
          </a>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionOverviewMentalModel {
  protected readonly primitiveMap: {
    readonly name: string;
    readonly role: string;
    readonly tone: NbTone;
    readonly path: string;
  }[] = [
    {
      name: 'nbSurface',
      role: 'The brutalist panel',
      tone: 'yellow',
      path: '/components/surface',
    },
    {
      name: 'nbSection',
      role: 'Regions inside a panel',
      tone: 'mint',
      path: '/components/section',
    },
    {
      name: 'nbStack',
      role: 'Vertical composition',
      tone: 'pink',
      path: '/components/stack',
    },
    {
      name: 'nbCluster',
      role: 'Horizontal / wrapping groups',
      tone: 'lavender',
      path: '/components/cluster',
    },
    {
      name: 'nbSplit',
      role: 'Main + aside layout',
      tone: 'cream',
      path: '/components/split',
    },
    {
      name: 'nbButton',
      role: 'Action primitive',
      tone: 'white',
      path: '/components/button',
    },
    {
      name: 'nbChip',
      role: 'Small metadata primitive',
      tone: 'yellow',
      path: '/components/chip',
    },
    {
      name: 'nbText',
      role: 'Inline / block copy',
      tone: 'mint',
      path: '/components/text',
    },
    {
      name: 'nbTitle',
      role: 'Section heading',
      tone: 'pink',
      path: '/components/title',
    },
    {
      name: 'nbDisplay',
      role: 'Big loud heading',
      tone: 'lavender',
      path: '/components/display',
    },
  ];
}
