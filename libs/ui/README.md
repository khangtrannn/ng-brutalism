# ng-brutalism — Neo-brutalist Angular UI Component Library

Build loud. Stay sharp.

ng-brutalism is a neo-brutalist Angular UI component library — token-driven,
signals-first, zoneless, with directive APIs, keyboard-ready interactions, and
Tailwind v4 ergonomics from the first import.

If you like shadcn/ui or daisyUI, but for Angular and built around brutalism.

[![npm version](https://img.shields.io/npm/v/@ng-brutalism/ui.svg)](https://www.npmjs.com/package/@ng-brutalism/ui)
[![npm downloads](https://img.shields.io/npm/dm/@ng-brutalism/ui.svg)](https://www.npmjs.com/package/@ng-brutalism/ui)
[![CI](https://github.com/khangtrannn/ng-brutalism/actions/workflows/ci.yml/badge.svg)](https://github.com/khangtrannn/ng-brutalism/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@ng-brutalism/ui.svg)](https://github.com/khangtrannn/ng-brutalism/blob/main/LICENSE)

[Documentation](https://ngbrutalism.khangtran.dev) ·
[npm](https://www.npmjs.com/package/@ng-brutalism/ui) ·
[GitHub](https://github.com/khangtrannn/ng-brutalism)

![ng-brutalism Angular component library demo — buttons, cards, dialogs in neo-brutalist style](https://raw.githubusercontent.com/khangtrannn/ng-brutalism/main/docs/assets/introduction.gif)

## Install

Requires Node 20.19+ or 22.12+, Angular 21, and Tailwind CSS v4.

Automatic setup:

```sh
ng add @ng-brutalism/ui
```

The schematic installs the package, configures Tailwind CSS v4 when needed, and
adds the bundled styles to your global stylesheet.

Manual setup:

```sh
npm install @ng-brutalism/ui
# or
pnpm add @ng-brutalism/ui
```

Import the styles once in your global CSS:

```css
@import 'tailwindcss';
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
export class App {}
```

## Why it stands out

- **Angular first**: Built as Angular primitives with directive APIs,
  signal-friendly internals, and native interaction patterns that fit modern
  Angular apps.
- **Loud by default**: Chunky borders, offset shadows, punchy color, and compact
  motion make interfaces feel instantly brutalist.
- **Easy to bend**: CSS custom properties and Tailwind utilities keep theme
  overrides local, visible, and predictable.

Optional — configure a subset of theme tokens from TypeScript at bootstrap.
Sets the corresponding `--nb-*` custom properties for these keys. Tokens
outside `NbThemeConfig` (e.g. `--nb-background`, `--nb-field-bg`) must still be
overridden in CSS.

```ts
import { provideNgBrutalism } from '@ng-brutalism/ui';

bootstrapApplication(App, {
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

## Components

| Component | Description | Docs |
| --- | --- | --- |
| Accordion | Vertically stacked, collapsible content panels with single or multi-expand modes. | [Docs](https://ngbrutalism.khangtran.dev/components/accordion) |
| Avatar | Compact avatar with image and fallback support. | [Docs](https://ngbrutalism.khangtran.dev/components/avatar) |
| Badge | Inline status pill with multiple variants. | [Docs](https://ngbrutalism.khangtran.dev/components/badge) |
| Button | Directive-driven button with size, variant, and shadow controls. | [Docs](https://ngbrutalism.khangtran.dev/components/button) |
| Card | Container with header, title, description, content, actions, and footer slots. | [Docs](https://ngbrutalism.khangtran.dev/components/card) |
| Checkbox | Form checkbox with size variants and signal-friendly bindings. | [Docs](https://ngbrutalism.khangtran.dev/components/checkbox) |
| Dialog | Modal dialog with title, description, content, actions, and close slots. | [Docs](https://ngbrutalism.khangtran.dev/components/dialog) |
| Image Card | Image-led card with caption overlay for portfolios and galleries. | [Docs](https://ngbrutalism.khangtran.dev/components/image-card) |
| Input | Single-line text input with size variants. | [Docs](https://ngbrutalism.khangtran.dev/components/input) |
| Input Group | Input wrapper with prefix and suffix slots for icons, addons, or units. | [Docs](https://ngbrutalism.khangtran.dev/components/input-group) |
| Label | Accessible label tied to form controls. | [Docs](https://ngbrutalism.khangtran.dev/components/label) |
| Marquee | Looping horizontal scroller for logos, tags, or announcements. | [Docs](https://ngbrutalism.khangtran.dev/components/marquee) |
| Select | Native or custom dropdown select with option templating. | [Docs](https://ngbrutalism.khangtran.dev/components/select) |
| Textarea | Multi-line text input with size variants. | [Docs](https://ngbrutalism.khangtran.dev/components/textarea) |
| Title | Typographic heading primitive with brutalist defaults. | [Docs](https://ngbrutalism.khangtran.dev/components/title) |

## What it looks like

![ng-brutalism component showcase — accordion, badge, button, card, checkbox, dialog, input, select rendered in brutalist design](https://raw.githubusercontent.com/khangtrannn/ng-brutalism/main/docs/assets/showcase-portfolio.png)

## Documentation

Full guides, component API tables, and live examples:
[https://ngbrutalism.khangtran.dev](https://ngbrutalism.khangtran.dev)

## FAQ

**Does ng-brutalism support Angular 21?**
Yes — it is built and tested against Angular 21. Earlier Angular versions are not supported.

**Do I need Tailwind CSS v4?**
Yes. ng-brutalism is built on Tailwind v4's token system. Tailwind v3 is not supported.

**Can I use ng-brutalism without zoneless mode?**
Yes — components are signal-driven and work in both zone.js and zoneless apps.

**Does ng-brutalism work with server-side rendering (SSR)?**
Components are zoneless and avoid direct DOM access where possible, so SSR is expected to work — but it is not yet exhaustively verified at v0.1.1.

**How customizable is the theme?**
All visual tokens are exposed as CSS custom properties (`--nb-*`). A subset of tokens can also be configured from TypeScript via `provideNgBrutalism({ theme: ... })` at bootstrap.

**Is ng-brutalism ready for production?**
It is pre-1.0. Component APIs are usable today, but minor versions may include breaking changes while the library settles.

## Author

Created by [Khang Tran](https://github.com/khangtrannn).

## Status

`@ng-brutalism/ui` is pre-1.0. The component APIs are usable today, but minor
versions may include breaking changes while the library settles.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](https://github.com/khangtrannn/ng-brutalism/blob/main/CONTRIBUTING.md) for details.

## License

MIT
