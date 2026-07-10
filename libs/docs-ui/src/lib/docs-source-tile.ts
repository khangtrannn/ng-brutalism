import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'docs-source-tile',
  template: `
    <a
      class="nb-stat-tile nb-stat-tile--lavender"
      [href]="href()"
      target="_blank"
      rel="noreferrer"
    >
      <span class="nb-stat-tile__value">Source ↗</span>
      <span class="nb-stat-tile__label">Open Docs</span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSourceTile {
  readonly href = input.required<string>();
}
