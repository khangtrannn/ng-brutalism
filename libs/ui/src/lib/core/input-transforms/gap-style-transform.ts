import { nbSpacingValue, type NbSpacing } from '@ng-brutalism/ui/tokens';
import { nbTokenStyleTransform } from './token-style-transform';

export const nbGapStyleTransform =
  nbTokenStyleTransform<NbSpacing>(nbSpacingValue);
