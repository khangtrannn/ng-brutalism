# Changelog

All notable changes to `@ng-brutalism/ui` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-05-20

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
