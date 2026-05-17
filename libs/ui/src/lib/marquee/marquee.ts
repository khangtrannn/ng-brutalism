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
  viewChild,
} from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-marquee',
  standalone: true,
  template: `
    <div [class]="wrapperClass()" [style]="wrapperStyle()">
      <div #strip1 [class]="strip1Class()">
        <ng-content />
      </div>
      <div #strip2 [class]="strip2Class()" aria-hidden="true"></div>
    </div>
  `,
  styles: [
    `
      @keyframes nb-marquee-1 {
        from { transform: translateX(0%); }
        to   { transform: translateX(-100%); }
      }
      @keyframes nb-marquee-2 {
        from { transform: translateX(100%); }
        to   { transform: translateX(0%); }
      }
      @keyframes nb-marquee-reverse-1 {
        from { transform: translateX(0%); }
        to   { transform: translateX(100%); }
      }
      @keyframes nb-marquee-reverse-2 {
        from { transform: translateX(-100%); }
        to   { transform: translateX(0%); }
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

      .nb-marquee-wrapper.nb-pause-on-hover:hover .nb-marquee-strip-1,
      .nb-marquee-wrapper.nb-pause-on-hover:hover .nb-marquee-strip-2 {
        animation-play-state: paused;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbMarqueeComponent {
  readonly duration = input('5s');
  readonly reverse = input(false, { transform: booleanAttribute });
  readonly pauseOnHover = input(true, { transform: booleanAttribute });

  private readonly strip1 =
    viewChild.required<ElementRef<HTMLElement>>('strip1');
  private readonly strip2 =
    viewChild.required<ElementRef<HTMLElement>>('strip2');
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly wrapperClass = computed(() =>
    nbClass(
      'nb-marquee-wrapper relative flex w-full overflow-x-hidden',
      'border-t-2 border-b-2 border-(--nb-border)',
      'bg-(--nb-secondary-background) text-(--nb-foreground) font-base',
      this.pauseOnHover() && 'nb-pause-on-hover'
    )
  );

  protected readonly wrapperStyle = computed(() => ({
    '--nb-marquee-duration': this.duration(),
  }));

  protected readonly strip1Class = computed(() =>
    nbClass(
      'nb-marquee-strip-1 whitespace-nowrap py-12',
      this.reverse() && 'nb-marquee-reverse'
    )
  );

  protected readonly strip2Class = computed(() =>
    nbClass(
      'nb-marquee-strip-2 absolute top-0 left-0 whitespace-nowrap py-12',
      this.reverse() && 'nb-marquee-reverse'
    )
  );

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    afterNextRender(() => {
      this.syncSecondStrip();

      const observer = new MutationObserver(() => this.syncSecondStrip());
      observer.observe(this.strip1().nativeElement, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });

      this.destroyRef.onDestroy(() => observer.disconnect());
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
}
