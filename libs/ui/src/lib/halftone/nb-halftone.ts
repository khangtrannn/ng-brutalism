import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

export type NbHalftoneShape = 'square' | 'circle' | 'rectangle';

const DEFAULT_SHAPE: NbHalftoneShape = 'square';
const DEFAULT_ROWS = 7;
const DEFAULT_COLUMNS = 7;
const DEFAULT_DOT_SIZE = 6;
const DEFAULT_DOT_GAP = 5;
const RECTANGLE_DEFAULT_ROWS = 3;
const RECTANGLE_DEFAULT_COLUMNS = 13;

@Component({
  selector: 'nb-halftone, [nbHalftone]',
  template: `
    @if (shape() !== 'rectangle') {
    <svg [attr.width]="svgW()" [attr.height]="svgH()" aria-hidden="true">
      @for (dot of dots(); track $index) {
        <circle [attr.cx]="dot.cx" [attr.cy]="dot.cy" [attr.r]="dotR()" [attr.fill]="resolvedColor()" />
      }
    </svg>
    }
  `,
  styles: `
    :host {
      pointer-events: none;
    }

    :host(.nb-halftone--rectangle) {
      --nb-halftone-color: var(--nb-border);
      --nb-halftone-dot-size: 8px;
      --nb-halftone-gap-x: 28px;
      --nb-halftone-gap-y: 27px;

      display: block;
      overflow: hidden;
      width: calc(var(--nb-halftone-columns) * var(--nb-halftone-gap-x));
      height: calc(var(--nb-halftone-rows) * var(--nb-halftone-gap-y));
      background-image: radial-gradient(
        circle at center,
        var(--nb-halftone-color) 0 calc(var(--nb-halftone-dot-size) / 2),
        transparent calc((var(--nb-halftone-dot-size) / 2) + 1px)
      );
      background-size: var(--nb-halftone-gap-x) var(--nb-halftone-gap-y);
      background-repeat: repeat;
      background-position: 0 0;
    }

    :host(.nb-halftone--circle) {
      border-radius: 9999px;
      overflow: hidden;
    }
  `,
  host: {
    'class': 'nb-halftone',
    '[class.pointer-events-none]': 'true',
    '[class.nb-halftone--square]': 'shape() === "square"',
    '[class.nb-halftone--circle]': 'shape() === "circle"',
    '[class.nb-halftone--rectangle]': 'shape() === "rectangle"',
    '[attr.aria-hidden]': '"true"',
    '[attr.data-shape]': 'shape()',
    '[attr.data-nb-halftone]': '""',
    '[style.--nb-halftone-color]': 'color()',
    '[style.--nb-halftone-dot-size.px]': 'size()',
    '[style.--nb-halftone-gap-x.px]': 'resolvedGapXInput()',
    '[style.--nb-halftone-gap-y.px]': 'resolvedGapYInput()',
    '[style.--nb-halftone-rows]': 'resolvedRows()',
    '[style.--nb-halftone-columns]': 'resolvedColumns()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbHalftone {
  readonly shape = input<NbHalftoneShape>(DEFAULT_SHAPE);
  readonly color = input<string | null>(null);
  readonly size = input<number | null, unknown>(null, { transform: numberAttribute });
  readonly gap = input<number | null, unknown>(null, { transform: numberAttribute });
  readonly gapX = input<number | null, unknown>(null, { transform: numberAttribute });
  readonly gapY = input<number | null, unknown>(null, { transform: numberAttribute });
  readonly rows = input<number | null, unknown>(null, { transform: numberAttribute });
  readonly columns = input<number | null, unknown>(null, { transform: numberAttribute });

  protected readonly resolvedColor = computed(() => this.color() ?? 'var(--nb-border)');
  protected readonly resolvedSize = computed(() => this.size() ?? DEFAULT_DOT_SIZE);
  protected readonly resolvedGap = computed(() => this.gap() ?? DEFAULT_DOT_GAP);
  protected readonly resolvedGapXInput = computed(() => this.gapX() ?? this.gap());
  protected readonly resolvedGapYInput = computed(() => this.gapY() ?? this.gap());
  protected readonly resolvedRows = computed(
    () =>
      this.rows() ??
      (this.shape() === 'rectangle' ? RECTANGLE_DEFAULT_ROWS : DEFAULT_ROWS)
  );
  protected readonly resolvedColumns = computed(
    () =>
      this.columns() ??
      (this.shape() === 'rectangle' ? RECTANGLE_DEFAULT_COLUMNS : DEFAULT_COLUMNS)
  );

  protected readonly svgW = computed(
    () =>
      this.resolvedColumns() * (this.resolvedSize() + this.resolvedGap()) -
      this.resolvedGap()
  );
  protected readonly svgH = computed(
    () =>
      this.resolvedRows() * (this.resolvedSize() + this.resolvedGap()) -
      this.resolvedGap()
  );

  protected readonly dotR = computed(() => this.resolvedSize() / 2);

  protected readonly dots = computed(() => {
    const s = this.resolvedSize();
    const g = this.resolvedGap();
    const rows = this.resolvedRows();
    const cols = this.resolvedColumns();
    const total = s + g;
    const r = s / 2;
    const result: { cx: number; cy: number }[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        result.push({ cx: col * total + r, cy: row * total + r });
      }
    }

    return result;
  });
}
