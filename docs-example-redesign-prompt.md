# Task: Redesign `docs-example.component.ts` tab layout

## Goal

Update `apps/docs/src/app/docs/docs-example.component.ts` to match the tab structure of the reference implementation at https://github.com/ekmas/neobrutalism-components/blob/main/src/components/app/component-preview.tsx.

## Design decisions (already agreed)

1. **Tab placement**: Tabs move from floating pill buttons above the box → a full-width tab bar at the TOP of the component, inside the structure.
2. **Structure**: The component is split into two visually connected pieces:
   - A **tab bar** div: `border-2` on top/left/right, **no bottom border** (`border-b-0`), `bg-[var(--nb-secondary-background)]`.
   - A **content box** div: `border-2` on all sides. Contains either the preview or the code block.
   - The **outer wrapper** div carries `shadow-[4px_4px_0_0_var(--nb-shadow)]` so the shadow covers the entire component (tab bar + content box together).
3. **Border width**: `border-2` everywhere for consistency — tab bar, content box, and the tab divider between buttons.
4. **Shadow**: Applied to the **outer wrapper** div so it spans the full component height including the tab bar.
5. **Tab triggers**: Two buttons, side-by-side, each 50% width (`grid grid-cols-2`). Separated by `border-r-2 border-[var(--nb-border)]` on the first button only (no right border on the second). Height: `h-10 sm:h-12`.
   - **Active**: `bg-[var(--nb-main)] text-[var(--nb-main-foreground)]`
   - **Inactive**: transparent background (inherits `bg-[var(--nb-secondary-background)]` from the tab bar container)
6. **Preview area**: Keep the existing `.docs-preview-grid` CSS class and styles completely unchanged.

## New template structure

Replace the entire `template` in the component with:

```html
<div class="shadow-[4px_4px_0_0_var(--nb-shadow)]">
  <!-- Tab bar: border on top/left/right only, no bottom border -->
  <div class="grid grid-cols-2 border-2 border-b-0 border-[var(--nb-border)] bg-[var(--nb-secondary-background)]">
    <button
      type="button"
      class="h-10 sm:h-12 text-sm sm:text-base font-bold border-r-2 border-[var(--nb-border)] transition-colors"
      [class.bg-[var(--nb-main)]]="activeTab() === 'preview'"
      [class.text-[var(--nb-main-foreground)]]="activeTab() === 'preview'"
      (click)="activeTab.set('preview')"
    >
      Preview
    </button>
    <button
      type="button"
      class="h-10 sm:h-12 text-sm sm:text-base font-bold transition-colors"
      [class.bg-[var(--nb-main)]]="activeTab() === 'code'"
      [class.text-[var(--nb-main-foreground)]]="activeTab() === 'code'"
      (click)="activeTab.set('code')"
    >
      Code
    </button>
  </div>

  <!-- Content box: border on all sides, no shadow (shadow is on outer wrapper) -->
  <div class="border-2 border-[var(--nb-border)]">
    @if (activeTab() === 'preview') {
      <div
        class="docs-preview-grid flex min-h-[200px] items-center justify-center px-5 py-10 sm:px-10 sm:py-20"
      >
        <ng-content />
      </div>
    } @else {
      <docs-code-block variant="embedded" [code]="code()" />
    }
  </div>
</div>
```

## Styles to keep unchanged

The existing `styles` array in the component contains `.docs-preview-grid` — do **not** remove or modify it:

```ts
styles: [
  `
    .docs-preview-grid {
      border: 2px solid;
      background-color: var(--nb-surface);
      background-image: linear-gradient(
          rgba(128, 128, 128, 0.3) 1px,
          transparent 1px
        ),
        linear-gradient(90deg, rgba(128, 128, 128, 0.3) 1px, transparent 1px);
      background-size: 40px 40px;
    }
  `,
],
```

## What to remove

- The old outer wrapper `<div class="border-4 border-[var(--nb-border)] bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]">` container is gone — replaced by the three-part structure above (outer shadow wrapper → tab bar → content box).
- The old pill button tabs (with `mb-2 flex gap-1` wrapper div) are gone — replaced by the grid tab bar.
- No changes needed to imports, `code` input, `activeTab` signal, `DocsCodeBlockComponent` import, or `changeDetection`.

## Files to read for context

- `apps/docs/src/app/docs/docs-example.component.ts` — file to modify
- `apps/docs/src/styles.css` — confirms available utility classes
