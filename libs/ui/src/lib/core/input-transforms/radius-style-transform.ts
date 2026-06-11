import { nbRadiusValue, type NbRadius } from '../../tokens/radius';
import { nbTokenStyleTransform } from './token-style-transform';

export const nbRadiusStyleTransform = nbTokenStyleTransform<NbRadius>(
  nbRadiusValue,
);