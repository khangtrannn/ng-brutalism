import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type NbHalftonePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

@Component({
  selector: 'nb-halftone',
  template: `
    <svg [attr.width]="svgW()" [attr.height]="svgH()" aria-hidden="true">
      @for (dot of dots(); track $index) {
        <circle [attr.cx]="dot.cx" [attr.cy]="dot.cy" [attr.r]="dotR()" [attr.fill]="color()" />
      }
    </svg>
  `,
  host: {
    '[class]': 'classes()',
    '[attr.aria-hidden]': '"true"',
    '[attr.data-position]': 'position()',
    '[attr.data-nb-halftone]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbHalftone {
  readonly position = input<NbHalftonePosition>('bottom-right');
  readonly color = input<string>('var(--nb-border)');
  readonly size = input<number>(6);
  readonly gap = input<number>(5);
  readonly rows = input<number>(7);
  readonly cols = input<number>(7);

  protected readonly classes = computed(() => {
    const posClass: Record<NbHalftonePosition, string> = {
      'top-left': 'top-0 left-0',
      'top-right': 'top-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'bottom-right': 'bottom-0 right-0',
    };
    return `absolute pointer-events-none ${posClass[this.position()]}`;
  });

  protected readonly svgW = computed(() => this.cols() * (this.size() + this.gap()) - this.gap());
  protected readonly svgH = computed(() => this.rows() * (this.size() + this.gap()) - this.gap());

  protected readonly dotR = computed(() => this.size() / 2);

  protected readonly dots = computed(() => {
    const s = this.size();
    const g = this.gap();
    const rows = this.rows();
    const cols = this.cols();
    const pos = this.position();
    const total = s + g;
    const r = s / 2;

    const isBottom = pos.startsWith('bottom');
    const isRight = pos.endsWith('right');

    // Manhattan distance from corner determines the triangle cutoff.
    // threshold = min(rows, cols) - 1 creates a clean 45° diagonal edge.
    const threshold = Math.min(rows, cols) - 1;
    const result: { cx: number; cy: number }[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const rowDist = isBottom ? rows - 1 - row : row;
        const colDist = isRight ? cols - 1 - col : col;

        if (rowDist + colDist <= threshold) {
          result.push({ cx: col * total + r, cy: row * total + r });
        }
      }
    }

    return result;
  });
}
