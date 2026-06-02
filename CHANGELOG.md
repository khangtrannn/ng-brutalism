# Changelog

All notable changes to `@ng-brutalism/ui` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] — upcoming

`v0.2.0` introduces a stronger composition system for building brutalist Angular UIs. The new layout grammar — Surface, Section, Stack, Cluster, and Split — lets you compose full card layouts, multi-column pages, and recipe UIs entirely from library primitives with consistent token-driven spacing, border, shadow, and typography.

### Added

**Composition system**
- `NbSurface` — base brutalist panel directive. Token-driven tone, radius, border, shadow, padding, size, layout, edge, clip, and typography inputs.
- `NbSection` — inner region primitive for Surface. Owns padding, divider side, divider style, layout (default / center / between), align, and flush.
- `NbStack` — vertical rhythm primitive. Gap, align, justify, and separator inputs.
- `NbCluster` — horizontal/wrapping rhythm primitive. Gap, padding, align, justify, wrap, and separator inputs.
- `NbSplit` — two-column main-and-aside primitive. Ratio, gap, padding, collapse (responsive breakpoint), align, and separator inputs.
- `NbMediaFrame` — framed media primitive with aspect ratio locking. Ratios: `auto`, `1/1`, `3/4`, `4/3`, `3/2`, `16/9`, `21/9`.
- `NbText` — inline and block text primitive.
- `NbDisplay` — large headline primitive.
- `NbTitle`, `NbTypography` — typography composition primitives.
- `NbStat` — statistic display primitive.
- `NbRating` — star rating primitive.
- `NbProgress` — progress bar primitive.
- `NbStatusDot` — status indicator primitive with size and radius inputs.
- `NbCallout` — inline callout/emphasis primitive.
- `NbMediaItem` — icon + label pair primitive.
- `NbAvatar`, `NbAvatarGroup` — avatar and avatar stack primitives.
- `NbChip`, `NbChipGroup` — tag/badge primitive with tone, padding, and group layout.
- `NbIconButton` — icon-only button primitive.
- `NbSticker` — decorative burst/shape primitive.
- `NbHalftone` — decorative halftone pattern primitive.
- `NbSeparator` — divider line primitive.

**Recipes**
- Travel Card — media, sticker, display, split, cluster composition recipe.
- Podcast Card — audio episode card composition recipe.
- Open to Work Card — professional profile card composition recipe.

**Shared token vocabulary**
- Unified `NbBorderStrength`, `NbShadow`, `NbRadius`, `NbSpacing`, `NbPadding`, `NbToneToken` across all composition primitives.
- `NbTypographyFont` — font role contract used by `NbTypography` and `NbSurface`.
- `NbMediaFrameRatio` — now includes `'3/4'` portrait ratio.

### Breaking Changes (pre-publish, still 0.x)

- **Class names**: `Component`/`Directive` suffix dropped. `NbCardComponent` → `NbCard`, `NbButtonDirective` → `NbButton`, `NbSelectComponent` → `NbSelect`, `NbAccordionComponent` → `NbAccordion`, etc.
- **`defaultValue` removed from `<nb-accordion>`**: use `[value]="..."` for one-way initial value or `[(value)]` for two-way binding.
- **`defaultValue` and `defaultOpen` removed from `<nb-select>`**: use `[value]` / `[(value)]` and `[open]` / `[(open)]` respectively.
- **`NbSection` `border` input renamed to `divider`**: `border="bottom"` → `divider="bottom"`. Separates the region-border concept from the outline-strength `border` input used everywhere else.

### Internal

- Async code highlighting migrated to `resource()` (Angular 21 stable API).
- Router navigation state in navbar, docs-shell, and TOC migrated to `toSignal()`.
- Portfolio typewriter animation and greeting cycle migrated to `toObservable + switchMap`.
- Portfolio journey map sync migrated to `toObservable + subscribe`.
- Event handlers renamed to reflect actions rather than triggering events.

## [0.1.2] — 2026-05-23

### Changed

- npm package `description` rewritten to lead with "neo-brutalist Angular UI library" and include "brutalist Angular components" and `ng add @ng-brutalism/ui` (T1/T2 keyword alignment).
- npm `keywords`: added `ngbrutalism`, `ng-add`, `schematics`; removed generic `ui` and redundant `tailwind`.

> Patch motivation: `@ng-brutalism/ui` was absent from npm's search index even for exact-name queries. Publishing a new version fires the registry event that triggers the search crawler.

## [0.1.1] — 2026-05-21

### Fixed

- Ensure Tailwind v4 scans the packaged library bundle so component utility classes are generated in consumer apps.

## [0.1.0] — 2026-05-21

Initial public release.

### Added

**Form controls**
- `NbButton`
- `NbCheckbox`
- `NbInput`
- `NbInputGroup`
- `NbLabel`
- `NbNativeSelect` (directive on native `<select>`)
- `NbSelect` (custom select component)
- `NbTextarea`

**Layout & content**
- `NbAccordion`
- `NbAvatar`
- `NbBadge`
- `NbCard`
- `NbImageCard`
- `NbMarquee`
- `NbTitle`

**Overlays**
- `NbDialog`

**Foundation**
- MIT license, Angular 21 + Tailwind v4 peer dependencies
- `styles.css` single-import entrypoint (default theme)
- `theme.css` token-only entrypoint for advanced theming
- Optional `provideNgBrutalism()` provider
- CSS custom properties as the primary theming surface

**Notes**
- Pre-1.0: minor versions may include breaking changes while APIs settle.
