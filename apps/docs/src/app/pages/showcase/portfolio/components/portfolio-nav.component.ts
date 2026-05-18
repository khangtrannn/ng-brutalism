import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import type { NavLink } from '../portfolio.types';
import { PortfolioContactDialogComponent } from './portfolio-contact-dialog.component';

@Component({
  selector: 'docs-portfolio-nav',
  standalone: true,
  imports: [RouterLink, PortfolioContactDialogComponent],
  template: `
    <header class="sticky top-4 z-50 w-full px-4">
      <nav
        class="mx-auto mt-2 flex h-[60px] w-full max-w-full items-center justify-between border-[3px] border-black bg-yellow-300 px-3 shadow-[8px_8px_0px_0px_#000] transition-transform duration-300 dark:border-black dark:bg-[#212121] dark:shadow-[8px_8px_0px_0px_#555] sm:mt-4 sm:h-[70px] sm:px-6 md:h-[80px]"
        aria-label="Ronit portfolio"
      >
        <a
          routerLink="/showcase/portfolio"
          fragment="home"
          class="block min-w-[80px] -rotate-2 transition-transform duration-300 hover:rotate-0 xs:min-w-[100px]"
          aria-label="Ronit Jadhav home"
        >
          <img
            class="h-[52px] w-[52px] object-contain sm:h-[64px] sm:w-[64px] md:h-[70px] md:w-[70px]"
            [src]="assetPath() + '/ronitLogo.png'"
            alt="Ronit Logo"
          />
        </a>

        <div class="hidden items-center space-x-6 text-base lg:text-lg md:flex">
          @for (link of navLinks(); track link.label) {
          <a
            class="transform px-3 py-1 font-bold text-black transition-all duration-200 hover:-translate-y-1 hover:rotate-2 dark:text-white"
            [href]="link.href"
            [target]="link.external ? '_blank' : null"
            [rel]="link.external ? 'noreferrer' : null"
          >
            {{ link.label }} @if (link.external) {
            <span aria-hidden="true">↗</span> }
          </a>
          }

          <div class="flex items-center gap-4">
            <docs-portfolio-contact-dialog
              [sent]="sent()"
              (submitted)="contactSubmitted.emit()"
            />
            <button
              class="grid h-10 w-10 place-items-center border-2 border-black bg-[#76fbd9] font-black text-black shadow-[4px_4px_0px_0px_#000] transition-transform hover:-rotate-3 dark:shadow-[4px_4px_0px_0px_#555]"
              type="button"
              (click)="themeToggled.emit()"
              [attr.aria-pressed]="isDark()"
              aria-label="Toggle theme"
            >
              {{ isDark() ? '☀' : '☾' }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-4 md:hidden">
          <button
            class="grid h-10 w-10 place-items-center border-2 border-black bg-[#76fbd9] font-black text-black shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#555]"
            type="button"
            (click)="themeToggled.emit()"
            [attr.aria-pressed]="isDark()"
            aria-label="Toggle theme"
          >
            {{ isDark() ? '☀' : '☾' }}
          </button>
          <button
            class="border-2 border-black bg-[#76fbd9] p-2 shadow-[4px_4px_0px_0px_#000] transition-transform hover:-rotate-3 dark:shadow-[4px_4px_0px_0px_#555]"
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
          class="w-full border-[3px] border-black bg-white p-4 shadow-[8px_8px_0px_0px_#000] dark:bg-[#212121] dark:shadow-[8px_8px_0px_0px_#555]"
        >
          <div class="flex flex-col space-y-3">
            @for (link of navLinks(); track link.label) {
            <a
              class="border-2 border-black bg-yellow-300 p-2 text-center text-lg font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-transform hover:rotate-2 dark:bg-[#212121] dark:text-white dark:shadow-[4px_4px_0px_0px_#555]"
              [href]="link.href"
              [target]="link.external ? '_blank' : null"
              [rel]="link.external ? 'noreferrer' : null"
              (click)="menuClosed.emit()"
            >
              {{ link.label }} @if (link.external) {
              <span aria-hidden="true">↗</span> }
            </a>
            }
          </div>
          <div class="mt-4 p-2">
            <docs-portfolio-contact-dialog
              [sent]="sent()"
              (submitted)="contactSubmitted.emit()"
            />
          </div>
        </div>
      </div>
      }
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioNavComponent {
  readonly assetPath = input.required<string>();
  readonly isDark = input(false);
  readonly menuOpen = input(false);
  readonly navLinks = input.required<NavLink[]>();
  readonly sent = input(false);

  readonly themeToggled = output<void>();
  readonly menuToggled = output<void>();
  readonly menuClosed = output<void>();
  readonly contactSubmitted = output<void>();
}
