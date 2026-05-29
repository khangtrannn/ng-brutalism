import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';

import { NB_STICKER_PATHS } from './sticker.paths';
import type { NbStickerShape, NbStickerTone } from './sticker.types';

const NB_STICKER_DEFAULT_CONTENT_SCALE = 1;

interface NbStickerContentMetrics {
  availableInlineSize: number;
  availableBlockSize: number;
  contentInlineSize: number;
  contentBlockSize: number;
}

interface NbStickerToneTokens {
  fill: string;
  ink: string;
  shadow: string;
}

const NB_STICKER_TONE_TOKENS: Record<NbStickerTone, NbStickerToneTokens> = {
  default: {
    fill: 'var(--nb-surface, var(--nb-background, #fff))',
    ink: 'var(--nb-foreground, #050505)',
    shadow: 'var(--nb-shadow, #050505)',
  },
  yellow: {
    fill: 'var(--nb-yellow, #ffd24a)',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  pink: {
    fill: 'var(--nb-pink, #ff6fc7)',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  mint: {
    fill: 'var(--nb-mint, #9af7b5)',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  lavender: {
    fill: 'var(--nb-lavender, #b8a4ff)',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  purple: {
    fill: 'var(--nb-purple, var(--nb-lavender, #b994ff))',
    ink: '#050505',
    shadow: 'var(--nb-shadow, #050505)',
  },
  accent: {
    fill: 'var(--nb-accent)',
    ink: 'var(--nb-accent-foreground)',
    shadow: 'var(--nb-shadow, #050505)',
  },
  success: {
    fill: 'var(--nb-success)',
    ink: 'var(--nb-success-foreground)',
    shadow: 'var(--nb-shadow, #050505)',
  },
  warning: {
    fill: 'var(--nb-warning)',
    ink: 'var(--nb-warning-foreground)',
    shadow: 'var(--nb-shadow, #050505)',
  },
  danger: {
    fill: 'var(--nb-danger)',
    ink: 'var(--nb-danger-foreground)',
    shadow: 'var(--nb-shadow, #050505)',
  },
};

@Component({
  selector: 'nb-sticker',
  template: `
    <span
      #root
      class="nb-sticker__root"
      [style.--nb-sticker-content-scale]="contentScale()"
    >
      <svg
        class="nb-sticker__svg"
        [attr.viewBox]="config().viewBox"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          class="nb-sticker__shadow"
          [attr.d]="config().path"
          [attr.transform]="config().shadowTransform"
        />

        <path class="nb-sticker__shape" [attr.d]="config().path" />
      </svg>

      <span class="nb-sticker__content-scale">
        <span #content class="nb-sticker__content">
          <ng-content />
        </span>
      </span>
    </span>
  `,
  host: {
    class: 'nb-sticker',
    '[attr.data-shape]': 'shape()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-nb-sticker]': '""',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
    '[attr.role]': 'decorative() ? null : "img"',
    '[style.--nb-sticker-fill]': 'toneTokens().fill',
    '[style.--nb-sticker-ink]': 'toneTokens().ink',
    '[style.--nb-sticker-shadow]': 'toneTokens().shadow',
    '[style.--nb-sticker-rotate]': 'rotateStyle()',
  },
  styles: [
    `
      :host {
        --nb-sticker-min-inline-size: 8.75rem;
        --nb-sticker-min-block-size: 8.75rem;
        --nb-sticker-max-inline-size: 22rem;
        --nb-sticker-max-block-size: 12rem;
        --nb-sticker-padding-inline: 2.75rem;
        --nb-sticker-padding-block: 2rem;
        --nb-sticker-fill: var(--nb-mint, #9af7b5);
        --nb-sticker-ink: var(--nb-black, #050505);
        --nb-sticker-shadow: var(--nb-shadow, var(--nb-black, #050505));
        --nb-sticker-stroke-width: 5px;
        --nb-sticker-rotate: -6deg;
        --nb-sticker-font-size: 1.75rem;
        --nb-sticker-safe-zone: 0.5 0.42;
        --nb-sticker-content-scale: 1;

        display: inline-block;
        vertical-align: middle;
      }

      :host([data-shape='burst-wide']) {
        --nb-sticker-min-inline-size: 12rem;
        --nb-sticker-max-inline-size: 24rem;
        --nb-sticker-padding-inline: 3.25rem;
        --nb-sticker-font-size: 1.55rem;
        --nb-sticker-safe-zone: 0.64 0.42;
      }

      :host([data-shape='star']) {
        --nb-sticker-min-inline-size: 13.25rem;
        --nb-sticker-min-block-size: 13.25rem;
        --nb-sticker-max-block-size: 14rem;
        --nb-sticker-padding-inline: 4.55rem;
        --nb-sticker-padding-block: 4.45rem;
        --nb-sticker-rotate: 0deg;
        --nb-sticker-stroke-width: 5px;
        --nb-sticker-safe-zone: 0.5 0.36;
      }

      :host([data-shape='splat']) {
        --nb-sticker-size: 6rem;
        --nb-sticker-shadow-x: 6px;
        --nb-sticker-shadow-y: 6px;
        --nb-sticker-min-inline-size: var(--nb-sticker-size);
        --nb-sticker-min-block-size: var(--nb-sticker-size);
        --nb-sticker-max-inline-size: var(--nb-sticker-size);
        --nb-sticker-max-block-size: var(--nb-sticker-size);
        --nb-sticker-padding-inline: 0;
        --nb-sticker-padding-block: 0;
        --nb-sticker-stroke-width: 4px;
        --nb-sticker-rotate: -10deg;
        --nb-sticker-safe-zone: 0.5 0.5;
      }

      .nb-sticker__root {
        position: relative;
        isolation: isolate;

        display: inline-grid;
        place-items: center;

        box-sizing: border-box;
        min-inline-size: var(--nb-sticker-min-inline-size);
        min-block-size: var(--nb-sticker-min-block-size);
        max-inline-size: var(--nb-sticker-max-inline-size);
        max-block-size: var(--nb-sticker-max-block-size);

        inline-size: max-content;
        block-size: max-content;

        padding-block: var(--nb-sticker-padding-block);
        padding-inline: var(--nb-sticker-padding-inline);

        transform: rotate(var(--nb-sticker-rotate));
        transform-origin: center;
      }

      .nb-sticker__svg {
        position: absolute;
        inset: 0;
        z-index: -1;

        inline-size: 100%;
        block-size: 100%;

        overflow: visible;
      }

      .nb-sticker__shadow {
        fill: var(--nb-sticker-shadow);
      }

      :host([data-shape='splat']) .nb-sticker__shadow {
        transform: translate(
          var(--nb-sticker-shadow-x),
          var(--nb-sticker-shadow-y)
        );
      }

      .nb-sticker__shape {
        fill: var(--nb-sticker-fill);
        stroke: var(--nb-sticker-ink);
        stroke-width: var(--nb-sticker-stroke-width);
        stroke-linejoin: round;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
      }

      .nb-sticker__content-scale {
        display: block;
        scale: var(--nb-sticker-content-scale);

        pointer-events: none;
        user-select: none;
      }

      .nb-sticker__content {
        color: var(--nb-sticker-ink);

        display: block;
        font-family: var(--nb-font-display, system-ui, sans-serif);
        font-size: var(--nb-sticker-font-size);
        font-weight: 950;
        line-height: 0.9;
        letter-spacing: 0;
        text-align: center;
        text-transform: uppercase;

        white-space: nowrap;
      }

      :host([data-shape='splat']) .nb-sticker__content-scale {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSticker {
  readonly shape = input<NbStickerShape>('burst');
  readonly tone = input<NbStickerTone>('mint');
  readonly decorative = input(false, { transform: booleanAttribute });
  readonly rotate = input(undefined, { transform: toOptionalNumber });

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly content =
    viewChild.required<ElementRef<HTMLElement>>('content');
  private readonly contentMetrics = signal<NbStickerContentMetrics | null>(
    null
  );
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private metricsFrame: number | null = null;

  protected readonly config = computed(() => NB_STICKER_PATHS[this.shape()]);
  protected readonly contentScale = computed(() =>
    getContentScale(this.contentMetrics())
  );
  protected readonly toneTokens = computed(
    () => NB_STICKER_TONE_TOKENS[this.tone()]
  );
  protected readonly rotateStyle = computed(() => {
    const rotate = this.rotate();

    return rotate === undefined ? null : `${rotate}deg`;
  });

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    afterNextRender(() => {
      this.updateContentMetrics();

      if (typeof ResizeObserver === 'undefined') {
        return;
      }

      const resizeObserver = new ResizeObserver(() =>
        this.queueContentMetricsUpdate()
      );
      resizeObserver.observe(this.root().nativeElement);
      resizeObserver.observe(this.content().nativeElement);

      this.destroyRef.onDestroy(() => {
        resizeObserver.disconnect();
        this.cancelQueuedContentMetricsUpdate();
      });
    });
  }

  private queueContentMetricsUpdate(): void {
    if (this.metricsFrame !== null) {
      return;
    }

    if (typeof requestAnimationFrame === 'undefined') {
      this.updateContentMetrics();
      return;
    }

    this.metricsFrame = requestAnimationFrame(() => {
      this.metricsFrame = null;
      this.updateContentMetrics();
    });
  }

  private cancelQueuedContentMetricsUpdate(): void {
    if (
      this.metricsFrame === null ||
      typeof cancelAnimationFrame === 'undefined'
    ) {
      return;
    }

    cancelAnimationFrame(this.metricsFrame);
    this.metricsFrame = null;
  }

  private updateContentMetrics(): void {
    const root = this.root().nativeElement;
    const content = this.content().nativeElement;
    const metrics = readContentMetrics(root, content);

    this.contentMetrics.update((current) =>
      areContentMetricsEqual(current, metrics) ? current : metrics
    );
  }
}

function readContentMetrics(
  root: HTMLElement,
  content: HTMLElement
): NbStickerContentMetrics {
  const styles = getComputedStyle(root);
  const rootInlineSize = root.clientWidth;
  const rootBlockSize = root.clientHeight;
  const paddedInlineSize =
    rootInlineSize -
    toCssPixels(styles.paddingInlineStart) -
    toCssPixels(styles.paddingInlineEnd);
  const paddedBlockSize =
    rootBlockSize -
    toCssPixels(styles.paddingBlockStart) -
    toCssPixels(styles.paddingBlockEnd);
  const [safeInlineRatio, safeBlockRatio] = parseSafeZone(
    styles.getPropertyValue('--nb-sticker-safe-zone')
  );

  return {
    availableInlineSize: getAvailableSize(
      paddedInlineSize,
      rootInlineSize,
      safeInlineRatio
    ),
    availableBlockSize: getAvailableSize(
      paddedBlockSize,
      rootBlockSize,
      safeBlockRatio
    ),
    contentInlineSize: content.scrollWidth,
    contentBlockSize: content.scrollHeight,
  };
}

function getContentScale(metrics: NbStickerContentMetrics | null): number {
  if (metrics === null) {
    return NB_STICKER_DEFAULT_CONTENT_SCALE;
  }

  if (
    hasInvalidSize(
      metrics.availableInlineSize,
      metrics.availableBlockSize,
      metrics.contentInlineSize,
      metrics.contentBlockSize
    )
  ) {
    return NB_STICKER_DEFAULT_CONTENT_SCALE;
  }

  return Math.min(
    NB_STICKER_DEFAULT_CONTENT_SCALE,
    metrics.availableInlineSize / metrics.contentInlineSize,
    metrics.availableBlockSize / metrics.contentBlockSize
  );
}

function getAvailableSize(
  paddedSize: number,
  rootSize: number,
  safeZoneRatio: number
): number {
  return Math.min(paddedSize, rootSize * safeZoneRatio);
}

function hasInvalidSize(...sizes: number[]): boolean {
  return sizes.some((size) => !Number.isFinite(size) || size <= 0);
}

function areContentMetricsEqual(
  first: NbStickerContentMetrics | null,
  second: NbStickerContentMetrics
): boolean {
  return (
    first !== null &&
    first.availableInlineSize === second.availableInlineSize &&
    first.availableBlockSize === second.availableBlockSize &&
    first.contentInlineSize === second.contentInlineSize &&
    first.contentBlockSize === second.contentBlockSize
  );
}

function parseSafeZone(value: string): [number, number] {
  const [inlineRatio, blockRatio] = value.trim().split(/\s+/);

  return [toCssNumber(inlineRatio) || 0.5, toCssNumber(blockRatio) || 0.42];
}

function toCssNumber(value: string | undefined): number {
  return Number.parseFloat(value ?? '') || 0;
}

function toCssPixels(value: string): number {
  return Number.parseFloat(value) || 0;
}

function toOptionalNumber(value: unknown): number | undefined {
  const result = numberAttribute(value);

  return Number.isFinite(result) ? result : undefined;
}
