import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton } from '@ng-neo-brutalism/ui';

@Component({
  selector: 'docs-button-page',
  standalone: true,
  imports: [NbButton],
  template: `
    <section class="mx-auto max-w-5xl p-8">
      <header class="mb-10">
        <p class="mb-2 text-sm font-black uppercase tracking-wide">
          Components
        </p>
        <h1 class="mb-4 text-5xl font-black">Button</h1>
        <p class="max-w-2xl text-lg">
          Neo-brutalist buttons with hard borders, offset shadows, strong
          colors, keyboard focus states, and native disabled behavior.
        </p>
      </header>

      <section class="mb-10">
        <h2 class="mb-4 text-2xl font-black">Variants</h2>
        <div class="flex flex-wrap gap-4">
          <button nbButton>Default</button>
          <button nbButton variant="primary">Primary</button>
          <button nbButton variant="secondary">Secondary</button>
          <button nbButton variant="danger">Danger</button>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-2xl font-black">Sizes</h2>
        <div class="flex flex-wrap items-center gap-4">
          <button nbButton size="sm" variant="primary">Small</button>
          <button nbButton size="md" variant="primary">Medium</button>
          <button nbButton size="lg" variant="primary">Large</button>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-2xl font-black">Full width</h2>
        <button nbButton variant="secondary" [fullWidth]="true">
          Full width button
        </button>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-2xl font-black">Disabled</h2>
        <div class="flex flex-wrap gap-4">
          <button nbButton variant="primary" disabled>Disabled button</button>
          <a nbButton href="#" aria-disabled="true">Disabled link style</a>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-2xl font-black">Anchor usage</h2>
        <div class="flex flex-wrap gap-4">
          <a
            nbButton
            href="https://angular.dev"
            target="_blank"
            rel="noreferrer"
          >
            Angular Docs
          </a>

          <a
            nbButton
            variant="primary"
            href="https://github.com/khangtrannn/ng-neo-brutalism-workspace"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
        </div>
      </section>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonPageComponent {}
