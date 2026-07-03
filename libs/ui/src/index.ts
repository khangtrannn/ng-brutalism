// Foundation
export { nbClass } from './lib/core/class';
export { provideNgBrutalism } from './lib/core/provide';
export type { NbConfig } from './lib/core/provide';
export { NB_THEME_CONFIG } from './lib/tokens/theme.tokens';
export type { NbThemeConfig } from './lib/tokens/theme.tokens';
export type { NbTone } from './lib/tokens/tone';

// Shared design tokens — one vocabulary for every primitive's visual grammar.
export type { NbRadius } from './lib/tokens/radius';
export { nbRadiusValue } from './lib/tokens/radius';
export type { NbShadow } from './lib/tokens/shadow';
export { nbShadowValue } from './lib/tokens/shadow';
export type { NbBorderStrength } from './lib/tokens/border';
export { nbBorderWidthValue } from './lib/tokens/border';
export type { NbSpacing } from './lib/tokens/spacing';
export { nbSpacingValue } from './lib/tokens/spacing';
export type { NbPadding } from './lib/tokens/padding';
export { nbPaddingValue } from './lib/tokens/padding';
export type { NbDivider } from './lib/tokens/divider';
export type {
  NbLayoutAlign,
  NbLayoutJustify,
  NbLayoutSeparator,
} from './lib/tokens/layout';
export type {
  NbFontWeight,
  NbTypographyFont,
  NbUnderlineVariant,
  NbUnderlineGap,
  NbUnderlineWidth,
} from './lib/tokens/typography';
export {
  nbTypographyFontValue,
  nbUnderlineGapValue,
  nbUnderlineWidthValue,
} from './lib/tokens/typography';

// Angular private internals — exported only because Angular requires classes
// referenced by `hostDirectives` to be reachable from the package entrypoint
// (NG3001). These ɵ-prefixed names are not public API and must not be imported
// by application code; compose public primitives such as nbSurface/nbButton.
export {
  NbToneCapability as ɵNbToneCapability,
  NbUnderlineCapability as ɵNbUnderlineCapability,
  NbResetMarginCapability as ɵNbResetMarginCapability,
} from './lib/core/capabilities';

