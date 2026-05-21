import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';
import { ContactUsDialog } from './examples/contact-us-dialog';

@Component({
    selector: 'docs-dialog-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsTokens,
        ContactUsDialog,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Dialog</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A modal dialog built on the native
            <code class="font-mono">&lt;dialog&gt;</code> element. Compound API
            with SSR-safe open/close. Click the backdrop to dismiss.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">6</span>
            <span class="nb-stat-tile__label">Parts</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">SSR</span>
            <span class="nb-stat-tile__label">Safe</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">A11Y</span>
            <span class="nb-stat-tile__label">Native</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/dialog"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <p class="mb-4 text-sm font-medium">
          The snippet below mirrors the example markup used by the docs.
        </p>
        <docs-example [code]="contactUsExampleCode">
          <contact-us-dialog />
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="contactUsExampleCode" />
      </section>

      <docs-tokens component="dialog" />

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Part
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-dialog
                </td>
                <td class="px-4 py-3">
                  Root component. Renders the native
                  <code class="font-mono">&lt;dialog&gt;</code> modal. Exposes
                  <code class="font-mono">open()</code> and
                  <code class="font-mono">close()</code> for
                  <code class="font-mono">viewChild</code> access.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  [nbDialogTitle]
                </td>
                <td class="px-4 py-3">
                  Directive applied to a heading element. Styles the dialog
                  title.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  [nbDialogDescription]
                </td>
                <td class="px-4 py-3">
                  Directive for muted supporting text below the title.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-dialog-content
                </td>
                <td class="px-4 py-3">
                  Scrollable body section with top and bottom borders.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-dialog-actions
                </td>
                <td class="px-4 py-3">
                  Footer section with right-aligned action buttons.
                </td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  [nbDialogClose]
                </td>
                <td class="px-4 py-3">
                  Directive that closes the dialog on click.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DialogPage {
  protected readonly importCode = `import {
  NbButton,
  NbDialog,
  NbDialogTitle,
  NbDialogDescription,
  NbDialogContent,
  NbDialogActions,
  NbDialogClose,
  NbTitle,
  NbInput,
  NbInputGroup,
  NbInputPrefix,
  NbLabel,
  NbSelect,
  NbSelectOption,
  NbTextarea,
} from '@ng-brutalism/ui';`;

  protected readonly contactUsExampleCode = `<button nbButton style="--nb-button-bg: #fff" (click)="dialog.open()">Contact Us</button>
<nb-dialog #dialog>
  <div class="relative bg-(--nb-field-bg) px-6 pt-7 pb-5 sm:px-10 sm:pt-9 sm:pb-6">
    <button
      nbButton
      nbDialogClose
      size="icon"
      variant="neutral"
      aria-label="Close dialog"
      class="absolute right-6 top-6 text-xl leading-none sm:right-10 sm:top-9"
    >
      &times;
    </button>

    <div class="pointer-events-none absolute right-28 top-6 hidden items-center gap-3 sm:flex">
      <span class="font-mono text-3xl font-black leading-none">*</span>
      <docs-contact-zigzag-icon class="w-12 text-[#ff2f68]" />
      <img src="/showcase/contact-dialog/message.png" alt="" aria-hidden="true" class="h-16 w-auto" />
    </div>

    <span class="inline-block border-2 border-(--nb-border) bg-[#c4a8ff] px-4 py-1.5 font-mono text-sm font-black uppercase tracking-wider text-black shadow-[3px_3px_0_0_var(--nb-shadow)]">
      Let's Talk
    </span>

    <h2 nbDialogTitle nbTitle class="mt-4 p-0 font-mono text-3xl font-black leading-tight">
      Send us a message
    </h2>

    <p nbDialogDescription class="mt-3 inline-block p-0 font-mono text-base font-medium text-black">
      Fill in the form below and we'll get back to you as soon as possible.
    </p>
  </div>

  <nb-dialog-content class="border-y-0 bg-white px-6 pb-6 pt-4 sm:px-10">
    <form class="grid gap-5">
      <div class="grid gap-5 sm:grid-cols-2">
        <div class="grid min-w-0 gap-2">
          <label nbLabel for="contact-name" class="font-mono text-base">Name</label>
          <nb-input-group class="min-w-0">
            <span nbInputPrefix>
              <docs-contact-user-icon class="size-5" />
            </span>
            <input nbInput id="contact-name" placeholder="Your name" class="h-12 font-mono" />
          </nb-input-group>
        </div>
        <div class="grid min-w-0 gap-2">
          <label nbLabel for="contact-email" class="font-mono text-base">Email</label>
          <nb-input-group class="min-w-0">
            <span nbInputPrefix>
              <docs-contact-mail-icon class="size-5" />
            </span>
            <input nbInput id="contact-email" type="email" placeholder="you@company.com" class="h-12 font-mono" />
          </nb-input-group>
        </div>
      </div>

      <div class="grid gap-2">
        <label nbLabel id="contact-subject-label" class="font-mono text-base">Subject</label>
        <nb-input-group>
          <span nbInputPrefix>
            <docs-contact-tag-icon class="size-5" />
          </span>
          <nb-select
            placeholder="What is this regarding?"
            aria-labelledby="contact-subject-label"
          >
            <nb-select-option value="general" label="General Inquiry">
              General Inquiry
            </nb-select-option>
            <nb-select-option value="project" label="Project Proposal">
              Project Proposal
            </nb-select-option>
            <nb-select-option value="bug" label="Bug Report">
              Bug Report
            </nb-select-option>
            <nb-select-option value="other" label="Other">
              Other
            </nb-select-option>
          </nb-select>
        </nb-input-group>
      </div>

      <div class="grid gap-2">
        <label nbLabel for="contact-message" class="font-mono text-base">Message</label>
        <nb-input-group>
          <span nbInputPrefix align="stretch">
            <docs-contact-edit-icon class="size-5" />
          </span>
          <textarea nbTextarea id="contact-message" placeholder="Type your message here..." class="min-h-40 font-mono"></textarea>
        </nb-input-group>
      </div>
    </form>
  </nb-dialog-content>

  <nb-dialog-actions class="flex-col items-stretch justify-between gap-4 border-t-2 border-(--nb-border) bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-10">
    <div class="flex items-center gap-3">
      <span class="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-(--nb-border) bg-[#c4a8ff]">
        <docs-contact-shield-icon class="size-5" />
      </span>
      <div class="font-mono text-xs leading-tight">
        <p class="font-bold">Your data is safe with us.</p>
        <p>We'll never share your info.</p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <span class="hidden h-10 w-px bg-(--nb-border) sm:block" aria-hidden="true"></span>
      <docs-contact-zigzag-icon class="hidden w-9 sm:block" />
      <button nbButton variant="neutral" nbDialogClose class="min-w-28 font-mono" style="--nb-button-bg: #fff">Cancel</button>
      <button nbButton nbDialogClose class="flex min-w-36 items-center justify-center gap-2 font-mono" style="--nb-button-bg: #ffd92e; --nb-button-fg: #000;">
        Send Message
        <docs-contact-send-icon class="size-4" />
      </button>
    </div>
  </nb-dialog-actions>
</nb-dialog>`;
}
