import type {
  NbControlSize,
  NbIconShape,
  NbRadius,
  NbShadow,
  NbSize,
  NbTone,
} from '@ng-brutalism/ui/tokens';
import type { NbIconTone } from '../icon';
export type NbButtonTone = NbTone;

export type NbButtonShadow = NbShadow;

export type NbButtonPress = 'push' | 'reverse' | 'none';

export type NbButtonSize = NbSize;

export type NbButtonRadius = NbRadius;

export type NbButtonIconSize = NbControlSize;

export type NbButtonIconShape = NbIconShape | 'none';

export type NbButtonIconTone = Extract<NbIconTone, 'default' | 'inverse' | 'current'>;

export type NbButtonIconPush = 'none' | 'end';
