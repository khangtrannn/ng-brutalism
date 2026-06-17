---
name: ng-brutalism
description: Build loud, token-driven, Angular-first brutalist UIs using composition primitives. USE WHEN the user wants to use ng-brutalism UI components, compose layouts, or build brutalist web apps.
metadata:
  version: 1.0.0
  author: Henrique Custódia
---

# `ng-brutalism`

This skill provides instructions on how to use `ng-brutalism`, an Angular UI component library designed around neo-brutalist aesthetics and primitive-based composition.

**IMPORTANT: Progressive Disclosure**
This document outlines the core mental model and the available components. **You must not guess the API or HTML structure of a component.** When you decide to use a specific component or composition pattern, **ALWAYS use `view_file` to read its detailed documentation in the `references/` directory** located alongside this file before implementing it.

---

## 1. The Mental Model

`ng-brutalism` replaces class soup (like Tailwind utility spam) with semantic, token-driven composition primitives. Every primitive does one job well.

- **`nbSurface`**: The brutalist panel (the base container).
- **`nbSection`**: Regions inside a panel (e.g., header, body, footer).
- **`nbStack`**: Vertical content flow and spacing.
- **`nbCluster`**: Horizontal or wrapping content flow.
- **`nbSplit`**: Two-column or main/aside layouts.
- **Actions**: `nbButton`, `nbIconButton`.
- **Metadata**: `nbChip`, `nbBadge`.
- **Typography**: `nbTitle`, `nbDisplay`, `nbText`.
- **Status**: `nbStatusDot`, `nbCallout`.

### Shared API Language

Every primitive in `ng-brutalism` speaks the same token vocabulary. The following attributes are universally used across the library:
- **`tone`**: Visual intent / color theme (e.g., `primary`, `secondary`, `cream`, `yellow`, `mint`, `pink`, `lavender`).
- **`size`**: Component scale (`sm`, `md`, `lg`, `xl`).
- **`radius`**: Corner shape (`none`, `sm`, `md`, `lg`, `xl`, `full`).
- **`shadow`**: Brutalist offset depth (`none`, `sm`, `default`, `hard`, `heavy`).
- **`border`**: Outline strength (`none`, `thin`, `default`, `strong`, `thick`).
- **`padding`**: Internal space (`none`, `sm`, `md`, `lg`, `xl`).
- **`gap`**: Child spacing in flex containers (`none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`).
- **`align`**: Cross-axis alignment (`start`, `center`, `end`, `stretch`).
- **`justify`**: Main-axis alignment (`start`, `center`, `end`, `between`, `around`).
- **`clip`**: Keep inner regions inside the outer radius (used on `nbSurface`).
- **`divider`**: Border between regions (used on `nbSection` - `top`, `bottom`, etc.).

---

## 2. Component Reference Directory

When implementing any of the following components, **read the corresponding reference file first** to understand its exact API, inputs, and template usage examples.

### Getting Started
- Installation & Setup: `references/installation.md`

### Layout & Composition Primitives
*Read these to understand how to build complex layouts.*
- `nbSurface` & `nbSection`: `references/surface-and-section.md`
- `nbStack` & `nbCluster`: `references/stack-and-cluster.md`
- Split Layouts: `references/split-layouts.md`
- Common Patterns: `references/common-patterns.md`
- Composition Overview: `references/overview.md`

### UI Components
*Use `view_file` on the corresponding path before using the component.*

**Containers & Layout**
- `nbSurface`: `references/surface.md`
- `nbSection`: `references/section.md`
- `nbStack`: `references/stack.md`
- `nbCluster`: `references/cluster.md`
- `nbSplit`: `references/split.md`
- `nbCard`: `references/card.md`
- `nbImageCard`: `references/image-card.md`
- `nbMediaFrame`: `references/media-frame.md`
- `nbMediaItem`: `references/media-item.md`

**Typography & Display**
- `nbTitle`: `references/title.md`
- `nbDisplay`: `references/display.md`
- `nbText`: `references/text.md`
- `nbMarquee`: `references/marquee.md`
- `nbHalftone`: `references/halftone.md`
- `nbSeparator`: `references/separator.md`
- `nbIcon`: `references/icon.md`

**Actions & Inputs**
- `nbButton`: `references/button.md`
- `nbIconButton`: `references/icon-button.md`
- `nbInput`: `references/input.md`
- `nbInputGroup`: `references/input-group.md`
- `nbTextarea`: `references/textarea.md`
- `nbCheckbox`: `references/checkbox.md`
- `nbSelect`: `references/select.md`
- `nbLabel`: `references/label.md`

**Data Display & Feedback**
- `nbChip`: `references/chip.md`
- `nbBadge`: `references/badge.md`
- `nbAvatar`: `references/avatar.md`
- `nbAvatarGroup`: `references/avatar-group.md`
- `nbCallout`: `references/callout.md`
- `nbDialog`: `references/dialog.md`
- `nbAccordion`: `references/accordion.md`
- `nbProgress`: `references/progress.md`
- `nbRating`: `references/rating.md`
- `nbStat`: `references/stat.md`
- `nbStatusDot`: `references/status-dot.md`
- `nbSticker`: `references/sticker.md`

---

## 3. Best Practices for AI Agents

1. **Do not use Tailwind utility classes for structure or theming.** If you need a container, use `nbSurface`. If you need spacing, use `nbStack` or `nbCluster`. The primitives exist so you don't have to write raw classes.
2. **Embrace loud colors.** Use `tone="mint"`, `tone="pink"`, `tone="yellow"`, etc. instead of writing custom CSS or inline styles.
3. **Always refer to the API tables.** The reference markdown files contain tables that show the exact TypeScript types for properties like `radius`, `shadow`, and `padding`. Do not guess these values.
4. **Use Content Projection:** Many components rely heavily on content projection (e.g., passing `nbText` into `nbButton`, or placing `nbTitle` inside `nbSection`). Review the examples in the reference files to see how components compose together.
