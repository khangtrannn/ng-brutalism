import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbToneToken } from '../tokens/tone';

export type NbButtonTone = NbToneToken;

export type NbButtonShadow = NbShadow;

export type NbButtonPress = 'push' | 'reverse' | 'none';

export type NbButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type NbButtonRadius = NbRadius;

export type NbButtonIconSize = 'sm' | 'md' | 'lg';

export type NbButtonIconShape = 'none' | 'square' | 'circle';

export type NbButtonIconTone = 'default' | 'inverse' | 'current';

export type NbButtonIconPush = 'none' | 'end';
