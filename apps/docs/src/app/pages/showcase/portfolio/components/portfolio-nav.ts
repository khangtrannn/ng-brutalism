import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';
import { ContactUsDialog } from '../../../components/examples/contact-us-dialog';

import type { NavLink } from '../portfolio.types';

@Component({
    selector: 'docs-portfolio-nav',
    imports: [NbButton, ContactUsDialog],
    template: `
    <header class="sticky top-4 z-50 w-full px-4">
      <nav
        class="mx-auto mt-2 flex h-[60px] w-full max-w-full items-center justify-between border-[3px] border-black bg-yellow-300 px-3 shadow-[8px_8px_0px_0px_#000] transition-transform duration-300 sm:mt-4 sm:h-[70px] sm:px-6 md:h-[80px] {{ showNav() ? 'translate-y-0' : '-translate-y-[calc(100%+40px)]' }}"
        aria-label="Ronit portfolio"
      >
        <a
          href="/showcase/portfolio#home"
          class="block min-w-[80px] -rotate-2 transition-transform duration-300 hover:rotate-0 xs:min-w-[100px]"
          aria-label="Ronit Jadhav home"
        >
          <img
            class="h-[52px] w-[52px] object-contain sm:h-[64px] sm:w-[64px] md:h-[70px] md:w-[70px]"
            [src]="assetPath() + '/logo.png'"
            alt="MK Logo"
          />
        </a>

        <div class="hidden items-center space-x-6 text-base lg:text-lg md:flex">
          @for (link of navLinks(); track link.label) {
          <a
            class="transform px-3 py-1 font-bold text-black transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
            [href]="link.href"
            [attr.target]="link.external ? '_blank' : null"
            [attr.rel]="link.external ? 'noreferrer' : null"
          >
            {{ link.label }} @if (link.external) {
            <span aria-hidden="true">↗</span> }
          </a>
          }

          <div class="flex items-center gap-4">
            <contact-us-dialog #contact>
              <button
                nbButton
                (click)="contact.open()"
                style="--nb-button-bg: #76fbd9;"
                class="h-10 font-heading text-sm text-black transition-all hover:scale-[1.02] active:scale-[0.98] md:text-base"
              >
                Get in Touch!
              </button>
            </contact-us-dialog>
          </div>
        </div>

        <div class="flex items-center gap-4 md:hidden">
          <button
            class="border-2 border-black bg-[#76fbd9] p-2 shadow-[4px_4px_0px_0px_#000] transition-transform hover:-rotate-3"
            type="button"
            (click)="menuToggled.emit()"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Open navigation"
          >
            <span class="mb-1 block h-0.5 w-6 bg-black"></span>
            <span class="mb-1 block h-0.5 w-6 bg-black"></span>
            <span class="block h-0.5 w-6 bg-black"></span>
          </button>
        </div>
      </nav>

      @if (menuOpen()) {
      <div
        class="fixed left-0 top-[90px] z-50 w-full px-2 sm:top-[110px] sm:px-4 md:hidden"
      >
        <div
          class="w-full border-[3px] border-black bg-white p-4 shadow-[8px_8px_0px_0px_#000]"
        >
          <div class="flex flex-col space-y-3">
            @for (link of navLinks(); track link.label) {
            <a
              class="border-2 border-black bg-yellow-300 p-2 text-center text-lg font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-transform hover:rotate-2"
              [href]="link.href"
              [attr.target]="link.external ? '_blank' : null"
              [attr.rel]="link.external ? 'noreferrer' : null"
              (click)="menuClosed.emit()"
            >
              {{ link.label }} @if (link.external) {
              <span aria-hidden="true">↗</span> }
            </a>
            }
          </div>
          <div class="mt-4 p-2">
            <contact-us-dialog #mobileContact>
              <button
                nbButton
                (click)="mobileContact.open()"
                style="--nb-button-bg: #76fbd9;"
                class="h-12 w-full font-heading text-base text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get in Touch!
              </button>
            </contact-us-dialog>
          </div>
        </div>
      </div>
      }
    </header>
  `,
    host: { '(window:scroll)': 'updateScrollState()' },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioNav {
  readonly assetPath = input.required<string>();
  readonly menuOpen = input(false);
  readonly navLinks = input.required<NavLink[]>();

  readonly menuToggled = output<void>();
  readonly menuClosed = output<void>();

  protected readonly showNav = signal(true);
  private lastScrollY = 0;

  protected updateScrollState(): void {
    const currentScrollY = window.scrollY;
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      this.showNav.set(false);
    } else if (currentScrollY < this.lastScrollY || currentScrollY <= 100) {
      this.showNav.set(true);
    }
    this.lastScrollY = currentScrollY;
  }
}
