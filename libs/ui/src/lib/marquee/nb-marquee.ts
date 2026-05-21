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
  signal,
  viewChild,
} from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-marquee',
  host: {
    class: 'block',
  },
  template: `
    <div #wrapper [class]="wrapperClass()" [style]="wrapperStyle()">
      <div #strip1 [class]="strip1Class()">
        <ng-content />
      </div>
      <div #strip2 [class]="strip2Class()" aria-hidden="true"></div>
    </div>
  `,
  styles: [
    `
      @keyframes nb-marquee-1 {
        from {
          transform: translateX(0%);
        }
        to {
          transform: translateX(-100%);
        }
      }
      @keyframes nb-marquee-2 {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0%);
        }
      }
      @keyframes nb-marquee-reverse-1 {
        from {
          transform: translateX(0%);
        }
        to {
          transform: translateX(100%);
        }
      }
      @keyframes nb-marquee-reverse-2 {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(0%);
        }
      }

      .nb-marquee-strip-1 {
        animation-name: nb-marquee-1;
        animation-duration: var(--nb-marquee-duration, 5s);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .nb-marquee-strip-1.nb-marquee-reverse {
        animation-name: nb-marquee-reverse-1;
      }

      .nb-marquee-strip-2 {
        animation-name: nb-marquee-2;
        animation-duration: var(--nb-marquee-duration, 5s);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .nb-marquee-strip-2.nb-marquee-reverse {
        animation-name: nb-marquee-reverse-2;
      }

      .nb-marquee-strip-1,
      .nb-marquee-strip-2 {
        display: flex;
        width: max-content;
        min-width: 100%;
        align-items: center;
        flex-shrink: 0;
      }

      .nb-marquee-wrapper.nb-pause-on-hover:hover .nb-marquee-strip-1,
      .nb-marquee-wrapper.nb-pause-on-hover:hover .nb-marquee-strip-2 {
        animation-play-state: paused;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbMarquee {
  readonly duration = input('5s');
  readonly reverse = input(false, { transform: booleanAttribute });
  readonly pauseOnHover = input(true, { transform: booleanAttribute });

  private readonly wrapper =
    viewChild.required<ElementRef<HTMLElement>>('wrapper');
  private readonly strip1 =
    viewChild.required<ElementRef<HTMLElement>>('strip1');
  private readonly strip2 =
    viewChild.required<ElementRef<HTMLElement>>('strip2');
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly widthScale = signal(1);

  protected readonly wrapperClass = computed(() =>
    nbClass(
      'nb-marquee-wrapper relative flex w-full overflow-hidden',
      'border-t-2 border-b-2 border-(--nb-border)',
      'bg-white text-black font-base',
      this.pauseOnHover() && 'nb-pause-on-hover'
    )
  );

  protected readonly wrapperStyle = computed(() => ({
    '--nb-marquee-duration': this.scaledDuration(),
  }));

  private readonly scaledDuration = computed(() => {
    const duration = this.duration();
    const durationMs = this.durationToMs(duration);

    if (durationMs === null) {
      return duration;
    }

    return `${durationMs * this.widthScale()}ms`;
  });

  protected readonly strip1Class = computed(() =>
    nbClass(
      'nb-marquee-strip-1 whitespace-nowrap py-4',
      this.reverse() && 'nb-marquee-reverse'
    )
  );

  protected readonly strip2Class = computed(() =>
    nbClass(
      'nb-marquee-strip-2 absolute top-0 left-0 whitespace-nowrap py-4',
      this.reverse() && 'nb-marquee-reverse'
    )
  );

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    afterNextRender(() => {
      this.syncSecondStrip();
      this.updateAnimationScale();

      const mutationObserver = new MutationObserver(() => {
        this.syncSecondStrip();
        this.updateAnimationScale();
      });
      mutationObserver.observe(this.strip1().nativeElement, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });

      const resizeObserver = new ResizeObserver(() =>
        this.updateAnimationScale()
      );
      resizeObserver.observe(this.wrapper().nativeElement);
      resizeObserver.observe(this.strip1().nativeElement);

      this.destroyRef.onDestroy(() => {
        mutationObserver.disconnect();
        resizeObserver.disconnect();
      });
    });
  }

  private syncSecondStrip(): void {
    const source = this.strip1().nativeElement;
    const cloneTarget = this.strip2().nativeElement;
    const clones = Array.from(source.childNodes, (node) =>
      node.cloneNode(true)
    );

    cloneTarget.replaceChildren(...clones);
  }

  private updateAnimationScale(): void {
    const wrapperWidth = this.wrapper().nativeElement.clientWidth;
    const contentWidth = this.strip1().nativeElement.scrollWidth;

    if (wrapperWidth <= 0 || contentWidth <= 0) {
      this.widthScale.set(1);
      return;
    }

    this.widthScale.set(Math.max(1, contentWidth / wrapperWidth));
  }

  private durationToMs(duration: string): number | null {
    const match = duration.trim().match(/^(\d*\.?\d+)(ms|s)$/);

    if (!match) {
      return null;
    }

    const value = Number(match[1]);
    return match[2] === 's' ? value * 1000 : value;
  }
}
