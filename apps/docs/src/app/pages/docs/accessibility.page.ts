import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-accessibility-page',
  imports: [NbCallout, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Concepts</p>
          <h1>Accessibility</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Interactive primitives follow their
            <a
              href="https://www.w3.org/WAI/ARIA/apg/patterns/"
              target="_blank"
              rel="noreferrer"
              class="underline"
              >WAI-ARIA Authoring Practices Guide (APG)</a
            >
            pattern, are scanned with <code class="font-mono">vitest-axe</code>,
            and have a keyboard-completion spec covering the pattern's full
            interaction model — not just a smoke test.
          </p>
        </div>
      </header>

      <section id="apg-patterns">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          APG patterns by component
        </h2>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-160 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Component</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">APG pattern</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Keyboard coverage</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  <a routerLink="/components/select" class="underline">Select</a>
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">Listbox</td>
                <td class="px-4 py-3">Home/End, typeahead, Tab-closes, Escape-on-trigger, disabled-but-reachable</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  <a routerLink="/components/accordion" class="underline">Accordion</a>
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">Accordion</td>
                <td class="px-4 py-3">Up/Down/Home/End between headers, skips disabled items</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  <a routerLink="/components/dialog" class="underline">Dialog</a>
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">Dialog (modal)</td>
                <td class="px-4 py-3">Focus trap via native <code class="font-mono">&lt;dialog&gt;</code>, Escape/backdrop close</td>
              </tr>
              <tr class="last:border-b-0">
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  <a routerLink="/components/icon" class="underline">Icon</a>
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">Image / decorative graphic</td>
                <td class="px-4 py-3">No explicit default — <code class="font-mono">decorative</code> or <code class="font-mono">label</code> is required</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-sm opacity-70">
          Every other component page states its pattern (or "static content"
          for non-interactive primitives) and status in its own
          Accessibility section.
        </p>
      </section>

      <section id="testing-policy">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Testing policy
        </h2>
        <p class="mb-4 font-medium">
          <code class="font-mono">vitest-axe</code> runs against real rendered
          fixtures for dialog, select, accordion, and
          <a routerLink="/components/field" class="underline">field</a> — both
          closed/valid and open/invalid states, since an invalid,
          error-linked control is a distinct accessibility surface from a
          clean one. The dialog fixture sets the native
          <code class="font-mono">open</code> attribute directly, since jsdom
          doesn't implement <code class="font-mono">showModal()</code>.
        </p>
        <div nbCallout tone="mint" size="sm">
          <p class="normal-case">
            The select popup's escape from an <code class="font-mono">overflow:hidden</code>
            ancestor and the <code class="font-mono">formControlName</code>
            round-trip are the two things the unit-test suite can't prove on
            its own — both were confirmed in a real Chromium session
            (Playwright) with zero console errors.
          </p>
        </div>
      </section>

      <section id="keyboard-support">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          What "disabled" means
        </h2>
        <p class="font-medium">
          <code class="font-mono">nb-select</code> options use
          <code class="font-mono">aria-disabled</code> and stay
          keyboard-reachable-but-not-activatable, per APG — arrow/Home/End/
          typeahead can land on them, but they can't be selected.
          <code class="font-mono">nb-accordion</code> headers use real
          <code class="font-mono">disabled</code> buttons instead and are
          skipped entirely by header navigation, since a genuinely disabled
          <code class="font-mono">&lt;button&gt;</code> can't receive focus at
          all — the two components intentionally follow different disabled
          semantics because their underlying elements do.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccessibilityPage {}
