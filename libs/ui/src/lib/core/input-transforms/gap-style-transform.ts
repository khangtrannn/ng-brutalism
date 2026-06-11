import { nbSpacingValue, type NbSpacing } from '../../tokens/spacing';
import { nbTokenStyleTransform } from './token-style-transform';

export const nbGapStyleTransform = nbTokenStyleTransform<NbSpacing>(
  nbSpacingValue,
);
