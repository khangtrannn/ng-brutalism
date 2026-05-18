import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbDialog,
  NbDialogActions,
  NbDialogClose,
  NbDialogContent,
  NbDialogDescription,
  NbDialogTitle,
  NbInput,
  NbLabel,
  NbTextarea,
} from '@ng-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-dialog-page',
  standalone: true,
  imports: [
    DocsCodeBlockComponent,
    DocsExampleComponent,
    NbButton,
    NbDialog,
    NbDialogActions,
    NbDialogClose,
    NbDialogContent,
    NbDialogDescription,
    NbDialogTitle,
    NbInput,
    NbLabel,
    NbTextarea,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Dialog</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A modal dialog built on the native
            <code class="font-mono">&lt;dialog&gt;</code> element.
            Compound API with SSR-safe open/close. Click the backdrop to dismiss.
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

          <a
            nbButton
            size="sm"
            variant="neutral"
            href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/dialog"
            target="_blank"
            rel="noreferrer"
          >
            Source ↗
          </a>
        </div>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <button nbButton (click)="confirmDialog.open()">Open Dialog</button>
          <nb-dialog #confirmDialog>
            <div class="flex items-start justify-between gap-4 px-8 pt-8 pb-6">
              <span
                class="inline-block border-2 border-(--nb-border) bg-[#ff5d8f] px-4 py-1.5 font-mono text-sm font-black uppercase tracking-wider text-black"
              >
                Warning
              </span>
              <button
                nbButton
                nbDialogClose
                size="icon"
                variant="neutral"
                aria-label="Close dialog"
                class="text-xl leading-none"
              >
                &times;
              </button>
            </div>
            <h2 nbDialogTitle class="px-8! pt-0! pb-6! font-mono text-4xl! font-black! leading-none!">Confirm Action</h2>
            <nb-dialog-content class="px-8! py-6!">
              <p nbDialogDescription class="block! px-0! pb-0! font-mono text-base! font-medium! text-black!">
                Are you sure you want to continue?<br />
                This action cannot be undone.
              </p>
            </nb-dialog-content>
            <nb-dialog-actions class="gap-4! px-8! py-6!">
              <button nbButton variant="neutral" nbDialogClose class="font-mono min-w-32">Cancel</button>
              <button nbButton nbDialogClose class="font-mono min-w-32" style="--nb-button-bg: #ff2f68; --nb-button-fg: #000;">Confirm</button>
            </nb-dialog-actions>
          </nb-dialog>
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="with-form">
        <h2 class="mt-10 mb-4 text-2xl font-bold">With Form</h2>
        <docs-example [code]="withFormExampleCode">
          <button nbButton (click)="withFormDialog.open()">Contact Us</button>
          <nb-dialog #withFormDialog>
            <h2 nbDialogTitle>Send Message</h2>
            <p nbDialogDescription>Fill in the form below and we'll get back to you.</p>
            <nb-dialog-content>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <label nbLabel for="name">Name</label>
                  <input nbInput id="name" placeholder="Your name" />
                </div>
                <div class="flex flex-col gap-2">
                  <label nbLabel for="msg">Message</label>
                  <textarea nbTextarea id="msg" placeholder="Your message..."></textarea>
                </div>
              </div>
            </nb-dialog-content>
            <nb-dialog-actions>
              <button nbButton variant="neutral" nbDialogClose>Cancel</button>
              <button nbButton nbDialogClose>Send</button>
            </nb-dialog-actions>
          </nb-dialog>
        </docs-example>
      </section>

      <section id="api">
        <h2 class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Part</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nb-dialog</td>
                <td class="px-4 py-3">Root component. Renders the native <code class="font-mono">&lt;dialog&gt;</code> modal. Exposes <code class="font-mono">open()</code> and <code class="font-mono">close()</code> for <code class="font-mono">viewChild</code> access.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">[nbDialogTitle]</td>
                <td class="px-4 py-3">Directive applied to a heading element. Styles the dialog title.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">[nbDialogDescription]</td>
                <td class="px-4 py-3">Directive for muted supporting text below the title.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nb-dialog-content</td>
                <td class="px-4 py-3">Scrollable body section with top and bottom borders.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nb-dialog-actions</td>
                <td class="px-4 py-3">Footer section with right-aligned action buttons.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">[nbDialogClose]</td>
                <td class="px-4 py-3">Directive that closes the dialog on click.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DialogPageComponent {
  protected readonly defaultExampleCode = `<button nbButton (click)="dialog.open()">Open Dialog</button>
<nb-dialog #dialog>
  <div class="flex items-start justify-between gap-4 px-8 pt-8 pb-6">
    <span
      class="inline-block border-2 border-(--nb-border) bg-[#ff5d8f] px-4 py-1.5 font-mono text-sm font-black uppercase tracking-wider text-black"
    >
      Warning
    </span>
    <button
      nbButton
      nbDialogClose
      size="icon"
      variant="neutral"
      aria-label="Close dialog"
      class="text-xl leading-none"
    >
      &times;
    </button>
  </div>
  <h2 nbDialogTitle class="px-8! pt-0! pb-6! font-mono text-4xl! font-black! leading-none!">Confirm Action</h2>
  <nb-dialog-content class="px-8! py-6!">
    <p nbDialogDescription class="block! px-0! pb-0! font-mono text-base! font-medium! text-black!">
      Are you sure you want to continue?<br />
      This action cannot be undone.
    </p>
  </nb-dialog-content>
  <nb-dialog-actions class="gap-4! px-8! py-6!">
    <button nbButton variant="neutral" nbDialogClose class="font-mono min-w-32">Cancel</button>
    <button nbButton nbDialogClose class="font-mono min-w-32" style="--nb-button-bg: #ff2f68; --nb-button-fg: #000;">Confirm</button>
  </nb-dialog-actions>
</nb-dialog>`;

  protected readonly importCode = `import {
  NbDialog,
  NbDialogTitle,
  NbDialogDescription,
  NbDialogContent,
  NbDialogActions,
  NbDialogClose,
} from '@ng-brutalism/ui';`;

  protected readonly withFormExampleCode = `<button nbButton (click)="dialog.open()">Contact Us</button>
<nb-dialog #dialog>
  <h2 nbDialogTitle>Send Message</h2>
  <p nbDialogDescription>Fill in the form below.</p>
  <nb-dialog-content>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label nbLabel for="name">Name</label>
        <input nbInput id="name" placeholder="Your name" />
      </div>
      <div class="flex flex-col gap-2">
        <label nbLabel for="msg">Message</label>
        <textarea nbTextarea id="msg" placeholder="Your message..."></textarea>
      </div>
    </div>
  </nb-dialog-content>
  <nb-dialog-actions>
    <button nbButton variant="neutral" nbDialogClose>Cancel</button>
    <button nbButton nbDialogClose>Send</button>
  </nb-dialog-actions>
</nb-dialog>`;
}
