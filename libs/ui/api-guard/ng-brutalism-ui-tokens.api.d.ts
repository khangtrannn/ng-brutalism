import { EnvironmentProviders } from '@angular/core';

/**
 * Registers ng-brutalism environment providers. Theming is CSS-only — redefine
 * the `--nb-*` custom properties in your own stylesheet (or swap in one of the
 * `theme-*.css` presets) rather than configuring theme values here. This
 * function is the reserved home for future runtime config (default tone,
 * density, a11y flags).
 */
declare function provideNgBrutalism(): EnvironmentProviders;

/**
 * Documented, stable tones. These map to role-based tokens (`--nb-primary`,
 * `--nb-surface`, …) that a rebrand is expected to redefine — the safe tier
 * for a consumer to build on.
 */
type NbSemanticTone = 'surface' | 'background' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
/**
 * The brutalist palette tier — named colors (`yellow`, `pink`, …) and the
 * ink/paper extremes. These describe a specific hue rather than a role, so a
 * rebrand may reinterpret or drop them; treat them as decorative, not
 * load-bearing.
 */
type NbPaletteTone = 'ink' | 'cream' | 'white' | 'black' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'blue';
type NbTone = NbSemanticTone | NbPaletteTone;

/**
 * Shared brutalist radius scale. One geometry per token across all primitives —
 * the single source of truth that internal radius capabilities resolve against.
 *
 * Named input values are deterministic. Theme-driven radius comes from
 * component defaults and scoped public tokens such as `--nb-button-radius`.
 */
type NbRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
declare function nbRadiusValue(radius: NbRadius): string;

type NbShadow = 'none' | 'sm' | 'default' | 'hard' | 'heavy';
declare function nbShadowValue(shadow: NbShadow): string;

type NbBorderStrength = 'none' | 'thin' | 'default' | 'strong' | 'thick';
declare function nbBorderWidthValue(border: NbBorderStrength): string;

type NbSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
declare function nbSpacingValue(spacing: NbSpacing): string;

type NbPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
declare function nbPaddingValue(padding: NbPadding): string;

/**
 * Divider line placement between layout regions. Distinct from `border`
 * (outline strength): `divider` describes *which side(s)* carry a separating
 * line, while `border` describes *how thick* an element's outline is.
 */
type NbDivider = 'none' | 'top' | 'right' | 'bottom' | 'left' | 'block' | 'inline' | 'all';

/**
 * Shared layout vocabulary for composition primitives. These are type
 * contracts only: each primitive's CSS still owns what the values mean for its
 * own layout model.
 */
type NbLayoutAlign = 'stretch' | 'start' | 'center' | 'end';
type NbLayoutJustify = 'start' | 'center' | 'end' | 'between';
type NbLayoutSeparator = 'none' | 'solid' | 'dashed' | 'thick';

/**
 * Shared typography vocabulary. One source of truth for the font-weight scale,
 * the font-role contract, underline customization, and the text-tracking scale
 * so a token means the same thing across nbText / nbDisplay / nbTypography /
 * nbChipGroup.
 */
/**
 * Shared underline variant used by both nbText and nbDisplay.
 * `NbTextUnderline` and `NbDisplayUnderline` are public aliases of this type.
 */
type NbUnderlineVariant = 'none' | 'bar' | 'wave';
/**
 * Letter-spacing scale shared by nbText and nbChipGroup.
 * Exported publicly as `NbTextTracking` from the text barrel.
 */
type NbTextTracking = 'tight' | 'normal' | 'wide' | 'wider';
/** Font-weight scale shared by nbText and nbDisplay. */
type NbFontWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
/**
 * Font-role contract. The API picks a *role*; the role maps to a CSS token that
 * defines the actual stack, so theming/customization stays in CSS and templates
 * keep type safety. Each role falls back to the sans stack when its token is
 * unset. `inherit` writes nothing so the element keeps its inherited font.
 */
type NbTypographyFont = 'inherit' | 'body' | 'display' | 'accent' | 'mono';
declare function nbTypographyFontValue(font: NbTypographyFont): string | null;
/**
 * Underline customization shared by nbText / nbDisplay `underline="bar"|"wave"`.
 * Resolves input values for the public `--nb-underline-gap` /
 * `--nb-underline-width` hooks that the underline CSS already reads. `auto`
 * leaves the CSS default in place. Color and thickness remain token-driven
 * (`--nb-underline-color`, `--nb-underline-height`) for the rarer
 * brand-specific cases.
 */
type NbUnderlineGap = 'none' | 'xs' | 'sm' | 'md' | 'lg';
type NbUnderlineWidth = 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'full';
declare function nbUnderlineGapValue(gap: NbUnderlineGap): string;
declare function nbUnderlineWidthValue(width: NbUnderlineWidth): string | null;

export { nbBorderWidthValue, nbPaddingValue, nbRadiusValue, nbShadowValue, nbSpacingValue, nbTypographyFontValue, nbUnderlineGapValue, nbUnderlineWidthValue, provideNgBrutalism };
export type { NbBorderStrength, NbDivider, NbFontWeight, NbLayoutAlign, NbLayoutJustify, NbLayoutSeparator, NbPadding, NbPaletteTone, NbRadius, NbSemanticTone, NbShadow, NbSpacing, NbTextTracking, NbTone, NbTypographyFont, NbUnderlineGap, NbUnderlineVariant, NbUnderlineWidth };
