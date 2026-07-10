import { EnvironmentProviders } from '@angular/core';

declare function provideNgBrutalism(): EnvironmentProviders;

type NbSemanticTone = 'surface' | 'background' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
type NbPaletteTone = 'ink' | 'cream' | 'white' | 'black' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'blue';
type NbTone = NbSemanticTone | NbPaletteTone;

type NbRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
declare function nbRadiusValue(radius: NbRadius): string;

type NbShadow = 'none' | 'sm' | 'md' | 'hard' | 'heavy';
declare function nbShadowValue(shadow: NbShadow): string;

type NbBorderStrength = 'none' | 'thin' | 'md' | 'strong' | 'thick';
declare function nbBorderWidthValue(border: NbBorderStrength): string;

type NbSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
declare function nbSpacingValue(spacing: NbSpacing): string;

type NbPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
declare function nbPaddingValue(padding: NbPadding): string;

type NbDivider = 'none' | 'top' | 'right' | 'bottom' | 'left' | 'block' | 'inline' | 'all';

type NbControlSize = 'sm' | 'md' | 'lg';
type NbSize = 'sm' | 'md' | 'lg' | 'xl';
type NbSizeXs = 'xs' | 'sm' | 'md' | 'lg';

type NbLayoutAlign = 'stretch' | 'start' | 'center' | 'end';
type NbLayoutJustify = 'start' | 'center' | 'end' | 'between';
type NbLayoutSeparator = 'none' | 'solid' | 'dashed' | 'thick';
type NbOrientation = 'horizontal' | 'vertical';

type NbIconShape = 'square' | 'circle';

type NbUnderlineVariant = 'none' | 'bar' | 'wave';
type NbTextTracking = 'tight' | 'normal' | 'wide' | 'wider';
type NbFontWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
type NbTypographyFont = 'inherit' | 'body' | 'display' | 'accent' | 'mono';
declare function nbTypographyFontValue(font: NbTypographyFont): string | null;
type NbUnderlineGap = 'none' | 'xs' | 'sm' | 'md' | 'lg';
type NbUnderlineWidth = 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'full';
declare function nbUnderlineGapValue(gap: NbUnderlineGap): string;
declare function nbUnderlineWidthValue(width: NbUnderlineWidth): string | null;

export { nbBorderWidthValue, nbPaddingValue, nbRadiusValue, nbShadowValue, nbSpacingValue, nbTypographyFontValue, nbUnderlineGapValue, nbUnderlineWidthValue, provideNgBrutalism };
export type { NbBorderStrength, NbControlSize, NbDivider, NbFontWeight, NbIconShape, NbLayoutAlign, NbLayoutJustify, NbLayoutSeparator, NbOrientation, NbPadding, NbPaletteTone, NbRadius, NbSemanticTone, NbShadow, NbSize, NbSizeXs, NbSpacing, NbTextTracking, NbTone, NbTypographyFont, NbUnderlineGap, NbUnderlineVariant, NbUnderlineWidth };
