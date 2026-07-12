import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbSurface,
  type NbSurfaceBorder,
  type NbSurfaceRadius,
  type NbSurfaceShadow,
  type NbSurfaceTone,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SurfaceShapeDemo {
  readonly label: string;
  readonly tone: NbSurfaceTone;
  readonly radius: NbSurfaceRadius;
  readonly border: NbSurfaceBorder;
  readonly shadow: NbSurfaceShadow;
}

@Component({
  selector: 'docs-surface-shape',
  imports: [NbSurface, DocsExample],
  template: `
    <section id="shape">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shape</h2>
      <p class="mb-4 font-medium">
        Combine <code class="font-mono">radius</code>,
        <code class="font-mono">border</code>, and
        <code class="font-mono">shadow</code> presets for different surface
        weights.
      </p>
      <docs-example [code]="shapeExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-3">
          @for (shape of shapes; track shape.label) {
            <div
              nbSurface
              [tone]="shape.tone"
              [radius]="shape.radius"
              [border]="shape.border"
              [shadow]="shape.shadow"
              class="min-h-32 p-4"
            >
              <p class="font-black">{{ shape.label }}</p>
              <p class="mt-2 font-mono text-xs">
                {{ shape.radius }} / {{ shape.border }} / {{ shape.shadow }}
              </p>
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceShape {
  protected readonly shapeExampleCode = `<div nbSurface radius="sm" border="thin" shadow="sm">Compact</div>
<div nbSurface tone="pink" radius="lg" border="md" shadow="hard">Poster</div>
<div nbSurface tone="mint" radius="xl" border="thick" shadow="heavy">Feature</div>`;

  protected readonly shapes = [
    {
      label: 'Compact',
      tone: 'white',
      radius: 'sm',
      border: 'thin',
      shadow: 'sm',
    },
    {
      label: 'Poster',
      tone: 'pink',
      radius: 'lg',
      border: 'md',
      shadow: 'hard',
    },
    {
      label: 'Feature',
      tone: 'mint',
      radius: 'xl',
      border: 'thick',
      shadow: 'heavy',
    },
  ] satisfies readonly SurfaceShapeDemo[];
}
