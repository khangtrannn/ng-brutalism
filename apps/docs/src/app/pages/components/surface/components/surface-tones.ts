import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSurface, type NbSurfaceTone } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SurfaceToneDemo {
  readonly value: NbSurfaceTone;
  readonly label: string;
  readonly description: string;
}

@Component({
  selector: 'docs-surface-tones',
  imports: [NbSurface, DocsExample],
  template: `
    <section id="tones">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
      <docs-example [code]="tonesExampleCode">
        <div class="grid w-full grid-cols-1 gap-3 p-4 sm:grid-cols-2">
          @for (tone of tones; track tone.value) {
          <div nbSurface [tone]="tone.value" shadow="sm" class="p-4">
            <p class="font-mono text-xs font-black uppercase opacity-75">
              {{ tone.label }}
            </p>
            <p class="mt-1 text-sm font-bold">{{ tone.description }}</p>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceTones {
  protected readonly tonesExampleCode = `<div nbSurface tone="surface">Surface theme surface</div>
<div nbSurface tone="yellow">Yellow surface</div>
<div nbSurface tone="black">Black surface</div>
<div nbSurface tone="success">Success surface</div>`;

  protected readonly tones = [
    {
      value: 'surface',
      label: 'surface',
      description: 'Uses --nb-surface tokens.',
    },
    {
      value: 'background',
      label: 'background',
      description: 'Uses the page background tokens.',
    },
    { value: 'cream', label: 'cream', description: 'Warm editorial panel.' },
    { value: 'white', label: 'white', description: 'Crisp white panel.' },
    {
      value: 'black',
      label: 'black',
      description: 'High contrast black panel.',
    },
    { value: 'yellow', label: 'yellow', description: 'Main brutalist yellow.' },
    { value: 'pink', label: 'pink', description: 'Punchy pink accent.' },
    { value: 'mint', label: 'mint', description: 'Soft pastel mint.' },
    {
      value: 'lavender',
      label: 'lavender',
      description: 'Pale lavender surface.',
    },
    { value: 'blue', label: 'blue', description: 'Clear sky blue surface.' },
    { value: 'primary', label: 'primary', description: 'Theme primary color.' },
    {
      value: 'secondary',
      label: 'secondary',
      description: 'Theme secondary color.',
    },
    { value: 'accent', label: 'accent', description: 'Theme accent color.' },
    {
      value: 'success',
      label: 'success',
      description: 'Semantic success tone.',
    },
    {
      value: 'warning',
      label: 'warning',
      description: 'Semantic warning tone.',
    },
    { value: 'danger', label: 'danger', description: 'Semantic danger tone.' },
  ] satisfies readonly SurfaceToneDemo[];
}
