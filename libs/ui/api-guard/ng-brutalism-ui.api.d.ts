import { NbTone, NbUnderlineVariant, NbUnderlineGap, NbUnderlineWidth, NbControlSize, NbSizeXs, NbIconShape, NbRadius, NbShadow, NbSize, NbBorderStrength, NbLayoutAlign, NbFontWeight, NbTypographyFont, NbOrientation, NbLayoutSeparator, NbTextTracking, NbSpacing, NbPadding, NbLayoutJustify, NbDivider } from '@ng-brutalism/ui/tokens';
export { NbBorderStrength, NbControlSize, NbDivider, NbFontWeight, NbIconShape, NbLayoutAlign, NbLayoutJustify, NbLayoutSeparator, NbOrientation, NbPadding, NbPaletteTone, NbRadius, NbSemanticTone, NbShadow, NbSize, NbSizeXs, NbSpacing, NbTextTracking, NbTone, NbTypographyFont, NbUnderlineGap, NbUnderlineVariant, NbUnderlineWidth, nbBorderWidthValue, nbPaddingValue, nbRadiusValue, nbShadowValue, nbSpacingValue, nbTypographyFontValue, nbUnderlineGapValue, nbUnderlineWidthValue, provideNgBrutalism } from '@ng-brutalism/ui/tokens';
import * as _angular_core from '@angular/core';
import { Signal } from '@angular/core';
import * as _ng_brutalism_ui from '@ng-brutalism/ui';
import { ControlValueAccessor } from '@angular/forms';

