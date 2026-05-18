# Implement `neo-marquee` Component

## Goal

Implement a `NbMarquee` (Marquee) component for the `@ng-neo-brutalism/ui` library inside this Nx workspace, following all existing conventions established by the `accordion` and `button` components. Also add a documentation page for it in the `apps/docs` app.

---

## Workspace context

- **Package manager**: pnpm
- **Framework**: Angular (standalone components, signals API, `ChangeDetectionStrategy.OnPush`)
- **Styling**: Tailwind CSS v4, plus `nbClass()` utility (`libs/ui/src/lib/core/class.ts`) which wraps `clsx` + `tailwind-merge`
- **Selector prefix**: `neo-` (e.g. `neo-accordion`, `neo-button`)
- **Class name prefix**: `Nb` (e.g. `NbAccordionComponent`, `NbButton`)
- **Component lib root**: `libs/ui/src/lib/` — each component in its own subfolder
- **Public API**: `libs/ui/src/index.ts`
- **Docs app pages**: `apps/docs/src/app/pages/`
- **Docs nav**: `apps/docs/src/app/docs/nav.ts`

---

## Design decisions (already resolved — do not deviate)

1. **Content projection via `<ng-content>` + `neo-marquee-item`**. The parent renders all items using `TemplateRef` so the same item list can be rendered twice (needed for the infinite loop effect).
2. **`neo-marquee-item`** wraps its projected content in an `<ng-template>` and exposes the `TemplateRef` via `viewChild`. The parent collects all items via `contentChildren`. The item host applies default styles `mx-4 text-4xl whitespace-nowrap` so consumers get the reference look out of the box.
3. **Animation layout**: Strip 1 is in normal flow; Strip 2 is `absolute top-0` overlaying Strip 1. This is the only layout that makes `translateX(-100%)` / `translateX(100%)` work correctly — percentages are relative to each strip's own width, not the container.
4. **Wrapper styles**: Always applied — `relative w-full overflow-x-hidden border-t-2 border-b-2 border-(--nb-border) bg-(--nb-secondary-background) text-(--nb-foreground) font-base`. Not optional inputs.
5. **Animation**: component-scoped CSS `@keyframes` in the `styles: [...]` array — no global CSS changes required.
6. **Inputs**:
   - `duration: string` — CSS duration string, default `'20s'`. Bound as a CSS custom property `--nb-marquee-duration` on the wrapper element.
   - `reverse: boolean` — default `false`. Uses `booleanAttribute` transform.
   - `pauseOnHover: boolean` — default `true`. Uses `booleanAttribute` transform. Implemented with a pure CSS hover rule in the component styles.
7. **Docs demo**: Plain emoji + text items (no badge wrappers), matching the reference site's out-of-the-box appearance.

---

## Reference implementation (React source)

This is the exact React component being ported to Angular — stay faithful to its structure:

```jsx
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-border bg-secondary-background text-foreground font-base">
      <div className="animate-marquee whitespace-nowrap py-12">
        {items.map((item) => (
          <span key={item} className="mx-4 text-4xl">{item}</span>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
        {items.map((item) => (
          <span key={item} className="mx-4 text-4xl">{item}</span>
        ))}
      </div>
    </div>
  )
}
```

---

## Files to CREATE

### 1. `libs/ui/src/lib/marquee/marquee-item.ts`

`neo-marquee-item` has no `host` class. Its host element is never rendered to the DOM (because `neo-marquee` has no `<ng-content>`, Angular discards unprojected content). The component exists only to capture projected content as a `TemplateRef` for the parent to render twice. Item styling (`mx-4 text-4xl whitespace-nowrap`) is applied in the strip template via a wrapping `<span>`, not here.

```typescript
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'neo-marquee-item',
  standalone: true,
  template: `<ng-template #tpl><ng-content /></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbMarqueeItemComponent {
  readonly tpl = viewChild.required<TemplateRef<void>>('tpl');
}
```

### 2. `libs/ui/src/lib/marquee/marquee.ts`

Key layout points:
- Wrapper: `relative` (required so Strip 2's `absolute` is scoped to it), `overflow-x-hidden`, borders, background — always applied.
- Strip 1: normal flow, `whitespace-nowrap py-12` + animation class.
- Strip 2: `absolute top-0` overlaying Strip 1, same content, same padding + animation class.
- Each rendered item is wrapped in `<span class="mx-4 text-4xl whitespace-nowrap">` — this is where item sizing and spacing lives. The `neo-marquee-item` host class was removed because the host element is never in the DOM.
- Default `duration` is `'5s'`.

```typescript
import {
  ChangeDetectionStrategy,
  Component,
  NgTemplateOutlet,
  booleanAttribute,
  computed,
  contentChildren,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NbMarqueeItemComponent } from './marquee-item';

