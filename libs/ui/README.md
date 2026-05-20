# @ng-brutalism/ui

A neo-brutalist Angular component library — Signals • Zoneless • Token-based • Tailwind v4.

[![npm version](https://img.shields.io/npm/v/@ng-brutalism/ui.svg)](https://www.npmjs.com/package/@ng-brutalism/ui)
[![npm downloads](https://img.shields.io/npm/dm/@ng-brutalism/ui.svg)](https://www.npmjs.com/package/@ng-brutalism/ui)
[![CI](https://github.com/khangtrannn/ng-brutalism/actions/workflows/ci.yml/badge.svg)](https://github.com/khangtrannn/ng-brutalism/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@ng-brutalism/ui.svg)](https://github.com/khangtrannn/ng-brutalism/blob/main/LICENSE)

[Documentation](https://ngbrutalism.khangtran.dev) ·
[npm](https://www.npmjs.com/package/@ng-brutalism/ui) ·
[GitHub](https://github.com/khangtrannn/ng-brutalism)

![demo](https://raw.githubusercontent.com/khangtrannn/ng-brutalism/main/docs/assets/image-card-demo.gif)

## Install

Requires Node 20.19+ or 22.12+, Angular 21, and Tailwind CSS v4.

```sh
pnpm add @ng-brutalism/ui
```

Import the styles once in your global CSS:

```css
@import '@ng-brutalism/ui/styles.css';
```

Use a component:

```ts
import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-root',
  imports: [NbButton],
  template: `<button nbButton>Click</button>`,
})
export class AppComponent {}
```

Optional — configure a subset of theme tokens from TypeScript at bootstrap.
Sets the corresponding `--nb-*` custom properties for these keys. Tokens
outside `NbThemeConfig` (e.g. `--nb-background`, `--nb-field-bg`) must still be
overridden in CSS.

```ts
import { provideNgBrutalism } from '@ng-brutalism/ui';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgBrutalism({
      theme: {
        primary: '#ffd166',
        radius: '4px',
        borderWidth: '3px',
      },
    }),
  ],
});
```

## What it looks like

![showcase](https://raw.githubusercontent.com/khangtrannn/ng-brutalism/main/docs/assets/showcase-portfolio.png)

## Documentation

Full guides, component API tables, and live examples:
[https://ngbrutalism.khangtran.dev](https://ngbrutalism.khangtran.dev)

## Status

`@ng-brutalism/ui` is pre-1.0. The component APIs are usable today, but minor
versions may include breaking changes while the library settles.

## License

MIT
