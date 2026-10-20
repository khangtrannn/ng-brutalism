import {
  nbBorderWidthValue,
  nbPaddingValue,
  nbRadiusValue,
  nbShadowValue,
  nbSpacingValue,
} from '@ng-brutalism/ui/tokens';

export function nbTokenStyleTransform<TToken>(
  toValue: (token: TToken) => string
) {
  return (token: TToken | null | undefined): string | null =>
    token == null ? null : toValue(token);
}

export const nbRadiusStyleTransform = nbTokenStyleTransform(nbRadiusValue);
export const nbShadowStyleTransform = nbTokenStyleTransform(nbShadowValue);
export const nbBorderWidthStyleTransform =
  nbTokenStyleTransform(nbBorderWidthValue);
export const nbPaddingStyleTransform = nbTokenStyleTransform(nbPaddingValue);
export const nbGapStyleTransform = nbTokenStyleTransform(nbSpacingValue);
