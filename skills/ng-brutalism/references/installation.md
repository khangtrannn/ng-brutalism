# Installation

Add the UI package to an Angular app with the schematic, or install it manually when you want full control over each setup step.

## Prerequisites

Components are composed from Tailwind utilities applied through `nbClass`. The library expects your app to have **Tailwind CSS v4** configured and scanning your project source. The `ng add` schematic handles this automatically for Angular CLI apps.

## Automatic Setup

Use the schematic when you want the package, Tailwind CSS v4, PostCSS, and global style imports configured for you.

```bash
ng add @ng-brutalism/ui
```

## Manual Setup

Use manual setup when Tailwind is already managed by your app or when you want to review each change yourself.

```bash
npm install @ng-brutalism/ui
# or
pnpm add @ng-brutalism/ui
```

## Styles

For manual setup, import Tailwind and the bundled stylesheet once at your app's entry (e.g. `src/styles.css`). It includes the default theme tokens.

```css
@import 'tailwindcss';
@import '@ng-brutalism/ui/styles.css';
```

## Provider (Optional)

Use the provider only when you need to override theme tokens from Angular config. The simpler alternative is to redefine the CSS custom properties in your own stylesheet.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideNgBrutalism } from '@ng-brutalism/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgBrutalism({
      theme: {
        radius: '0px',
        borderWidth: '3px',
      },
    }),
  ],
};
```

## Usage

```typescript
import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-example',
  imports: [NbButton],
  template: `<button nbButton tone="background" style="--nb-button-bg: #fff">Ship it</button>`,
})
export class Example {}
```
