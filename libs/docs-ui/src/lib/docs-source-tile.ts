import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-source-tile',
  imports: [NbStat, NbSurface],
  template: `
    <a
      nbSurface
      tone="lavender"
      border="strong"
      padding="sm"
      layout="stack"
      interactive
      [href]="href()"
      target="_blank"
      rel="noreferrer"
      class="items-start"
    >
      <nb-stat value="Source ↗" label="Open Docs" />
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSourceTile {
  readonly href = input.required<string>();
}
