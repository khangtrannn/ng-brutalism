# Changelog

All notable changes to `@ng-brutalism/ui` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking Changes (pre-publish, still 0.x)

- **Class names**: `Component`/`Directive` suffix dropped. `NbCardComponent` → `NbCard`, `NbButtonDirective` → `NbButton`, `NbSelectComponent` → `NbSelect`, `NbAccordionComponent` → `NbAccordion`, etc.
- **`defaultValue` removed from `<nb-accordion>`**: use `[value]="..."` for one-way initial value or `[(value)]` for two-way binding.
- **`defaultValue` and `defaultOpen` removed from `<nb-select>`**: use `[value]` / `[(value)]` and `[open]` / `[(open)]` respectively.

### Internal

- Async code highlighting migrated to `resource()` (Angular 21 stable API).
- Router navigation state in navbar, docs-shell, and TOC migrated to `toSignal()`.
- Portfolio typewriter animation and greeting cycle migrated to `toObservable + switchMap`.
- Portfolio journey map sync migrated to `toObservable + subscribe`.
- Event handlers renamed to reflect actions rather than triggering events.

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
