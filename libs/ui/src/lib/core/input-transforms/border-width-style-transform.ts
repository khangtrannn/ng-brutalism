import {
  nbBorderWidthValue,
  type NbBorderStrength,
} from '@ng-brutalism/ui/tokens';
import { nbTokenStyleTransform } from './token-style-transform';

export const nbBorderWidthStyleTransform =
  nbTokenStyleTransform<NbBorderStrength>(nbBorderWidthValue);
