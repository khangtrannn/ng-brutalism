import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbDialog,
  NbDialogClose,
  NbDialogContent,
  NbDialogDescription,
  NbDialogFooter,
  NbDialogHeader,
  NbDialogTitle,
  NbDialogTrigger,
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
    NbDialogClose,
    NbDialogContent,
    NbDialogDescription,
    NbDialogFooter,
    NbDialogHeader,
    NbDialogTitle,
    NbDialogTrigger,
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
            <span class="nb-stat-tile__value">8</span>
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
          <nb-dialog>
            <button nbButton nbDialogTrigger>Open Dialog</button>
            <nb-dialog-content>
              <nb-dialog-header>
                <nb-dialog-title>Confirm Action</nb-dialog-title>
                <nb-dialog-description>Are you sure you want to continue? This action cannot be undone.</nb-dialog-description>
              </nb-dialog-header>
              <nb-dialog-footer>
                <button nbButton variant="neutral" nbDialogClose>Cancel</button>
                <button nbButton nbDialogClose>Confirm</button>
              </nb-dialog-footer>
            </nb-dialog-content>
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
          <nb-dialog>
            <button nbButton nbDialogTrigger>Contact Us</button>
            <nb-dialog-content>
              <nb-dialog-header>
                <nb-dialog-title>Send Message</nb-dialog-title>
                <nb-dialog-description>Fill in the form below and we'll get back to you.</nb-dialog-description>
              </nb-dialog-header>
              <div class="flex flex-col gap-4 px-6 py-4">
                <div class="flex flex-col gap-2">
                  <label nbLabel for="name">Name</label>
                  <input nbInput id="name" placeholder="Your name" />
                </div>
                <div class="flex flex-col gap-2">
                  <label nbLabel for="msg">Message</label>
                  <textarea nbTextarea id="msg" placeholder="Your message..."></textarea>
                </div>
              </div>
              <nb-dialog-footer>
                <button nbButton variant="neutral" nbDialogClose>Cancel</button>
                <button nbButton nbDialogClose>Send</button>
              </nb-dialog-footer>
            </nb-dialog-content>
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
                <td class="px-4 py-3">Root component. Provides the dialog controller context.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nb-dialog-content</td>
                <td class="px-4 py-3">Renders the native <code class="font-mono">&lt;dialog&gt;</code> modal panel.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">[nbDialogTrigger]</td>
                <td class="px-4 py-3">Directive that opens the dialog on click.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">[nbDialogClose]</td>
                <td class="px-4 py-3">Directive that closes the dialog on click.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nb-dialog-header</td>
                <td class="px-4 py-3">Header section with bottom border.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nb-dialog-title</td>
                <td class="px-4 py-3">Bold dialog title.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nb-dialog-description</td>
                <td class="px-4 py-3">Muted supporting text below the title.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nb-dialog-footer</td>
                <td class="px-4 py-3">Footer section with top border, right-aligned actions.</td>
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
  protected readonly defaultExampleCode = `<nb-dialog>
  <button nbButton nbDialogTrigger>Open Dialog</button>
  <nb-dialog-content>
    <nb-dialog-header>
      <nb-dialog-title>Confirm Action</nb-dialog-title>
      <nb-dialog-description>Are you sure you want to continue?</nb-dialog-description>
    </nb-dialog-header>
    <nb-dialog-footer>
      <button nbButton variant="neutral" nbDialogClose>Cancel</button>
      <button nbButton nbDialogClose>Confirm</button>
    </nb-dialog-footer>
  </nb-dialog-content>
</nb-dialog>`;

  protected readonly importCode = `import {
  NbDialog,
  NbDialogContent,
  NbDialogTrigger,
  NbDialogClose,
  NbDialogHeader,
  NbDialogTitle,
  NbDialogDescription,
  NbDialogFooter,
} from '@ng-brutalism/ui';`;

  protected readonly withFormExampleCode = `<nb-dialog>
  <button nbButton nbDialogTrigger>Contact Us</button>
  <nb-dialog-content>
    <nb-dialog-header>
      <nb-dialog-title>Send Message</nb-dialog-title>
      <nb-dialog-description>Fill in the form below.</nb-dialog-description>
    </nb-dialog-header>
    <div class="flex flex-col gap-4 px-6 py-4">
      <div class="flex flex-col gap-2">
        <label nbLabel for="name">Name</label>
        <input nbInput id="name" placeholder="Your name" />
      </div>
      <div class="flex flex-col gap-2">
        <label nbLabel for="msg">Message</label>
        <textarea nbTextarea id="msg" placeholder="Your message..."></textarea>
      </div>
    </div>
    <nb-dialog-footer>
      <button nbButton variant="neutral" nbDialogClose>Cancel</button>
      <button nbButton nbDialogClose>Send</button>
    </nb-dialog-footer>
  </nb-dialog-content>
</nb-dialog>`;
}
