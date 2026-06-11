import { nbShadowValue, type NbShadow } from '../../tokens/shadow';
import { nbTokenStyleTransform } from './token-style-transform';

export const nbShadowStyleTransform = nbTokenStyleTransform<NbShadow>(
  nbShadowValue,
);