declare class NbToneCapability {
    readonly tone: _angular_core.InputSignal<NbTone | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbToneCapability, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbToneCapability, "[nbToneCapability]", never, { "tone": { "alias": "tone"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class NbUnderlineCapability {
    readonly underline: _angular_core.InputSignal<NbUnderlineVariant>;
    readonly underlineGap: _angular_core.InputSignal<NbUnderlineGap | undefined>;
    readonly underlineWidth: _angular_core.InputSignal<NbUnderlineWidth | undefined>;
    protected readonly underlineAttr: _angular_core.Signal<"bar" | "wave" | null>;
    readonly gap: _angular_core.Signal<string | null>;
    readonly width: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbUnderlineCapability, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbUnderlineCapability, "[nbUnderlineCapability]", never, { "underline": { "alias": "underline"; "required": false; "isSignal": true; }; "underlineGap": { "alias": "underlineGap"; "required": false; "isSignal": true; }; "underlineWidth": { "alias": "underlineWidth"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class NbResetMarginCapability {
    readonly reset: _angular_core.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbResetMarginCapability, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbResetMarginCapability, "[nbResetMarginCapability]", never, { "reset": { "alias": "reset"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class NbCheckbox {
    readonly size: _angular_core.InputSignal<_ng_brutalism_ui.NbControlSize>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbRadius | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCheckbox, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbCheckbox, "input[nbCheckbox]", ["nbCheckbox"], { "size": { "alias": "size"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

type NbCheckboxSize = NbControlSize;

declare class NbAccordionItem {
    #private;
    readonly triggerId: string;
    readonly contentId: string;
    readonly value: _angular_core.InputSignal<string>;
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbBorderStrength | null | undefined>;
    readonly open: _angular_core.Signal<boolean>;
    toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbAccordionItem, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbAccordionItem, "nb-accordion-item", ["nbAccordionItem"], { "value": { "alias": "value"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

declare class NbAccordionTrigger {
    #private;
    readonly item: NbAccordionItem;
    private readonly button;
    focus(): void;
    protected onKeydown(event: KeyboardEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbAccordionTrigger, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbAccordionTrigger, "nb-accordion-trigger", ["nbAccordionTrigger"], {}, {}, never, ["*"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

type NbAccordionType = 'single' | 'multiple';
type NbAccordionValue = string | string[] | null;
interface NbAccordionController {
    isItemOpen(value: string): boolean;
    toggleItem(value: string): void;
    focusPreviousTrigger(current: NbAccordionTrigger): void;
    focusNextTrigger(current: NbAccordionTrigger): void;
    focusFirstTrigger(): void;
    focusLastTrigger(): void;
}

declare class NbAccordion implements NbAccordionController {
    readonly type: _angular_core.InputSignal<NbAccordionType>;
    readonly collapsible: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly value: _angular_core.ModelSignal<NbAccordionValue>;
    readonly items: _angular_core.Signal<readonly NbAccordionItem[]>;
    readonly triggers: _angular_core.Signal<readonly NbAccordionTrigger[]>;
    isItemOpen(value: string): boolean;
    toggleItem(value: string): void;
    private toggleMultipleItem;
    focusPreviousTrigger(current: NbAccordionTrigger): void;
    focusNextTrigger(current: NbAccordionTrigger): void;
    focusFirstTrigger(): void;
    focusLastTrigger(): void;
    private focusRelativeTrigger;
    private enabledTriggers;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbAccordion, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbAccordion, "nb-accordion", ["nbAccordion"], { "type": { "alias": "type"; "required": false; "isSignal": true; }; "collapsible": { "alias": "collapsible"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, ["items", "triggers"], ["*"], true, never>;
}

declare class NbAccordionContent {
    protected readonly item: NbAccordionItem;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbAccordionContent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbAccordionContent, "nb-accordion-content", ["nbAccordionContent"], {}, {}, never, ["*"], true, never>;
}

type NbIconSize = NbSizeXs | 'xl';
type NbIconTone = 'current' | 'default' | 'muted' | 'inverse' | 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning';
type NbIconMode = 'mask' | 'image';
declare class NbIcon {
    readonly src: _angular_core.InputSignal<string>;
    readonly mode: _angular_core.InputSignal<NbIconMode>;
    readonly size: _angular_core.InputSignal<NbIconSize>;
    readonly tone: _angular_core.InputSignal<NbIconTone | undefined>;
    readonly decorative: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly label: _angular_core.InputSignal<string | null>;
    private hasWarnedAboutMissingA11y;
    protected readonly toneValue: _angular_core.Signal<string | null>;
    protected readonly srcValue: _angular_core.Signal<string>;
    protected readonly isMaskMode: _angular_core.Signal<boolean>;
    protected readonly isImageMode: _angular_core.Signal<boolean>;
    protected readonly roleValue: _angular_core.Signal<"img" | null>;
    protected readonly ariaHiddenValue: _angular_core.Signal<"true" | null>;
    protected readonly ariaLabelValue: _angular_core.Signal<string | null>;
    protected readonly backgroundImageValue: _angular_core.Signal<string | null>;
    protected readonly maskImageValue: _angular_core.Signal<string | null>;
    constructor();
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbIcon, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbIcon, "[nbIcon]", ["nbIcon"], { "src": { "alias": "src"; "required": true; "isSignal": true; }; "mode": { "alias": "mode"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "decorative": { "alias": "decorative"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbButtonTone = NbTone;
type NbButtonShadow = NbShadow;
type NbButtonPress = 'push' | 'reverse' | 'none';
type NbButtonSize = NbSize;
type NbButtonRadius = NbRadius;
type NbButtonIconSize = NbControlSize;
type NbButtonIconShape = NbIconShape | 'none';
type NbButtonIconTone = Extract<NbIconTone, 'default' | 'inverse' | 'current'>;
type NbButtonIconPush = 'none' | 'end';

declare class NbButton {
    readonly press: _angular_core.InputSignal<NbButtonPress>;
    readonly size: _angular_core.InputSignal<_ng_brutalism_ui.NbSize>;
    readonly fullWidth: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbBorderStrength | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbButton, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbButton, "button[nbButton], a[nbButton]", ["nbButton"], { "press": { "alias": "press"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "fullWidth": { "alias": "fullWidth"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

declare class NbButtonTrailingIcon {
    readonly size: _angular_core.InputSignal<_ng_brutalism_ui.NbControlSize | undefined>;
    readonly shape: _angular_core.InputSignal<NbButtonIconShape | undefined>;
    readonly tone: _angular_core.InputSignal<NbButtonIconTone | undefined>;
    readonly push: _angular_core.InputSignal<NbButtonIconPush>;
    readonly icon: _angular_core.InputSignal<string | undefined>;
    protected readonly sizeVal: _angular_core.Signal<string | null>;
    protected readonly iconSize: _angular_core.Signal<NbIconSize>;
    protected readonly radiusVal: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbButtonTrailingIcon, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbButtonTrailingIcon, "[nbButtonTrailingIcon]", ["nbButtonTrailingIcon"], { "size": { "alias": "size"; "required": false; "isSignal": true; }; "shape": { "alias": "shape"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "push": { "alias": "push"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

type NbCardActionsAlign = Extract<NbLayoutAlign, 'start' | 'end'>;
type NbCardTone = NbTone;
type NbCardRadius = NbRadius;
type NbCardShadow = NbShadow;
type NbCardBorder = NbBorderStrength;
declare class NbCard {
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, NbBorderStrength | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCard, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbCard, "nb-card", ["nbCard"], { "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}
declare class NbCardHeader {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCardHeader, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbCardHeader, "nb-card-header", ["nbCardHeader"], {}, {}, never, ["*"], true, never>;
}
declare class NbCardTitle {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCardTitle, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbCardTitle, "nb-card-title", ["nbCardTitle"], {}, {}, never, ["*"], true, never>;
}
declare class NbCardDescription {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCardDescription, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbCardDescription, "nb-card-description", ["nbCardDescription"], {}, {}, never, ["*"], true, never>;
}
declare class NbCardActions {
    readonly align: _angular_core.InputSignal<NbCardActionsAlign>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCardActions, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbCardActions, "nb-card-actions", ["nbCardActions"], { "align": { "alias": "align"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
declare class NbCardContent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCardContent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbCardContent, "nb-card-content", ["nbCardContent"], {}, {}, never, ["*"], true, never>;
}
declare class NbCardFooter {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCardFooter, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbCardFooter, "nb-card-footer", ["nbCardFooter"], {}, {}, never, ["*"], true, never>;
}

type NbImageCardTone = NbTone;
type NbImageCardRadius = NbRadius;
type NbImageCardShadow = NbShadow;
type NbImageCardBorder = NbBorderStrength;
declare class NbImageCard {
    readonly image: _angular_core.InputSignal<string>;
    readonly alt: _angular_core.InputSignal<string>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, NbBorderStrength | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbImageCard, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbImageCard, "nb-image-card", ["nbImageCard"], { "image": { "alias": "image"; "required": true; "isSignal": true; }; "alt": { "alias": "alt"; "required": true; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, ["nb-image-card-caption"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}
declare class NbImageCardCaption {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbImageCardCaption, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbImageCardCaption, "nb-image-card-caption", ["nbImageCardCaption"], {}, {}, never, ["*"], true, never>;
}

declare class NbMarquee {
    #private;
    readonly duration: _angular_core.InputSignal<string>;
    readonly reverse: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly pauseOnHover: _angular_core.InputSignalWithTransform<boolean, unknown>;
    private readonly wrapper;
    private readonly strip1;
    private readonly strip2;
    protected readonly scaledDuration: _angular_core.Signal<string>;
    constructor();
    private syncSecondStrip;
    private updateAnimationScale;
    private durationToMs;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbMarquee, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbMarquee, "nb-marquee", ["nbMarquee"], { "duration": { "alias": "duration"; "required": false; "isSignal": true; }; "reverse": { "alias": "reverse"; "required": false; "isSignal": true; }; "pauseOnHover": { "alias": "pauseOnHover"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class NbMarqueeItem {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbMarqueeItem, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbMarqueeItem, "nb-marquee-item", ["nbMarqueeItem"], {}, {}, never, ["*"], true, never>;
}

type NbInputTone = NbTone;
type NbInputBorder = NbBorderStrength;
type NbInputRadius = NbRadius;
type NbInputShadow = NbShadow;
declare class NbInput {
    #private;
    readonly size: _angular_core.InputSignal<_ng_brutalism_ui.NbControlSize>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, NbBorderStrength | null | undefined>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly id: _angular_core.InputSignal<string | undefined>;
    protected readonly isInGroup: boolean;
    protected readonly field: _ng_brutalism_ui.NbFieldContext | null;
    protected readonly resolvedId: _angular_core.Signal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbInput, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbInput, "input[nbInput]", ["nbInput"], { "size": { "alias": "size"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "id": { "alias": "id"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

type NbInputSize = NbControlSize;

declare class NbLabel {
    #private;
    readonly for: _angular_core.InputSignal<string | undefined>;
    protected readonly forId: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbLabel, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbLabel, "label[nbLabel]", ["nbLabel"], { "for": { "alias": "for"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

interface NbFieldContext {
    readonly controlId: string;
    readonly describedBy: Signal<string | null>;
    readonly invalid: Signal<boolean>;
    readonly required: Signal<boolean>;
}

declare class NbField implements NbFieldContext {
    #private;
    readonly controlId: string;
    private readonly ngControl;
    private readonly description;
    private readonly error;
    readonly invalid: _angular_core.Signal<boolean>;
    readonly required: _angular_core.Signal<boolean>;
    readonly describedBy: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbField, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbField, "nb-field", ["nbField"], {}, {}, ["ngControl", "description", "error"], ["*"], true, never>;
}

declare class NbFieldDescription {
    #private;
    readonly id: string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbFieldDescription, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbFieldDescription, "[nbFieldDescription]", ["nbFieldDescription"], {}, {}, never, never, true, never>;
}

declare class NbFieldError {
    #private;
    protected readonly field: _ng_brutalism_ui.NbFieldContext | null;
    readonly id: string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbFieldError, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbFieldError, "[nbFieldError]", ["nbFieldError"], {}, {}, never, never, true, never>;
}

declare class NbTitle {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbTitle, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbTitle, "[nbTitle]", ["nbTitle"], {}, {}, never, never, true, never>;
}

type NbDisplaySize = NbSize;
type NbDisplayWeight = NbFontWeight;
type NbDisplayTracking = 'normal' | 'tight' | 'tighter';
type NbDisplayLeading = 'none' | 'tight' | 'display';
type NbDisplayUnderline = NbUnderlineVariant;
declare class NbDisplay {
    #private;
    readonly size: _angular_core.InputSignal<NbSize>;
    readonly weight: _angular_core.InputSignal<NbFontWeight>;
    readonly fluid: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly tracking: _angular_core.InputSignal<NbDisplayTracking>;
    readonly leading: _angular_core.InputSignal<NbDisplayLeading>;
    protected readonly underlineGapStyle: _angular_core.Signal<string | null>;
    protected readonly underlineWidthStyle: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbDisplay, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbDisplay, "[nbDisplay]", ["nbDisplay"], { "size": { "alias": "size"; "required": false; "isSignal": true; }; "weight": { "alias": "weight"; "required": false; "isSignal": true; }; "fluid": { "alias": "fluid"; "required": false; "isSignal": true; }; "tracking": { "alias": "tracking"; "required": false; "isSignal": true; }; "leading": { "alias": "leading"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbUnderlineCapability; inputs: { "underline": "underline"; "underlineGap": "underlineGap"; "underlineWidth": "underlineWidth"; }; outputs: {}; }, { directive: typeof NbResetMarginCapability; inputs: { "reset": "reset"; }; outputs: {}; }]>;
}

declare class NbTypography {
    readonly font: _angular_core.InputSignal<NbTypographyFont>;
    protected readonly fontValue: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbTypography, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbTypography, "[nbTypography]", ["nbTypography"], { "font": { "alias": "font"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbSeparatorOrientation = NbOrientation;
type NbSeparatorVariant = Exclude<NbLayoutSeparator, 'none'>;
declare class NbSeparator {
    readonly orientation: _angular_core.InputSignal<NbOrientation>;
    readonly variant: _angular_core.InputSignal<NbSeparatorVariant>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbSeparator, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbSeparator, "hr[nbSeparator]", ["nbSeparator"], { "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class NbTextarea {
    #private;
    readonly size: _angular_core.InputSignal<_ng_brutalism_ui.NbControlSize>;
    readonly tone: _angular_core.InputSignal<NbTone | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbBorderStrength | null | undefined>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbShadow | null | undefined>;
    readonly id: _angular_core.InputSignal<string | undefined>;
    protected readonly isInGroup: boolean;
    protected readonly field: _ng_brutalism_ui.NbFieldContext | null;
    protected readonly resolvedId: _angular_core.Signal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbTextarea, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbTextarea, "textarea[nbTextarea]", ["nbTextarea"], { "size": { "alias": "size"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "id": { "alias": "id"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbTextareaSize = NbControlSize;

interface NbInputGroupContext {
    readonly hasPrefix: Signal<boolean>;
    readonly hasSuffix: Signal<boolean>;
}
type NbInputAffixAlign = 'center' | 'stretch';

declare class NbInputGroup implements NbInputGroupContext {
    private readonly prefixes;
    private readonly suffixes;
    readonly hasPrefix: _angular_core.Signal<boolean>;
    readonly hasSuffix: _angular_core.Signal<boolean>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbRadius | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbInputGroup, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbInputGroup, "nb-input-group", ["nbInputGroup"], { "radius": { "alias": "radius"; "required": false; "isSignal": true; }; }, {}, ["prefixes", "suffixes"], ["*"], true, never>;
}

type NbInputPrefixAlign = NbInputAffixAlign;
declare class NbInputPrefix {
    readonly align: _angular_core.InputSignal<NbInputAffixAlign>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbInputPrefix, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbInputPrefix, "[nbInputPrefix]", ["nbInputPrefix"], { "align": { "alias": "align"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbInputSuffixAlign = NbInputAffixAlign;
declare class NbInputSuffix {
    readonly align: _angular_core.InputSignal<NbInputAffixAlign>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbInputSuffix, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbInputSuffix, "[nbInputSuffix]", ["nbInputSuffix"], { "align": { "alias": "align"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class NbNativeSelect {
    #private;
    readonly tone: _angular_core.InputSignal<NbTone | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbBorderStrength | null | undefined>;
    protected readonly isInGroup: boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbNativeSelect, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbNativeSelect, "select[nbSelect]", ["nbSelect"], { "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbSelectValue = string | number | object;
type NbSelectSize = NbControlSize;
interface NbSelectController {
    readonly isDisabled: () => boolean;
    readonly listboxId: string;
    isSelected(value: NbSelectValue | null): boolean;
    selectOption(option: NbSelectOption): void;
    focusPreviousOption(current: NbSelectOption): void;
    focusNextOption(current: NbSelectOption): void;
    focusFirstOption(): void;
    focusLastOption(): void;
    handleTypeahead(current: NbSelectOption, key: string): void;
    closeOnTab(): void;
    closeAndFocusTrigger(): void;
}

declare class NbSelectOption {
    #private;
    protected readonly select: NbSelectController;
    readonly id: string;
    readonly value: _angular_core.InputSignal<NbSelectValue | null>;
    readonly label: _angular_core.InputSignal<string>;
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    protected readonly selected: _angular_core.Signal<boolean>;
    protected readonly isDisabled: _angular_core.Signal<boolean>;
    protected readonly showIndicator: _angular_core.Signal<boolean>;
    focus(): void;
    selectOptionOnKey(event: KeyboardEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbSelectOption, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbSelectOption, "nb-select-option", ["nbSelectOption"], { "value": { "alias": "value"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

declare class NbSelect implements NbSelectController, ControlValueAccessor {
    #private;
    protected readonly field: _ng_brutalism_ui.NbFieldContext | null;
    protected readonly isInGroup: boolean;
    readonly border: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbBorderStrength | null | undefined>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbShadow | null | undefined>;
    readonly size: _angular_core.InputSignal<_ng_brutalism_ui.NbControlSize>;
    readonly placeholder: _angular_core.InputSignal<string>;
    readonly value: _angular_core.ModelSignal<NbSelectValue | null>;
    readonly compareWith: _angular_core.InputSignal<(a: NbSelectValue | null, b: NbSelectValue | null) => boolean>;
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly isDisabled: _angular_core.Signal<boolean>;
    readonly ariaLabel: _angular_core.InputSignal<string | null>;
    readonly ariaLabelledby: _angular_core.InputSignal<string | null>;
    readonly options: _angular_core.Signal<readonly NbSelectOption[]>;
    private readonly trigger;
    private readonly listboxEl;
    readonly open: _angular_core.ModelSignal<boolean>;
    readonly id: number;
    readonly triggerId: string;
    readonly listboxId: string;
    protected readonly triggerElementId: _angular_core.Signal<string>;
    protected readonly selectedOption: _angular_core.Signal<NbSelectOption | undefined>;
    protected readonly selectedLabel: _angular_core.Signal<string>;
    protected readonly invalid: _angular_core.Signal<boolean>;
    protected readonly required: _angular_core.Signal<boolean>;
    private typeaheadBuffer;
    private typeaheadTimeoutId;
    constructor();
    private onChange;
    private onTouched;
    private positionListbox;
    writeValue(value: NbSelectValue | null): void;
    registerOnChange(fn: (value: NbSelectValue | null) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    isSelected(value: NbSelectValue | null): boolean;
    selectOption(option: NbSelectOption): void;
    toggle(): void;
    openAndFocusOption(): void;
    closeAndFocusTrigger(): void;
    focusPreviousOption(current: NbSelectOption): void;
    focusNextOption(current: NbSelectOption): void;
    focusFirstOption(): void;
    focusLastOption(): void;
    handleTypeahead(current: NbSelectOption, key: string): void;
    closeOnTab(): void;
    openListboxOnKey(event: KeyboardEvent): void;
    closeOnOutsideClick(event: MouseEvent): void;
    private focusRelativeOption;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbSelect, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbSelect, "nb-select", ["nbSelect"], { "border": { "alias": "border"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "compareWith": { "alias": "compareWith"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "aria-label"; "required": false; "isSignal": true; }; "ariaLabelledby": { "alias": "aria-labelledby"; "required": false; "isSignal": true; }; "open": { "alias": "open"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; "open": "openChange"; }, ["options"], ["*"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

type NbBadgeTone = NbTone;
type NbBadgeRadius = NbRadius;
type NbBadgeShadow = NbShadow;
type NbBadgeBorder = NbBorderStrength;
declare class NbBadge {
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, NbBorderStrength | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbBadge, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbBadge, "span[nbBadge]", ["nbBadge"], { "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

type NbAvatarTone = NbTone;
type NbAvatarRadius = NbRadius;
type NbAvatarShadow = NbShadow;
type NbAvatarBorder = NbBorderStrength;
declare class NbAvatar {
    readonly src: _angular_core.InputSignal<string | undefined>;
    readonly alt: _angular_core.InputSignal<string>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, NbBorderStrength | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbAvatar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbAvatar, "nb-avatar", ["nbAvatar"], { "src": { "alias": "src"; "required": false; "isSignal": true; }; "alt": { "alias": "alt"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

type NbMediaFrameTone = NbTone;
type NbMediaFrameRadius = NbRadius;
type NbMediaFrameShadow = NbShadow;
type NbMediaFrameBorder = NbBorderStrength;
type NbMediaFrameRatio = 'auto' | '1/1' | '3/4' | '4/3' | '3/2' | '16/9' | '21/9';
type NbMediaFrameFit = 'cover' | 'contain' | 'fill';
declare class NbMediaFrame {
    readonly ratio: _angular_core.InputSignal<NbMediaFrameRatio>;
    readonly fit: _angular_core.InputSignal<NbMediaFrameFit>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, NbBorderStrength | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbMediaFrame, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbMediaFrame, "[nbMediaFrame]", ["nbMediaFrame"], { "ratio": { "alias": "ratio"; "required": false; "isSignal": true; }; "fit": { "alias": "fit"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

declare class NbStat {
    readonly value: _angular_core.InputSignal<string>;
    readonly label: _angular_core.InputSignal<string>;
    readonly direction: _angular_core.InputSignal<"row" | "column">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbStat, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbStat, "nb-stat", ["nbStat"], { "value": { "alias": "value"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "direction": { "alias": "direction"; "required": false; "isSignal": true; }; }, {}, never, ["[slot=icon]"], true, never>;
}

type NbRatingTone = NbTone;
declare class NbRating {
    readonly value: _angular_core.InputSignal<number>;
    readonly max: _angular_core.InputSignal<number>;
    readonly count: _angular_core.InputSignal<number | undefined>;
    protected readonly stars: _angular_core.Signal<number[]>;
    protected readonly filled: _angular_core.Signal<number>;
    protected readonly ariaLabel: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbRating, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbRating, "nb-rating", ["nbRating"], { "value": { "alias": "value"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "count": { "alias": "count"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

interface NbDialogController {
    open(): void;
    close(): void;
}

type NbDialogTone = NbTone;
type NbDialogRadius = NbRadius;
type NbDialogShadow = NbShadow;
type NbDialogBorder = NbBorderStrength;
declare class NbDialog implements NbDialogController {
    #private;
    readonly tone: _angular_core.InputSignal<NbTone | undefined>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, NbBorderStrength | null | undefined>;
    readonly dismissible: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly closed: _angular_core.OutputEmitterRef<void>;
    private readonly dialogEl;
    open(): void;
    close(): void;
    protected dismissOnBackdrop(event: MouseEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbDialog, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbDialog, "nb-dialog", ["nbDialog"], { "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; "dismissible": { "alias": "dismissible"; "required": false; "isSignal": true; }; }, { "closed": "closed"; }, never, ["*"], true, never>;
}

declare class NbDialogTitle {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbDialogTitle, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbDialogTitle, "[nbDialogTitle]", ["nbDialogTitle"], {}, {}, never, never, true, never>;
}

declare class NbDialogDescription {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbDialogDescription, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbDialogDescription, "[nbDialogDescription]", ["nbDialogDescription"], {}, {}, never, never, true, never>;
}

declare class NbDialogContent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbDialogContent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbDialogContent, "nb-dialog-content", ["nbDialogContent"], {}, {}, never, ["*"], true, never>;
}

declare class NbDialogActions {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbDialogActions, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbDialogActions, "nb-dialog-actions", ["nbDialogActions"], {}, {}, never, ["*"], true, never>;
}

declare class NbDialogClose {
    protected readonly controller: NbDialogController;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbDialogClose, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbDialogClose, "[nbDialogClose]", ["nbDialogClose"], {}, {}, never, never, true, never>;
}

type NbStatusDotState = 'online' | 'offline' | 'live';
type NbStatusDotSize = NbSizeXs;
type NbStatusDotRadius = NbRadius;
declare class NbStatusDot {
    readonly state: _angular_core.InputSignal<NbStatusDotState>;
    readonly size: _angular_core.InputSignal<NbSizeXs>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    protected readonly ariaLabel: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbStatusDot, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbStatusDot, "span[nbStatusDot]", ["nbStatusDot"], { "state": { "alias": "state"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type NbTextWeight = NbFontWeight;
type NbTextTone = 'default' | 'muted' | 'subtle' | 'inverse' | Extract<NbTone, 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'>;
type NbTextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

type NbTextMeasure = 'none' | 'xs' | 'sm' | 'md' | 'lg';
type NbTextLeading = 'none' | 'tight' | 'normal' | 'relaxed';
type NbTextUnderline = NbUnderlineVariant;
declare class NbText {
    #private;
    readonly size: _angular_core.InputSignal<NbTextSize>;
    readonly weight: _angular_core.InputSignal<NbFontWeight>;
    readonly tone: _angular_core.InputSignal<NbTextTone | undefined>;
    readonly transform: _angular_core.InputSignal<NbTextTransform>;
    readonly tracking: _angular_core.InputSignal<NbTextTracking>;
    readonly measure: _angular_core.InputSignal<NbTextMeasure>;
    readonly leading: _angular_core.InputSignal<NbTextLeading>;
    protected readonly colorValue: _angular_core.Signal<string | null>;
    protected readonly underlineGapStyle: _angular_core.Signal<string | null>;
    protected readonly underlineWidthStyle: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbText, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbText, "[nbText]", ["nbText"], { "size": { "alias": "size"; "required": false; "isSignal": true; }; "weight": { "alias": "weight"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "transform": { "alias": "transform"; "required": false; "isSignal": true; }; "tracking": { "alias": "tracking"; "required": false; "isSignal": true; }; "measure": { "alias": "measure"; "required": false; "isSignal": true; }; "leading": { "alias": "leading"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbUnderlineCapability; inputs: { "underline": "underline"; "underlineGap": "underlineGap"; "underlineWidth": "underlineWidth"; }; outputs: {}; }, { directive: typeof NbResetMarginCapability; inputs: { "reset": "reset"; }; outputs: {}; }]>;
}

type NbChipTone = NbTone;
type NbChipRadius = NbRadius;
type NbChipShadow = NbShadow;
type NbChipSize = 'none' | NbSize;
declare class NbChip {
    readonly size: _angular_core.InputSignalWithTransform<string | null, NbChipSize | null | undefined>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbBorderStrength | null | undefined>;
    readonly icon: _angular_core.InputSignal<string | undefined>;
    readonly iconSize: _angular_core.InputSignal<NbIconSize>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbChip, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbChip, "span[nbChip]", ["nbChip"], { "size": { "alias": "size"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "iconSize": { "alias": "iconSize"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}
type NbChipGroupDirection = NbOrientation;
type NbChipGroupAlign = NbLayoutAlign;
type NbChipGroupGap = NbSpacing;
declare class NbChipGroup {
    readonly direction: _angular_core.InputSignal<NbOrientation>;
    readonly gap: _angular_core.InputSignalWithTransform<string | null, NbSpacing | null | undefined>;
    readonly align: _angular_core.InputSignal<NbLayoutAlign>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly transform: _angular_core.InputSignal<NbTextTransform>;
    readonly tracking: _angular_core.InputSignal<NbTextTracking>;
    protected readonly chipRadiusValue: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    protected readonly chipShadowValue: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    protected readonly transformValue: _angular_core.Signal<"uppercase" | "lowercase" | "capitalize" | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbChipGroup, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbChipGroup, "[nbChipGroup]", ["nbChipGroup"], { "direction": { "alias": "direction"; "required": false; "isSignal": true; }; "gap": { "alias": "gap"; "required": false; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "transform": { "alias": "transform"; "required": false; "isSignal": true; }; "tracking": { "alias": "tracking"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbIconButtonShape = NbIconShape;
type NbIconButtonSize = NbSize;
declare class NbIconButton {
    readonly shape: _angular_core.InputSignal<NbIconShape>;
    readonly size: _angular_core.InputSignal<NbSize>;
    readonly icon: _angular_core.InputSignal<string | undefined>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, _ng_brutalism_ui.NbBorderStrength | null | undefined>;
    protected readonly iconSize: _angular_core.Signal<NbIconSize>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbIconButton, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbIconButton, "button[nbIconButton]", ["nbIconButton"], { "shape": { "alias": "shape"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

type NbProgressTone = NbTone;
declare class NbProgress {
    readonly value: _angular_core.InputSignal<number>;
    readonly max: _angular_core.InputSignal<number>;
    readonly label: _angular_core.InputSignal<string>;
    protected readonly clampedValue: _angular_core.Signal<number>;
    protected readonly percentage: _angular_core.Signal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbProgress, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbProgress, "nb-progress", ["nbProgress"], { "value": { "alias": "value"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

declare class NbAvatarGroup {
    readonly overflow: _angular_core.InputSignal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbAvatarGroup, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbAvatarGroup, "nb-avatar-group", ["nbAvatarGroup"], { "overflow": { "alias": "overflow"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

type NbStickerShape = 'burst' | 'burst-wide' | 'star' | 'splat';
type NbStickerTone = NbTone;

interface NbStickerPathConfig {
    viewBox: string;
    path: string;
    shadowTransform: string;
}

declare class NbSticker {
    readonly shape: _angular_core.InputSignal<NbStickerShape>;
    readonly decorative: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly ariaLabel: _angular_core.InputSignal<string | null>;
    readonly rotate: _angular_core.InputSignalWithTransform<string | null, unknown>;
    readonly size: _angular_core.InputSignalWithTransform<string | null, unknown>;
    protected readonly config: _angular_core.Signal<NbStickerPathConfig>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbSticker, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbSticker, "nb-sticker", ["nbSticker"], { "shape": { "alias": "shape"; "required": false; "isSignal": true; }; "decorative": { "alias": "decorative"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "aria-label"; "required": false; "isSignal": true; }; "rotate": { "alias": "rotate"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

declare class NbStickerFace {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbStickerFace, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbStickerFace, "nb-sticker-face", ["nbStickerFace"], {}, {}, never, never, true, never>;
}

type NbHalftoneShape = 'square' | 'circle' | 'rectangle';
declare class NbHalftone {
    readonly shape: _angular_core.InputSignal<NbHalftoneShape>;
    readonly color: _angular_core.InputSignal<string | null>;
    readonly size: _angular_core.InputSignalWithTransform<number | null, unknown>;
    readonly gap: _angular_core.InputSignalWithTransform<number | null, unknown>;
    readonly gapX: _angular_core.InputSignalWithTransform<number | null, unknown>;
    readonly gapY: _angular_core.InputSignalWithTransform<number | null, unknown>;
    readonly rows: _angular_core.InputSignalWithTransform<number | null, unknown>;
    readonly columns: _angular_core.InputSignalWithTransform<number | null, unknown>;
    protected readonly resolvedSize: _angular_core.Signal<number>;
    protected readonly resolvedGap: _angular_core.Signal<number>;
    protected readonly resolvedGapXInput: _angular_core.Signal<number | null>;
    protected readonly resolvedGapYInput: _angular_core.Signal<number | null>;
    protected readonly resolvedRows: _angular_core.Signal<number>;
    protected readonly resolvedColumns: _angular_core.Signal<number>;
    protected readonly svgW: _angular_core.Signal<number>;
    protected readonly svgH: _angular_core.Signal<number>;
    protected readonly dotR: _angular_core.Signal<number>;
    protected readonly dots: _angular_core.Signal<{
        cx: number;
        cy: number;
    }[]>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbHalftone, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbHalftone, "nb-halftone, [nbHalftone]", ["nbHalftone"], { "shape": { "alias": "shape"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "gap": { "alias": "gap"; "required": false; "isSignal": true; }; "gapX": { "alias": "gapX"; "required": false; "isSignal": true; }; "gapY": { "alias": "gapY"; "required": false; "isSignal": true; }; "rows": { "alias": "rows"; "required": false; "isSignal": true; }; "columns": { "alias": "columns"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbSurfaceTone = NbTone;
type NbSurfaceRadius = NbRadius;
type NbSurfaceBorder = NbBorderStrength;
type NbSurfaceShadow = NbShadow;
type NbSurfacePadding = NbPadding;
type NbSurfaceSize = 'auto' | NbSize;
type NbSurfaceLayout = 'block' | 'center' | 'row' | 'stack';
type NbSurfaceEdge = 'none' | 'top' | 'bottom';
declare class NbSurface {
    readonly size: _angular_core.InputSignal<NbSurfaceSize>;
    readonly layout: _angular_core.InputSignal<NbSurfaceLayout>;
    readonly edge: _angular_core.InputSignal<NbSurfaceEdge>;
    readonly clip: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, NbBorderStrength | null | undefined>;
    readonly padding: _angular_core.InputSignalWithTransform<string | null, NbPadding | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbSurface, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbSurface, "[nbSurface]", ["nbSurface"], { "size": { "alias": "size"; "required": false; "isSignal": true; }; "layout": { "alias": "layout"; "required": false; "isSignal": true; }; "edge": { "alias": "edge"; "required": false; "isSignal": true; }; "clip": { "alias": "clip"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; "padding": { "alias": "padding"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }, { directive: typeof NbTypography; inputs: { "font": "typography"; }; outputs: {}; }]>;
}

type NbStackGap = NbSpacing;
type NbStackAlign = NbLayoutAlign;
type NbStackJustify = NbLayoutJustify;
type NbStackSeparator = NbLayoutSeparator;
declare class NbStack {
    readonly align: _angular_core.InputSignal<NbLayoutAlign>;
    readonly justify: _angular_core.InputSignal<NbLayoutJustify>;
    readonly separator: _angular_core.InputSignal<NbLayoutSeparator>;
    readonly gap: _angular_core.InputSignalWithTransform<string | null, NbSpacing | null | undefined>;
    protected readonly separatorGapStyle: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbStack, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbStack, "[nbStack]", ["nbStack"], { "align": { "alias": "align"; "required": false; "isSignal": true; }; "justify": { "alias": "justify"; "required": false; "isSignal": true; }; "separator": { "alias": "separator"; "required": false; "isSignal": true; }; "gap": { "alias": "gap"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbClusterGap = NbSpacing;
type NbClusterPadding = NbPadding;
type NbClusterAlign = NbLayoutAlign | 'baseline';
type NbClusterJustify = NbLayoutJustify;
type NbClusterWrap = 'wrap' | 'nowrap';
type NbClusterSeparator = NbLayoutSeparator;
declare class NbCluster {
    readonly align: _angular_core.InputSignal<NbClusterAlign>;
    readonly justify: _angular_core.InputSignal<NbLayoutJustify>;
    readonly wrap: _angular_core.InputSignal<NbClusterWrap>;
    readonly separator: _angular_core.InputSignal<NbLayoutSeparator>;
    readonly gap: _angular_core.InputSignalWithTransform<string | null, NbSpacing | null | undefined>;
    readonly padding: _angular_core.InputSignalWithTransform<string | null, NbPadding | null | undefined>;
    protected readonly separatorColumnGapStyle: _angular_core.Signal<"0px" | null>;
    protected readonly separatorGapStyle: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCluster, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbCluster, "[nbCluster]", ["nbCluster"], { "align": { "alias": "align"; "required": false; "isSignal": true; }; "justify": { "alias": "justify"; "required": false; "isSignal": true; }; "wrap": { "alias": "wrap"; "required": false; "isSignal": true; }; "separator": { "alias": "separator"; "required": false; "isSignal": true; }; "gap": { "alias": "gap"; "required": false; "isSignal": true; }; "padding": { "alias": "padding"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbSplitRatio = '1:1' | '2:1' | '3:1' | '1:2' | '1:3' | 'fill:auto' | 'auto:fill';
type NbSplitGap = NbSpacing;
type NbSplitPadding = NbPadding;
type NbSplitCollapse = 'none' | NbControlSize;
type NbSplitAlign = NbLayoutAlign;
type NbSplitSeparator = NbLayoutSeparator;
declare class NbSplit {
    readonly ratio: _angular_core.InputSignal<NbSplitRatio>;
    readonly collapse: _angular_core.InputSignal<NbSplitCollapse>;
    readonly align: _angular_core.InputSignal<NbLayoutAlign>;
    readonly separator: _angular_core.InputSignal<NbLayoutSeparator>;
    readonly gap: _angular_core.InputSignalWithTransform<string | null, NbSpacing | null | undefined>;
    readonly padding: _angular_core.InputSignalWithTransform<string | null, NbPadding | null | undefined>;
    protected readonly separatorGapStyle: _angular_core.Signal<string | null>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbSplit, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbSplit, "[nbSplit]", ["nbSplit"], { "ratio": { "alias": "ratio"; "required": false; "isSignal": true; }; "collapse": { "alias": "collapse"; "required": false; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; "separator": { "alias": "separator"; "required": false; "isSignal": true; }; "gap": { "alias": "gap"; "required": false; "isSignal": true; }; "padding": { "alias": "padding"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbSectionPadding = NbPadding;
type NbSectionDivider = NbDivider;
type NbSectionDividerStyle = 'solid' | 'dashed' | 'dotted';
type NbSectionLayout = 'default' | 'center' | 'between';
type NbSectionAlign = NbLayoutAlign;
declare class NbSection {
    readonly divider: _angular_core.InputSignal<NbDivider>;
    readonly dividerStyle: _angular_core.InputSignal<NbSectionDividerStyle>;
    readonly layout: _angular_core.InputSignal<NbSectionLayout>;
    readonly align: _angular_core.InputSignal<NbLayoutAlign>;
    readonly flush: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly padding: _angular_core.InputSignalWithTransform<string | null, NbPadding | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbSection, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbSection, "[nbSection]", ["nbSection"], { "divider": { "alias": "divider"; "required": false; "isSignal": true; }; "dividerStyle": { "alias": "dividerStyle"; "required": false; "isSignal": true; }; "layout": { "alias": "layout"; "required": false; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; "flush": { "alias": "flush"; "required": false; "isSignal": true; }; "padding": { "alias": "padding"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type NbCalloutTone = NbTone;
type NbCalloutSize = NbSize;
type NbCalloutLayout = 'inline' | 'between' | 'center';
type NbCalloutShadow = NbShadow;
type NbCalloutRadius = NbRadius;
type NbCalloutBorder = NbBorderStrength;
declare class NbCallout {
    readonly size: _angular_core.InputSignal<NbSize>;
    readonly layout: _angular_core.InputSignal<NbCalloutLayout>;
    readonly radius: _angular_core.InputSignalWithTransform<string | null, NbRadius | null | undefined>;
    readonly shadow: _angular_core.InputSignalWithTransform<string | null, NbShadow | null | undefined>;
    readonly border: _angular_core.InputSignalWithTransform<string | null, NbBorderStrength | null | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbCallout, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbCallout, "[nbCallout]", ["nbCallout"], { "size": { "alias": "size"; "required": false; "isSignal": true; }; "layout": { "alias": "layout"; "required": false; "isSignal": true; }; "radius": { "alias": "radius"; "required": false; "isSignal": true; }; "shadow": { "alias": "shadow"; "required": false; "isSignal": true; }; "border": { "alias": "border"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}

type NbMediaItemVariant = 'plain' | 'boxed' | 'chip';
type NbMediaItemOrientation = NbOrientation;
type NbMediaItemAlign = Extract<NbLayoutJustify, 'start' | 'center' | 'between'>;
type NbMediaItemSize = NbSizeXs;
type NbMediaItemTone = NbTone;
declare class NbMediaItem {
    readonly variant: _angular_core.InputSignal<NbMediaItemVariant>;
    readonly orientation: _angular_core.InputSignal<NbOrientation>;
    readonly align: _angular_core.InputSignal<NbMediaItemAlign>;
    readonly size: _angular_core.InputSignal<NbSizeXs>;
    readonly icon: _angular_core.InputSignal<string | undefined>;
    readonly iconAlt: _angular_core.InputSignal<string>;
    readonly iconBackground: _angular_core.InputSignal<string | undefined>;
    readonly title: _angular_core.InputSignal<string | undefined>;
    readonly description: _angular_core.InputSignal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbMediaItem, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NbMediaItem, "nb-media-item, [nbMediaItem]", ["nbMediaItem"], { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "iconAlt": { "alias": "iconAlt"; "required": false; "isSignal": true; }; "iconBackground": { "alias": "iconBackground"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; }, {}, never, ["nb-media-item-icon, [nbMediaItemIcon], [nbSurface], img, svg", "nb-media-item-title, [nbMediaItemTitle]", "nb-media-item-description, [nbMediaItemDescription]", "*", "nb-media-item-action, [nbMediaItemAction]"], true, [{ directive: typeof NbToneCapability; inputs: { "tone": "tone"; }; outputs: {}; }]>;
}
declare class NbMediaItemIcon {
    readonly surface: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly background: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbMediaItemIcon, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbMediaItemIcon, "nb-media-item-icon, [nbMediaItemIcon]", ["nbMediaItemIcon"], { "surface": { "alias": "surface"; "required": false; "isSignal": true; }; "background": { "alias": "background"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
declare class NbMediaItemTitle {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbMediaItemTitle, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbMediaItemTitle, "nb-media-item-title, [nbMediaItemTitle]", ["nbMediaItemTitle"], {}, {}, never, never, true, never>;
}
declare class NbMediaItemDescription {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NbMediaItemDescription, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NbMediaItemDescription, "nb-media-item-description, [nbMediaItemDescription]", ["nbMediaItemDescription"], {}, {}, never, never, true, never>;
}

export { NbAccordion, NbAccordionContent, NbAccordionItem, NbAccordionTrigger, NbAvatar, NbAvatarGroup, NbBadge, NbButton, NbButtonTrailingIcon, NbCallout, NbCard, NbCardActions, NbCardContent, NbCardDescription, NbCardFooter, NbCardHeader, NbCardTitle, NbCheckbox, NbChip, NbChipGroup, NbCluster, NbDialog, NbDialogActions, NbDialogClose, NbDialogContent, NbDialogDescription, NbDialogTitle, NbDisplay, NbField, NbFieldDescription, NbFieldError, NbHalftone, NbIcon, NbIconButton, NbImageCard, NbImageCardCaption, NbInput, NbInputGroup, NbInputPrefix, NbInputSuffix, NbLabel, NbMarquee, NbMarqueeItem, NbMediaFrame, NbMediaItem, NbMediaItemDescription, NbMediaItemIcon, NbMediaItemTitle, NbNativeSelect, NbProgress, NbRating, NbSection, NbSelect, NbSelectOption, NbSeparator, NbSplit, NbStack, NbStat, NbStatusDot, NbSticker, NbStickerFace, NbSurface, NbText, NbTextarea, NbTitle, NbTypography, NbResetMarginCapability as ɵNbResetMarginCapability, NbToneCapability as ɵNbToneCapability, NbUnderlineCapability as ɵNbUnderlineCapability };
export type { NbAccordionType, NbAccordionValue, NbAvatarBorder, NbAvatarRadius, NbAvatarShadow, NbAvatarTone, NbBadgeBorder, NbBadgeRadius, NbBadgeShadow, NbBadgeTone, NbButtonIconPush, NbButtonIconShape, NbButtonIconSize, NbButtonIconTone, NbButtonPress, NbButtonRadius, NbButtonShadow, NbButtonSize, NbButtonTone, NbCalloutBorder, NbCalloutLayout, NbCalloutRadius, NbCalloutShadow, NbCalloutSize, NbCalloutTone, NbCardActionsAlign, NbCardBorder, NbCardRadius, NbCardShadow, NbCardTone, NbCheckboxSize, NbChipGroupAlign, NbChipGroupDirection, NbChipGroupGap, NbChipRadius, NbChipShadow, NbChipSize, NbChipTone, NbClusterAlign, NbClusterGap, NbClusterJustify, NbClusterPadding, NbClusterSeparator, NbClusterWrap, NbDialogBorder, NbDialogRadius, NbDialogShadow, NbDialogTone, NbDisplayLeading, NbDisplaySize, NbDisplayTracking, NbDisplayUnderline, NbDisplayWeight, NbFieldContext, NbHalftoneShape, NbIconButtonShape, NbIconButtonSize, NbIconMode, NbIconSize, NbIconTone, NbImageCardBorder, NbImageCardRadius, NbImageCardShadow, NbImageCardTone, NbInputAffixAlign, NbInputBorder, NbInputPrefixAlign, NbInputRadius, NbInputShadow, NbInputSize, NbInputSuffixAlign, NbInputTone, NbMediaFrameBorder, NbMediaFrameFit, NbMediaFrameRadius, NbMediaFrameRatio, NbMediaFrameShadow, NbMediaFrameTone, NbMediaItemAlign, NbMediaItemOrientation, NbMediaItemSize, NbMediaItemTone, NbMediaItemVariant, NbProgressTone, NbRatingTone, NbSectionAlign, NbSectionDivider, NbSectionDividerStyle, NbSectionLayout, NbSectionPadding, NbSelectSize, NbSelectValue, NbSeparatorOrientation, NbSeparatorVariant, NbSplitAlign, NbSplitCollapse, NbSplitGap, NbSplitPadding, NbSplitRatio, NbSplitSeparator, NbStackAlign, NbStackGap, NbStackJustify, NbStackSeparator, NbStatusDotRadius, NbStatusDotSize, NbStatusDotState, NbStickerShape, NbStickerTone, NbSurfaceBorder, NbSurfaceEdge, NbSurfaceLayout, NbSurfacePadding, NbSurfaceRadius, NbSurfaceShadow, NbSurfaceSize, NbSurfaceTone, NbTextLeading, NbTextMeasure, NbTextSize, NbTextTone, NbTextTransform, NbTextUnderline, NbTextWeight, NbTextareaSize };
