# ng-brutalism — Neo-brutalist Angular UI Primitive Library

Build loud. Stay sharp.

ng-brutalism is a neo-brutalist Angular UI primitive library and composition
system for building loud, token-driven Angular interfaces with directive-first
APIs, signals, zoneless-friendly patterns, Tailwind CSS v4, chunky borders,
offset shadows, and punchy colors.

If you like shadcn/ui or daisyUI, but for Angular and built around brutalism.

[![npm version](https://img.shields.io/npm/v/@ng-brutalism/ui.svg)](https://www.npmjs.com/package/@ng-brutalism/ui)
[![npm downloads](https://img.shields.io/npm/dm/@ng-brutalism/ui.svg)](https://www.npmjs.com/package/@ng-brutalism/ui)
[![CI](https://github.com/khangtrannn/ng-brutalism/actions/workflows/ci.yml/badge.svg)](https://github.com/khangtrannn/ng-brutalism/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@ng-brutalism/ui.svg)](https://github.com/khangtrannn/ng-brutalism/blob/main/LICENSE)

[Documentation](https://ngbrutalism.khangtran.dev) ·
[npm](https://www.npmjs.com/package/@ng-brutalism/ui) ·
[GitHub](https://github.com/khangtrannn/ng-brutalism)

![ng-brutalism Angular primitive library demo — buttons, cards, dialogs in neo-brutalist style](docs/assets/introduction.gif)

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

[Full installation guide →](https://ngbrutalism.khangtran.dev/docs/installation)

## Primitive System

ng-brutalism is a composition system, not just a component list. Use primitives
like `nbSurface`, `nbSection`, `nbSplit`, `nbStack`, and `nbCluster` as the
layout grammar. Add emphasis with `nbChip`, `nbCallout`, `nbSticker`, and
`nbStatusDot`. Finish with typography, media, forms, and action primitives.

Inputs are for common design decisions. CSS variables are for local art
direction. Classes are for layout escape hatches.

| Group                  | Primitives                                                  |
| ---------------------- | ----------------------------------------------------------- |
| Foundation             | Tokens, theme provider, CSS variables, `nbClass`            |
| Layout                 | Stack, Cluster, Split, Section, Separator                   |
| Surfaces               | Surface, Card, Image Card, Media Frame                      |
| Typography             | Text, Display, Title                                        |
| Emphasis               | Badge, Chip, Callout, Sticker, Status Dot, Rating, Progress |
| Actions                | Button, Icon Button, Button Trailing Icon                   |
| Media                  | Avatar, Avatar Group, Icon, Media Item                      |
| Forms                  | Input, Input Group, Textarea, Checkbox, Select, Label       |
| Overlays / Interaction | Accordion, Dialog, Marquee                                  |
| Recipes                | Travel Card, Podcast Card, Open to Work Card                |

## What it looks like

![ng-brutalism component showcase — accordion, badge, button, card, checkbox, dialog, input, select rendered in brutalist design](docs/assets/showcase-portfolio.png)

## FAQ

**Does ng-brutalism support Angular 21?**
Yes — it is built and tested against Angular 21. Earlier Angular versions are not supported.

**Do I need Tailwind CSS v4?**
Yes. ng-brutalism is built around Tailwind CSS v4 and CSS custom properties. It ships with an Angular CLI schematic that helps you get the required styling setup ready out of the box.

**Can I use ng-brutalism without zoneless mode?**
Yes. Components are designed for modern Angular: standalone imports, signal-friendly internals, and zoneless-friendly interaction patterns. They work in zoneless apps and in apps that still run with zone.js.

**Does ng-brutalism work with server-side rendering (SSR)?**
The UI package avoids browser-only assumptions in core primitives where possible, and browser-dependent behavior is kept behind Angular platform checks when needed.

**How customizable is the theme?**
All visual tokens are exposed as CSS custom properties (`--nb-*`). A subset of tokens can also be configured from TypeScript via `provideNgBrutalism({ theme: ... })` at bootstrap.

**Is ng-brutalism ready for production?**
It is pre-1.0. Component APIs are usable today, but minor versions may include breaking changes while the library settles.

## Author

Created by [Khang Tran](https://github.com/khangtrannn). MIT licensed. Source code is available on GitHub.

## Status

`@ng-brutalism/ui` is pre-1.0. The component APIs are usable today, but minor
versions may include breaking changes while the library settles.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT
