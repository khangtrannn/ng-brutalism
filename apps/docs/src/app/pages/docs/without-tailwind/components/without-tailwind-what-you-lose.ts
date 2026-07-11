import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-without-tailwind-what-you-lose',
  template: `
    <section id="what-you-lose">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        What you lose
      </h2>
      <p class="font-medium">
        Nothing in the library itself. Component visuals, tones, presets, and
        the CSS-variable customization surface all work identically. The only
        thing you give up is using Tailwind utility classes
        <em>in your own templates</em> - if you want those too, add
        <code class="font-mono">tailwindcss</code> back as a normal dependency
        of your app; it composes fine alongside ng-brutalism's static CSS
        either way.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutTailwindWhatYouLose {}
