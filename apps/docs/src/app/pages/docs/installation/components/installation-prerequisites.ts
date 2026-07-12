import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-installation-prerequisites',
  imports: [RouterLink],
  template: `
    <section id="prerequisites">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Prerequisites
      </h2>
      <p class="mb-2 text-base font-medium">
        The <code class="font-mono text-sm">ng add</code> schematic sets up
        <strong>Tailwind CSS v4</strong> automatically for Angular CLI apps,
        which is the fastest path if your app already uses Tailwind or you don't
        mind adding it. <code class="font-mono text-sm">tailwindcss</code> is an
        optional peer dependency, though - see
        <a routerLink="/docs/without-tailwind" class="underline"
          >Without Tailwind</a
        >
        if you'd rather skip it entirely.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationPrerequisites {}
