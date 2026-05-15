import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCard,
  NbCardContent,
  NbCardDescription,
  NbCardFooter,
  NbCardHeader,
  NbCardTitle,
  NbInput,
  NbLabel,
} from '@ng-neo-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-card-page',
  standalone: true,
  imports: [
    DocsCodeBlockComponent,
    DocsExampleComponent,
    NbButton,
    NbCard,
    NbCardContent,
    NbCardDescription,
    NbCardFooter,
    NbCardHeader,
    NbCardTitle,
    NbInput,
    NbLabel,
  ],
  template: `
    <article>
      <header id="overview" class="mb-8 scroll-mt-32">
        <div class="mb-4">
          <p class="mb-2 text-sm font-bold uppercase tracking-wide">
            Components
          </p>
          <h1 class="text-4xl font-black tracking-tight">Card</h1>
          <p class="mt-2 max-w-3xl text-base font-medium sm:text-lg">
            Displays a card with header, content, and footer.
          </p>
        </div>

        <a
          nbButton
          size="sm"
          variant="neutral"
          href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/card"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <neo-card class="w-full max-w-sm">
            <neo-card-header>
              <neo-card-title>Login to your account</neo-card-title>
              <neo-card-description>
                Enter your email below to login to your account
              </neo-card-description>
            </neo-card-header>
            <neo-card-content>
              <form>
                <div class="flex flex-col gap-6">
                  <div class="grid gap-2">
                    <label nbLabel for="email">Email</label>
                    <input
                      nbInput
                      id="email"
                      type="email"
                      placeholder="m&#64;example.com"
                      required
                    />
                  </div>
                  <div class="grid gap-2">
                    <div class="flex items-center">
                      <label nbLabel for="password">Password</label>
                      <a
                        href="#"
                        class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <input
                      nbInput
                      id="password"
                      type="password"
                      required
                    />
                  </div>
                </div>
              </form>
            </neo-card-content>
            <neo-card-footer class="flex-col gap-2">
              <button nbButton type="submit" [fullWidth]="true">Login</button>
              <button nbButton variant="neutral" [fullWidth]="true">
                Login with Google
              </button>
              <div class="mt-4 text-center text-sm">
                Don't have an account?
                <a href="#" class="underline underline-offset-4">Sign up</a>
              </div>
            </neo-card-footer>
          </neo-card>
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="templateCode" />
      </section>

      <section id="simple">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Simple card</h2>
        <docs-example [code]="simpleExampleCode">
          <neo-card class="w-full max-w-sm">
            <neo-card-header>
              <neo-card-title>Notifications</neo-card-title>
              <neo-card-description>
                You have 3 unread messages.
              </neo-card-description>
            </neo-card-header>
            <neo-card-content>
              <p class="text-sm">
                Check your inbox for the latest updates and messages from your team.
              </p>
            </neo-card-content>
            <neo-card-footer>
              <button nbButton size="sm">View all</button>
            </neo-card-footer>
          </neo-card>
        </docs-example>
      </section>

      <section id="parts">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Sub-parts</h2>
        <p class="mb-4 text-sm font-medium">
          The card component is composed of 7 sub-parts that can be used independently.
        </p>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Selector
                </th>
                <th
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  neo-card
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 text-sm"
                >
                  Root container with border, shadow, and background
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  neo-card-header
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 text-sm"
                >
                  Top section with grid layout for title, description, and action
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  neo-card-title
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 text-sm"
                >
                  Heading text inside the header
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  neo-card-description
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 text-sm"
                >
                  Subtitle or description text inside the header
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  neo-card-action
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 text-sm"
                >
                  Action slot positioned top-right of the header
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  neo-card-content
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 text-sm"
                >
                  Main body area
                </td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  neo-card-footer
                </td>
                <td class="px-4 py-3 text-sm">
                  Bottom section with flex layout for buttons and links
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardPageComponent {
  protected readonly importCode = `import {
  NbCard,
  NbCardHeader,
  NbCardTitle,
  NbCardDescription,
  NbCardAction,
  NbCardContent,
  NbCardFooter,
} from '@ng-neo-brutalism/ui';`;

  protected readonly templateCode = `<neo-card>
  <neo-card-header>
    <neo-card-title>Card Title</neo-card-title>
    <neo-card-description>Card Description</neo-card-description>
  </neo-card-header>
  <neo-card-content>
    <p>Card Content</p>
  </neo-card-content>
  <neo-card-footer>
    <button nbButton>Action</button>
  </neo-card-footer>
</neo-card>`;

  protected readonly defaultExampleCode = `<neo-card class="w-full max-w-sm">
  <neo-card-header>
    <neo-card-title>Login to your account</neo-card-title>
    <neo-card-description>
      Enter your email below to login to your account
    </neo-card-description>
  </neo-card-header>
  <neo-card-content>
    <form>
      <div class="flex flex-col gap-6">
        <div class="grid gap-2">
          <label nbLabel for="email">Email</label>
          <input nbInput id="email" type="email"
            placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <label nbLabel for="password">Password</label>
            <a href="#" class="ml-auto inline-block text-sm
              underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <input nbInput id="password" type="password" required />
        </div>
      </div>
    </form>
  </neo-card-content>
  <neo-card-footer class="flex-col gap-2">
    <button nbButton type="submit" [fullWidth]="true">Login</button>
    <button nbButton variant="neutral" [fullWidth]="true">
      Login with Google
    </button>
    <div class="mt-4 text-center text-sm">
      Don't have an account?
      <a href="#" class="underline underline-offset-4">Sign up</a>
    </div>
  </neo-card-footer>
</neo-card>`;

  protected readonly simpleExampleCode = `<neo-card class="w-full max-w-sm">
  <neo-card-header>
    <neo-card-title>Notifications</neo-card-title>
    <neo-card-description>
      You have 3 unread messages.
    </neo-card-description>
  </neo-card-header>
  <neo-card-content>
    <p class="text-sm">
      Check your inbox for the latest updates
      and messages from your team.
    </p>
  </neo-card-content>
  <neo-card-footer>
    <button nbButton size="sm">View all</button>
  </neo-card-footer>
</neo-card>`;
}