// Components
export { NbCheckbox } from './lib/checkbox';
export type { NbCheckboxSize } from './lib/checkbox';
export {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
} from './lib/accordion';
export type { NbAccordionType, NbAccordionValue } from './lib/accordion';
export { NbButton } from './lib/button';
export type {
  NbButtonIconPush,
  NbButtonIconShape,
  NbButtonIconSize,
  NbButtonIconTone,
  NbButtonRadius,
  NbButtonShadow,
  NbButtonPress,
  NbButtonSize,
  NbButtonTone,
} from './lib/button';
export {
  NbCard,
  NbCardHeader,
  NbCardTitle,
  NbCardDescription,
  NbCardActions,
  NbCardContent,
  NbCardFooter,
} from './lib/card';
export type {
  NbCardActionsAlign,
  NbCardBorder,
  NbCardRadius,
  NbCardShadow,
  NbCardTone,
} from './lib/card';
export { NbImageCard, NbImageCardCaption } from './lib/image-card';
export type {
  NbImageCardBorder,
  NbImageCardRadius,
  NbImageCardShadow,
  NbImageCardTone,
} from './lib/image-card';
export { NbMarquee, NbMarqueeItem } from './lib/marquee';
export { NbInput } from './lib/input';
export { NbLabel } from './lib/label';
export { NbTitle } from './lib/title';
export { NbDisplay } from './lib/display';
export type {
  NbDisplayLeading,
  NbDisplaySize,
  NbDisplayTracking,
  NbDisplayUnderline,
  NbDisplayWeight,
} from './lib/display';
export { NbTypography } from './lib/typography';
export { NbSeparator } from './lib/separator';
export type {
  NbSeparatorOrientation,
  NbSeparatorVariant,
} from './lib/separator';
export type { NbInputSize } from './lib/input';
export { NbTextarea } from './lib/textarea';
export type { NbTextareaSize } from './lib/textarea';
export { NbInputGroup, NbInputPrefix, NbInputSuffix } from './lib/input-group';
export type { NbInputPrefixAlign, NbInputSuffixAlign } from './lib/input-group';
export { NbNativeSelect, NbSelect, NbSelectOption } from './lib/select';
export type { NbSelectValue } from './lib/select';
export { NbBadge } from './lib/badge';
export type {
  NbBadgeBorder,
  NbBadgeRadius,
  NbBadgeShadow,
  NbBadgeTone,
} from './lib/badge';
export { NbAvatar } from './lib/avatar';
export type {
  NbAvatarBorder,
  NbAvatarRadius,
  NbAvatarShadow,
  NbAvatarTone,
} from './lib/avatar';
export { NbMediaFrame } from './lib/media-frame';
export type {
  NbMediaFrameFit,
  NbMediaFrameRadius,
  NbMediaFrameRatio,
  NbMediaFrameShadow,
  NbMediaFrameTone,
  NbMediaFrameBorder,
} from './lib/media-frame';
export { NbStat } from './lib/stat';
export { NbRating } from './lib/rating';
export {
  NbDialog,
  NbDialogTitle,
  NbDialogDescription,
  NbDialogContent,
  NbDialogActions,
  NbDialogClose,
} from './lib/dialog';
export { NbStatusDot } from './lib/status-dot';
export type { NbStatusDotState } from './lib/status-dot';
export { NbChip, NbChipGroup } from './lib/chip';
export type {
  NbChipTone,
  NbChipPadding,
  NbChipGroupAlign,
  NbChipGroupDirection,
} from './lib/chip';
export { NbIconButton } from './lib/icon-button';
export type { NbIconButtonShape, NbIconButtonSize } from './lib/icon-button';
export { NbButtonTrailingIcon } from './lib/button/nb-button-trailing-icon';
export { NbProgress } from './lib/progress';
export { NbAvatarGroup } from './lib/avatar-group';
export { NbSticker, NbStickerFace } from './lib/sticker';
export type { NbStickerShape, NbStickerTone } from './lib/sticker';
export { NbHalftone } from './lib/halftone';
export type { NbHalftoneShape } from './lib/halftone';
export { NbSurface } from './lib/surface';
export type {
  NbSurfaceBorder,
  NbSurfaceEdge,
  NbSurfaceLayout,
  NbSurfacePadding,
  NbSurfaceRadius,
  NbSurfaceShadow,
  NbSurfaceSize,
  NbSurfaceTone,
} from './lib/surface';
export { NbStack } from './lib/stack';
export type {
  NbStackAlign,
  NbStackGap,
  NbStackJustify,
  NbStackSeparator,
} from './lib/stack';
export { NbCluster } from './lib/cluster';
export type {
  NbClusterAlign,
  NbClusterGap,
  NbClusterJustify,
  NbClusterSeparator,
  NbClusterWrap,
} from './lib/cluster';
export { NbSplit } from './lib/split';
export type {
  NbSplitAlign,
  NbSplitCollapse,
  NbSplitGap,
  NbSplitPadding,
  NbSplitRatio,
  NbSplitSeparator,
} from './lib/split';
export { NbSection } from './lib/section';
export type {
  NbSectionAlign,
  NbSectionDivider,
  NbSectionDividerStyle,
  NbSectionLayout,
  NbSectionPadding,
} from './lib/section';
export { NbCallout } from './lib/callout';
export type {
  NbCalloutLayout,
  NbCalloutShadow,
  NbCalloutSize,
  NbCalloutTone,
} from './lib/callout';
export {
  NbMediaItem,
  NbMediaItemDescription,
  NbMediaItemIcon,
  NbMediaItemTitle,
} from './lib/media-item';
export type {
  NbMediaItemAlign,
  NbMediaItemOrientation,
  NbMediaItemSize,
  NbMediaItemTone,
  NbMediaItemVariant,
} from './lib/media-item';
export { NbText } from './lib/text';
export type {
  NbTextLeading,
  NbTextMeasure,
  NbTextSize,
  NbTextTone,
  NbTextTracking,
  NbTextTransform,
  NbTextWeight,
} from './lib/text';
export { NbIcon } from './lib/icon';
export type { NbIconMode, NbIconSize, NbIconTone } from './lib/icon';
