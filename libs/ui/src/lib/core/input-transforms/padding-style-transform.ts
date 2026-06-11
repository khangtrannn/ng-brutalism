import { nbPaddingValue, type NbPadding } from '../../tokens/padding';
import { nbTokenStyleTransform } from './token-style-transform';

export const nbPaddingStyleTransform = nbTokenStyleTransform<NbPadding>(
  nbPaddingValue,
);