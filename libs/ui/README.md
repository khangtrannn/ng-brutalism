# @ng-brutalism/ui

A neo-brutalist Angular component library. Standalone components, signal-based APIs, themable via CSS custom properties, composed from Tailwind utilities.

## Install

```bash
pnpm add @ng-brutalism/ui
```

Requires Angular 21+ and Tailwind CSS v4 in the consuming app.

## Styles

Import the bundled stylesheet once at the app entry (e.g. `src/styles.css`):

```css
@import '@ng-brutalism/ui/styles.css';
```

The theme tokens (border, shadow, palette, radius) live in a separate sheet you can import or override:

```css
@import '@ng-brutalism/ui/theme.css';
```

## Usage

Every component is standalone — import directly where you use it:

```ts
import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NbButton],
  template: `<button nbButton variant="neutral">Ship it</button>`,
})
export class ExampleComponent {}
```

## Optional provider

Only needed if you want to override theme tokens from Angular config (CSS custom-property overrides work too):

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNgBrutalism } from '@ng-brutalism/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgBrutalism({
      theme: { radius: '0px', borderWidth: '3px' },
    }),
  ],
};
```

## Documentation

- Theming reference: [`TOKENS.md`](TOKENS.md)
- Live examples: clone the [repo](https://github.com/khangtrannn/ng-neo-brutalism-workspace) and run `pnpm serve:docs`

## License

MIT.
