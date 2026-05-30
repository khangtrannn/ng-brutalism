import type { NbTone } from '../tokens/tone';

export type NbButtonTone = NbTone;

export type NbButtonVariant =
  | 'default'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'danger'
  | 'success'
  | 'warning';

export type NbButtonShadow = 'default' | 'none' | 'reverse';

export type NbButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type NbButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type NbButtonWeight = 'bold' | 'extrabold' | 'black';

export type NbButtonTransform = 'none' | 'uppercase';

export type NbButtonTracking = 'normal' | 'wide' | 'wider';

export type NbButtonIconSize = 'sm' | 'md' | 'lg';

export type NbButtonIconShape = 'none' | 'square' | 'circle';

export type NbButtonIconTone = 'default' | 'inverse' | 'current';
