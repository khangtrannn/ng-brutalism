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

@Component({
  selector: 'nb-marquee',
  exportAs: 'nbMarquee',
  host: {
    'data-nb-marquee': '',
  },
  template: `
    <div
      #wrapper
      data-slot="marquee-wrapper"
      [attr.data-pause-on-hover]="pauseOnHover() ? '' : null"
      [style.--nb-marquee-duration]="scaledDuration()"
    >
      <div
        #strip1
        data-slot="marquee-strip"
        data-strip="1"
        [attr.data-reverse]="reverse() ? '' : null"
      >
        <ng-content />
      </div>
      <div
        #strip2
        data-slot="marquee-strip"
        data-strip="2"
        [attr.data-reverse]="reverse() ? '' : null"
        aria-hidden="true"
      ></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbMarquee {
  readonly duration = input<string>('5s');
  readonly reverse = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly pauseOnHover = input<boolean, unknown>(true, {
    transform: booleanAttribute,
  });

  private readonly wrapper =
    viewChild.required<ElementRef<HTMLElement>>('wrapper');
  private readonly strip1 =
    viewChild.required<ElementRef<HTMLElement>>('strip1');
  private readonly strip2 =
    viewChild.required<ElementRef<HTMLElement>>('strip2');
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly widthScale = signal(1);

  protected readonly scaledDuration = computed(() => {
    const duration = this.duration();
    const durationMs = this.durationToMs(duration);

    if (durationMs === null) {
      return duration;
    }

    return `${durationMs * this.widthScale()}ms`;
  });

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
