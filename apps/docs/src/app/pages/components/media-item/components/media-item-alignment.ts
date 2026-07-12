import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMediaItem, type NbMediaItemAlign } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface AlignDemo {
  readonly value: NbMediaItemAlign;
  readonly label: string;
  readonly description: string;
}

@Component({
  selector: 'docs-media-item-alignment',
  imports: [NbMediaItem, DocsExample],
  template: `
    <section id="alignment">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Alignment</h2>
      <docs-example [code]="alignmentExampleCode">
        <div class="flex flex-col gap-4 p-4">
          @for (align of alignments; track align.value) {
            <div class="flex flex-col gap-2">
              <span class="text-xs font-black uppercase opacity-60"
                >{{ align.label }} - {{ align.description }}</span
              >
              <nb-media-item
                variant="boxed"
                size="md"
                tone="yellow"
                [align]="align.value"
                icon="/icons/world.png"
                iconAlt="World"
                title="Global Network"
                description="140+ destinations"
              />
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemAlignment {
  protected readonly alignmentExampleCode = `<nb-media-item
  variant="boxed"
  size="md"
  tone="yellow"
  align="start"
  icon="/icons/world.png"
  iconAlt="World"
  title="Global Network"
  description="140+ destinations"
/>

<nb-media-item
  variant="boxed"
  size="md"
  tone="yellow"
  align="center"
  icon="/icons/world.png"
  iconAlt="World"
  title="Global Network"
  description="140+ destinations"
/>

<nb-media-item
  variant="boxed"
  size="md"
  tone="yellow"
  align="between"
  icon="/icons/world.png"
  iconAlt="World"
  title="Global Network"
  description="140+ destinations"
/>`;

  protected readonly alignments = [
    {
      value: 'start',
      label: 'Start',
      description: 'default, left-aligned content',
    },
    { value: 'center', label: 'Center', description: 'centered content' },
    {
      value: 'between',
      label: 'Between',
      description: 'stretches to full width',
    },
  ] satisfies readonly AlignDemo[];
}
