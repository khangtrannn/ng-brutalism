import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbStickerShape = 'burst' | 'stamp' | 'pill';
export type NbStickerTone = 'default' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'accent' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'nb-sticker',
  template: `
    @if (shape() === 'burst') {
      <svg
        class="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <polygon
          [attr.fill]="'var(--nb-sticker-bg)'"
          [attr.stroke]="'var(--nb-border)'"
          stroke-width="3"
          points="50,2 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
        />
      </svg>
    }
    <span [class]="contentClass()">
      <ng-content />
    </span>
  `,
  host: {
    '[class]': 'classes()',
    '[style]': 'hostStyle()',
    '[attr.data-shape]': 'shape()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-nb-sticker]': '""',
    '[attr.aria-hidden]': '"true"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSticker {
  readonly shape = input<NbStickerShape>('stamp');
  readonly tone = input<NbStickerTone>('yellow');
  readonly rotate = input<number>(0);

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center justify-center',
      'text-xs font-black leading-tight text-center uppercase tracking-wide',
      'border-2 border-(--nb-border)',
      'bg-(--nb-sticker-bg) text-(--nb-sticker-fg)',
      'shadow-[3px_3px_0_0_var(--nb-shadow)]',
      this.shapeClass()
    )
  );

  protected readonly hostStyle = computed(() => {
    const toneVars = this.toneVars();
    const rotate = this.rotate();
    return `${toneVars}; transform: rotate(${rotate}deg)`;
  });

  protected readonly contentClass = computed(() =>
    this.shape() === 'burst'
      ? 'relative z-10 flex items-center justify-center text-center'
      : 'contents'
  );

  private shapeClass(): string {
    const map: Record<NbStickerShape, string> = {
      burst: 'relative w-16 h-16 border-0 shadow-none bg-transparent',
      stamp: 'w-16 h-16 rounded-none',
      pill: 'px-3 py-1 rounded-full',
    };
    return map[this.shape()];
  }

  private toneVars(): string {
    const map: Record<NbStickerTone, string> = {
      default: '--nb-sticker-bg: var(--nb-surface); --nb-sticker-fg: var(--nb-foreground)',
      yellow: '--nb-sticker-bg: #ffd24a; --nb-sticker-fg: #000',
      pink: '--nb-sticker-bg: #ff7eb6; --nb-sticker-fg: #000',
      mint: '--nb-sticker-bg: #99e8c8; --nb-sticker-fg: #000',
      lavender: '--nb-sticker-bg: #b8a4ff; --nb-sticker-fg: #000',
      accent: '--nb-sticker-bg: var(--nb-accent); --nb-sticker-fg: var(--nb-accent-foreground)',
      success: '--nb-sticker-bg: var(--nb-success); --nb-sticker-fg: var(--nb-success-foreground)',
      warning: '--nb-sticker-bg: var(--nb-warning); --nb-sticker-fg: var(--nb-warning-foreground)',
      danger: '--nb-sticker-bg: var(--nb-danger); --nb-sticker-fg: var(--nb-danger-foreground)',
    };
    return map[this.tone()];
  }
}
