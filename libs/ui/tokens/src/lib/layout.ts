/**
 * Shared layout vocabulary for composition primitives. These are type
 * contracts only: each primitive's CSS still owns what the values mean for its
 * own layout model.
 */
export type NbLayoutAlign = 'stretch' | 'start' | 'center' | 'end';

export type NbLayoutJustify = 'start' | 'center' | 'end' | 'between';

export type NbLayoutSeparator = 'none' | 'solid' | 'dashed' | 'thick';