@Component({
  selector: 'neo-marquee',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div [class]="wrapperClass()" [style]="wrapperStyle()">
      <div [class]="strip1Class()">
        @for (item of items(); track $index) {
          <span class="mx-4 text-4xl whitespace-nowrap">
            <ng-container [ngTemplateOutlet]="item.tpl()" />
          </span>
        }
      </div>
      <div [class]="strip2Class()">
        @for (item of items(); track $index) {
          <span class="mx-4 text-4xl whitespace-nowrap">
            <ng-container [ngTemplateOutlet]="item.tpl()" />
          </span>
        }
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes nb-marquee-1 {
        from { transform: translateX(0%); }
        to   { transform: translateX(-100%); }
      }
      @keyframes nb-marquee-2 {
        from { transform: translateX(100%); }
        to   { transform: translateX(0%); }
      }
      @keyframes nb-marquee-reverse-1 {
        from { transform: translateX(0%); }
        to   { transform: translateX(100%); }
      }
      @keyframes nb-marquee-reverse-2 {
        from { transform: translateX(-100%); }
        to   { transform: translateX(0%); }
      }

      .nb-marquee-strip-1 {
        animation-name: nb-marquee-1;
        animation-duration: var(--nb-marquee-duration, 5s);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .nb-marquee-strip-1.nb-marquee-reverse {
        animation-name: nb-marquee-reverse-1;
      }

      .nb-marquee-strip-2 {
        animation-name: nb-marquee-2;
        animation-duration: var(--nb-marquee-duration, 5s);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .nb-marquee-strip-2.nb-marquee-reverse {
        animation-name: nb-marquee-reverse-2;
      }

      .nb-marquee-wrapper.nb-pause-on-hover:hover .nb-marquee-strip-1,
      .nb-marquee-wrapper.nb-pause-on-hover:hover .nb-marquee-strip-2 {
        animation-play-state: paused;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbMarqueeComponent {
  readonly duration = input('5s');
  readonly reverse = input(false, { transform: booleanAttribute });
  readonly pauseOnHover = input(true, { transform: booleanAttribute });

  protected readonly items = contentChildren(NbMarqueeItemComponent);

  protected readonly wrapperClass = computed(() =>
    nbClass(
      'nb-marquee-wrapper relative flex w-full overflow-x-hidden',
      'border-t-2 border-b-2 border-(--nb-border)',
      'bg-(--nb-secondary-background) text-(--nb-foreground) font-base',
      this.pauseOnHover() && 'nb-pause-on-hover'
    )
  );

  protected readonly wrapperStyle = computed(() => ({
    '--nb-marquee-duration': this.duration(),
  }));

  protected readonly strip1Class = computed(() =>
    nbClass(
      'nb-marquee-strip-1 whitespace-nowrap py-12',
      this.reverse() && 'nb-marquee-reverse'
    )
  );

  protected readonly strip2Class = computed(() =>
    nbClass(
      'nb-marquee-strip-2 absolute top-0 left-0 whitespace-nowrap py-12',
      this.reverse() && 'nb-marquee-reverse'
    )
  );
}
```

### 3. `libs/ui/src/lib/marquee/index.ts`

```typescript
export { NbMarqueeComponent, NbMarqueeComponent as NbMarquee } from './marquee';
export { NbMarqueeItemComponent, NbMarqueeItemComponent as NbMarqueeItem } from './marquee-item';
```

### 4. `apps/docs/src/app/pages/docs/marquee.page.ts`

Thin route-level wrapper — same pattern as `docs/button.page.ts`.

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import MarqueePageComponent from '../components/marquee.page';

@Component({
  selector: 'docs-marquee-route-page',
  standalone: true,
  imports: [MarqueePageComponent],
  template: `<docs-marquee-page />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MarqueeRoutePageComponent {}
```

### 5. `apps/docs/src/app/pages/components/marquee.page.ts`

Full documentation page. Follow the exact same structure and styling as `apps/docs/src/app/pages/components/button.page.ts`. The demo uses plain emoji + text items (no badge wrappers) to show the component's default look.

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbMarquee, NbMarqueeItem } from '@ng-neo-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-marquee-page',
  standalone: true,
  imports: [DocsCodeBlockComponent, DocsExampleComponent, NbButton, NbMarquee, NbMarqueeItem],
  template: `
    <article>
      <header id="overview" class="mb-8 scroll-mt-32">
        <div class="mb-4">
          <p class="mb-2 text-sm font-bold uppercase tracking-wide">Components</p>
          <h1 class="text-4xl font-black tracking-tight">Marquee</h1>
          <p class="mt-2 max-w-3xl text-base font-medium sm:text-lg">
            A horizontally scrolling component that loops its content infinitely.
            Supports configurable speed, reverse direction, and pause on hover.
          </p>
        </div>

        <a
          nbButton
          size="sm"
          variant="neutral"
          href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/marquee"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <neo-marquee class="w-full">
            <neo-marquee-item>👾 ng-neo-brutalism</neo-marquee-item>
            <neo-marquee-item>🎁 open source</neo-marquee-item>
            <neo-marquee-item>🎨 design system</neo-marquee-item>
            <neo-marquee-item>⚡ angular signals</neo-marquee-item>
            <neo-marquee-item>🏗️ nx workspace</neo-marquee-item>
            <neo-marquee-item>💅 tailwind css</neo-marquee-item>
          </neo-marquee>
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="reverse">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Reverse</h2>
        <docs-example [code]="reverseExampleCode">
          <neo-marquee class="w-full" [reverse]="true">
            <neo-marquee-item>👾 ng-neo-brutalism</neo-marquee-item>
            <neo-marquee-item>🎁 open source</neo-marquee-item>
            <neo-marquee-item>🎨 design system</neo-marquee-item>
            <neo-marquee-item>⚡ angular signals</neo-marquee-item>
            <neo-marquee-item>🏗️ nx workspace</neo-marquee-item>
            <neo-marquee-item>💅 tailwind css</neo-marquee-item>
          </neo-marquee>
        </docs-example>
      </section>

      <section id="custom-speed">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Custom speed</h2>
        <docs-example [code]="customSpeedExampleCode">
          <neo-marquee class="w-full" duration="8s">
            <neo-marquee-item>👾 ng-neo-brutalism</neo-marquee-item>
            <neo-marquee-item>🎁 open source</neo-marquee-item>
            <neo-marquee-item>🎨 design system</neo-marquee-item>
            <neo-marquee-item>⚡ angular signals</neo-marquee-item>
            <neo-marquee-item>🏗️ nx workspace</neo-marquee-item>
            <neo-marquee-item>💅 tailwind css</neo-marquee-item>
          </neo-marquee>
        </docs-example>
      </section>

      <section id="api">
        <h2 class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Input</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Type</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">duration</td>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'5s'</td>
              </tr>
              <tr>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">reverse</td>
                <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">boolean</td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm">false</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">pauseOnHover</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">boolean</td>
                <td class="px-4 py-3 font-mono text-sm">true</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MarqueePageComponent {
  protected readonly importCode = `import { NbMarquee, NbMarqueeItem } from '@ng-neo-brutalism/ui';`;

  protected readonly defaultExampleCode = `<neo-marquee>
  <neo-marquee-item>👾 ng-neo-brutalism</neo-marquee-item>
  <neo-marquee-item>🎁 open source</neo-marquee-item>
  <neo-marquee-item>🎨 design system</neo-marquee-item>
  <neo-marquee-item>⚡ angular signals</neo-marquee-item>
  <neo-marquee-item>🏗️ nx workspace</neo-marquee-item>
  <neo-marquee-item>💅 tailwind css</neo-marquee-item>
</neo-marquee>`;

  protected readonly reverseExampleCode = `<neo-marquee [reverse]="true">
  <neo-marquee-item>👾 ng-neo-brutalism</neo-marquee-item>
  <neo-marquee-item>🎁 open source</neo-marquee-item>
  <neo-marquee-item>🎨 design system</neo-marquee-item>
  <neo-marquee-item>⚡ angular signals</neo-marquee-item>
  <neo-marquee-item>🏗️ nx workspace</neo-marquee-item>
  <neo-marquee-item>💅 tailwind css</neo-marquee-item>
</neo-marquee>`;

  protected readonly customSpeedExampleCode = `<neo-marquee duration="8s">
  <neo-marquee-item>👾 ng-neo-brutalism</neo-marquee-item>
  <neo-marquee-item>🎁 open source</neo-marquee-item>
  <neo-marquee-item>🎨 design system</neo-marquee-item>
  <neo-marquee-item>⚡ angular signals</neo-marquee-item>
  <neo-marquee-item>🏗️ nx workspace</neo-marquee-item>
  <neo-marquee-item>💅 tailwind css</neo-marquee-item>
</neo-marquee>`;
}
```

---

## Files to MODIFY

### 6. `libs/ui/src/index.ts`

Add to the `// Components` section (already done — verify it reads):

```typescript
export { NbMarquee, NbMarqueeItem } from './lib/marquee';
```

### 7. `apps/docs/src/app/docs/nav.ts`

Add Marquee entry (already done — verify it reads):

```typescript
{ label: 'Marquee', path: '/docs/marquee' },
```

---

## How Analog/file-based routing works in this project

The docs app uses **Analog** file-based routing. A file at `apps/docs/src/app/pages/docs/marquee.page.ts` automatically maps to the route `/docs/marquee`. No manual route registration is needed.

The `docs/marquee.page.ts` is a thin wrapper delegating to `components/marquee.page.ts` — same pattern as `docs/button.page.ts` → `components/button.page.ts`.

---

## Key implementation notes

1. **Why item styling is in the strip, not on the `neo-marquee-item` host**: Angular discards projected content that has no `<ng-content>` slot to land in. Since `neo-marquee` has no `<ng-content>`, the `neo-marquee-item` host elements never appear in the DOM — only the component instances exist in memory for `contentChildren` to query. Any `host: { class: '...' }` on `NbMarqueeItemComponent` would apply to an invisible element. Item styling (`mx-4 text-4xl whitespace-nowrap`) must be on the `<span>` wrapper inside the strip template, which IS rendered.

2. **Why `absolute top-0 left-0` for Strip 2**: `translateX` percentages are relative to the element's own width. `left-0` is required because in a flex container, an absolutely positioned child's default `left: auto` resolves to its *static position* — the position it would occupy in the flex flow, which is after Strip 1. That means `translateX(100%)` pushes Strip 2 even further right (static offset + own width), so it starts off-screen by two strip-widths instead of one and never appears on screen. With `left: 0` both strips share origin x=0: Strip 2 starts at `translateX(100%)` = one strip-width off-screen right, animates to `translateX(0%)` = fully visible, creating a seamless loop. If Strip 2 were in flex flow instead, its natural x position would already be offset by Strip 1's width, and `translateX(0%)` would land off-screen — the animation would never be visible.

3. **Why `relative flex` on the wrapper**: `relative` scopes Strip 2's `absolute top-0`. `flex` ensures Strip 1 (the only in-flow child) determines the wrapper's height — which also sets the height of the absolute Strip 2.

4. **`overflow-x-hidden` not `overflow-hidden`**: The reference uses `overflow-x-hidden` specifically, leaving vertical overflow unrestricted.

5. **Why the loop is seamless**: At t=duration, Strip 1 is at `translateX(-100%)` (fully off-screen left) and Strip 2 is at `translateX(0%)` (exactly where Strip 1 started). Both animations restart simultaneously — Strip 1 jumps back to 0%, Strip 2 jumps back to 100%. Since Strip 1 at 0% is visually identical to Strip 2 at 0% (same content, same width), the jump is invisible. This requires both strips to have identical content and identical animation durations.

6. **Component-scoped `@keyframes`**: Angular's `ViewEncapsulation.Emulated` does NOT scope `@keyframes` with attribute selectors, so prefix names (`nb-marquee-1`, etc.) prevent collisions with any other app-level keyframes.

7. **`pauseOnHover` is pure CSS**: The `.nb-marquee-wrapper.nb-pause-on-hover:hover` rule pauses both strips' animations on hover. No `HostListener` needed.

8. **Pagination auto-wires**: `NbDocsPaginationComponent` reads `DOC_NAV` at runtime — adding the Marquee entry to `nav.ts` automatically gives the page correct prev/next links.

---

## Verification checklist

After implementing, verify:

- [ ] `pnpm nx build ui` — library builds with no TypeScript errors
- [ ] `pnpm nx serve docs` — dev server starts
- [ ] Navigate to `/docs/marquee` — page loads with top+bottom borders visible, items scroll left
- [ ] Hover over the marquee — animation pauses
- [ ] Reverse section scrolls right-to-left
- [ ] Items in the strips render at `text-4xl` size with horizontal spacing — NOT tiny unstyled text
- [ ] Custom speed section (`duration="8s"`) scrolls noticeably slower than the default 5s
- [ ] Sidebar shows "Marquee" under Components and highlights when active
- [ ] Pagination shows prev ("Button") link correctly
