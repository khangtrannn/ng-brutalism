import { nbBorderWidthValue, type NbBorderStrength } from '../../tokens/border';
import { nbTokenStyleTransform } from './token-style-transform';

export const nbBorderWidthStyleTransform = nbTokenStyleTransform<NbBorderStrength>(
  nbBorderWidthValue,
);