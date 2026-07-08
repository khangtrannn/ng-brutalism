import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-faq-page',
  imports: [NbButton, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Getting Started</p>
          <h1>FAQ</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Straight answers about Ng Brutalism, the Angular version it targets,
            why it exists, and where it fits compared with other Angular UI
            libraries.
          </p>
        </div>

        <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            class="w-full justify-center sm:w-auto"
            nbButton
            routerLink="/docs/installation"
          >
            Install the library
          </a>
          <a
            class="w-full justify-center sm:w-auto"
            nbButton
            tone="background"
            routerLink="/components/button"
            style="--nb-button-bg: #fff"
          >
            Browse components
          </a>
        </div>
      </header>

      <section id="what-is-ng-brutalism">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          What is Ng Brutalism?
        </h2>
        <p class="mb-4 text-base font-medium">
          Ng Brutalism is a neo-brutalist Angular UI primitive library and
          composition system published as
          <code class="font-mono text-sm">&#64;ng-brutalism/ui</code>. It gives
          modern Angular apps directive-first primitives — Surface, Section,
          Stack, Cluster, Split, Button, Chip, and more — with hard borders,
          offset shadows, punchy colors, and Tailwind CSS v4 styling ergonomics.
        </p>
        <p class="text-base font-medium">
          Primitives compose together like LEGO. Each owns one job:
          <code class="font-mono text-sm">nbSurface</code> creates the panel,
          <code class="font-mono text-sm">nbSection</code> divides it into
          regions, <code class="font-mono text-sm">nbStack</code> and
          <code class="font-mono text-sm">nbCluster</code> handle vertical and
          horizontal rhythm, and
          <code class="font-mono text-sm">nbSplit</code> builds main-and-aside
          layouts. Layer in actions, forms, media, and emphasis to build any
          product UI.
        </p>
      </section>

      <section id="why-angular">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Why build it for Angular?
        </h2>
        <p class="mb-4 text-base font-medium">
          Angular has excellent application primitives, especially in modern
          versions with standalone components, signals, and zoneless-friendly
          patterns. Ng Brutalism is built to fit that world directly, with APIs
          and interaction patterns that feel natural in Angular applications.
        </p>
        <p class="text-base font-medium">
          Each component can be imported directly into the Angular component
          that uses it, which keeps examples small and makes the API easy to
          scan.
        </p>
      </section>

      <section id="modern-angular">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Does it support signals and zoneless Angular?
        </h2>
        <p class="text-base font-medium">
          Yes. The library is designed for modern Angular: standalone imports,
          signal-friendly internals, and zoneless-friendly interaction patterns.
          You can use Ng Brutalism in a zoneless app, and you can also use it in
          Angular apps that still run with zone.js.
        </p>
      </section>

      <section id="tailwind-v4">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Does it require Tailwind CSS v4?
        </h2>
        <p class="text-base font-medium">
          No — <code class="font-mono text-sm">tailwindcss</code> is an
          optional peer dependency. Component styling ships as a static,
          self-contained CSS file that needs no Tailwind processing to
          render correctly. The <code class="font-mono text-sm">ng add</code>
          schematic sets up Tailwind CSS v4 by default as a convenience for
          your own app code, but it isn't required by the library itself —
          see
          <a routerLink="/docs/without-tailwind" class="underline"
            >Without Tailwind</a
          >
          for manual setup.
        </p>
      </section>

      <section id="library-comparison">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          How is it different from Angular Material, PrimeNG, Taiga UI, or
          Spartan?
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div
            class="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">
              Different visual job
            </h3>
            <p class="mt-2 text-sm font-medium">
              Many Angular UI libraries are designed to support a wide range of
              product styles. Ng Brutalism starts from a narrower design
              promise: neo-brutalist components that look opinionated on day
              one.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">
              Different customization model
            </h3>
            <p class="mt-2 text-sm font-medium">
              The library leans on CSS tokens and Tailwind utilities rather than
              a large theme abstraction. You tune borders, shadows, colors, and
              local component accents close to the markup.
            </p>
          </div>
        </div>
        <p class="mt-5 text-base font-medium">
          Some Angular libraries focus on unstyled or lightly styled primitives.
          Ng Brutalism takes a more visual-first approach: the brutalist look
          ships with the primitives, then CSS tokens and Tailwind utilities let
          you tune it from there. See the
          <a routerLink="/docs/comparison" class="underline">Comparison</a>
          page for when that tradeoff — and when it doesn't — fits your project.
        </p>
      </section>

      <section id="production-readiness">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Is it production ready?
        </h2>
        <p class="text-base font-medium">
          Ng Brutalism is pre-1.0. The components are usable today, but minor
          API changes can happen while the library hardens. It is a good fit for
          prototypes, portfolios, launch pages, side projects, and teams willing
          to track early releases. For conservative enterprise systems, wait for
          a later stable release — see
          <a routerLink="/docs/versioning" class="underline">Versioning &amp; Roadmap</a>
          for the exact v1.0 criteria, and
          <a routerLink="/docs/comparison" class="underline">Comparison</a>
          for when another library is the better fit today.
        </p>
      </section>

      <section id="components-included">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          What components are included?
        </h2>
        <p class="mb-5 text-base font-medium">
          v0.2.0 ships a full primitive composition system grouped by role.
        </p>
        <div class="space-y-5">
          @for (group of componentGroups; track group.label) {
          <div>
            <p
              class="mb-3 font-mono text-xs font-bold tracking-widest uppercase opacity-60"
            >
              {{ group.label }}
            </p>
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              @for (component of group.items; track component.path) {
              <a
                class="nb-stat-tile nb-stat-tile--interactive"
                [routerLink]="component.path"
              >
                <span class="nb-stat-tile__value">{{ component.label }}</span>
                <span class="nb-stat-tile__label">{{ component.summary }}</span>
              </a>
              }
            </div>
          </div>
          }
        </div>
      </section>

      <section id="ssr">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Does it work with SSR?
        </h2>
        <p class="text-base font-medium">
          Yes. The docs site itself is prerendered with Analog and Angular.
          The UI package avoids browser-only assumptions in core primitives,
          generates ids through an injectable counter so hydration can't
          mismatch, and keeps browser-dependent behavior behind Angular
          platform checks. See
          <a routerLink="/docs/ssr" class="underline">SSR &amp; Hydration</a>
          for details.
        </p>
      </section>

      <section id="who-made-it">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Who made Ng Brutalism?
        </h2>
        <p class="text-base font-medium">
          Ng Brutalism was created by Khang Tran, is MIT licensed, and is
          published to npm as
          <code class="font-mono text-sm">&#64;ng-brutalism/ui</code>. The
          source code is available on GitHub.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FaqPage {
  protected readonly componentGroups = [
    {
      label: 'Composition',
      items: [
        {
          label: 'Surface',
          path: '/components/surface',
          summary: 'Brutalist panel',
        },
        {
          label: 'Section',
          path: '/components/section',
          summary: 'Panel regions',
        },
        {
          label: 'Stack',
          path: '/components/stack',
          summary: 'Vertical rhythm',
        },
        {
          label: 'Cluster',
          path: '/components/cluster',
          summary: 'Horizontal groups',
        },
        { label: 'Split', path: '/components/split', summary: 'Main + aside' },
      ],
    },
    {
      label: 'Actions',
      items: [
        {
          label: 'Button',
          path: '/components/button',
          summary: 'Actions and links',
        },
        {
          label: 'Icon Button',
          path: '/components/icon-button',
          summary: 'Icon-only actions',
        },
      ],
    },
    {
      label: 'Typography',
      items: [
        { label: 'Text', path: '/components/text', summary: 'Body copy' },
        {
          label: 'Title',
          path: '/components/title',
          summary: 'Section headings',
        },
        { label: 'Display', path: '/components/display', summary: 'Hero text' },
      ],
    },
    {
      label: 'Forms',
      items: [
        { label: 'Input', path: '/components/input', summary: 'Form fields' },
        {
          label: 'Textarea',
          path: '/components/textarea',
          summary: 'Multi-line input',
        },
        { label: 'Checkbox', path: '/components/checkbox', summary: 'Toggles' },
        {
          label: 'Select',
          path: '/components/select',
          summary: 'Dropdown choices',
        },
        { label: 'Label', path: '/components/label', summary: 'Form labels' },
        {
          label: 'Input Group',
          path: '/components/input-group',
          summary: 'Prefix and suffix',
        },
      ],
    },
    {
      label: 'Media',
      items: [
        {
          label: 'Avatar',
          path: '/components/avatar',
          summary: 'Profile images',
        },
        {
          label: 'Avatar Group',
          path: '/components/avatar-group',
          summary: 'Team stacks',
        },
        { label: 'Icon', path: '/components/icon', summary: 'SVG icons' },
        {
          label: 'Media Frame',
          path: '/components/media-frame',
          summary: 'Framed images',
        },
        {
          label: 'Media Item',
          path: '/components/media-item',
          summary: 'Icon + label rows',
        },
      ],
    },
    {
      label: 'Emphasis',
      items: [
        { label: 'Badge', path: '/components/badge', summary: 'Status labels' },
        { label: 'Chip', path: '/components/chip', summary: 'Metadata tags' },
        {
          label: 'Callout',
          path: '/components/callout',
          summary: 'Highlight panels',
        },
        {
          label: 'Sticker',
          path: '/components/sticker',
          summary: 'Decorative bursts',
        },
        {
          label: 'Status Dot',
          path: '/components/status-dot',
          summary: 'State indicators',
        },
        { label: 'Rating', path: '/components/rating', summary: 'Star scores' },
        {
          label: 'Progress',
          path: '/components/progress',
          summary: 'Completion bars',
        },
      ],
    },
    {
      label: 'Interaction',
      items: [
        {
          label: 'Accordion',
          path: '/components/accordion',
          summary: 'Disclosure panels',
        },
        { label: 'Dialog', path: '/components/dialog', summary: 'Modal flows' },
        {
          label: 'Marquee',
          path: '/components/marquee',
          summary: 'Scrolling ticker',
        },
      ],
    },
    {
      label: 'Recipes',
      items: [
        {
          label: 'Travel Card',
          path: '/recipes/travel-card',
          summary: 'Media composition',
        },
        {
          label: 'Podcast Card',
          path: '/recipes/podcast-card',
          summary: 'Audio episode card',
        },
        {
          label: 'Open to Work',
          path: '/recipes/open-to-work-card',
          summary: 'Profile card',
        },
      ],
    },
  ];
}
