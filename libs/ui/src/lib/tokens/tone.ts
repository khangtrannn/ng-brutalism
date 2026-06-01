export type NbTone =
  | 'default'
  | 'cream'
  | 'white'
  | 'black'
  | 'yellow'
  | 'pink'
  | 'mint'
  | 'lavender'
  | 'blue'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger';

export interface NbToneTokens {
  bg: string;
  fg: string;
}

export const NB_TONE_TOKENS: Record<NbTone, NbToneTokens> = {
  default: {
    bg: 'var(--nb-surface)',
    fg: 'var(--nb-surface-foreground)',
  },
  cream: {
    bg: 'var(--nb-cream)',
    fg: '#000000',
  },
  white: {
    bg: '#ffffff',
    fg: '#000000',
  },
  black: {
    bg: '#000000',
    fg: '#ffffff',
  },
  yellow: {
    bg: 'var(--nb-yellow)',
    fg: '#000000',
  },
  pink: {
    bg: 'var(--nb-pink)',
    fg: '#000000',
  },
  mint: {
    bg: 'var(--nb-mint)',
    fg: '#000000',
  },
  lavender: {
    bg: 'var(--nb-lavender)',
    fg: '#000000',
  },
  blue: {
    bg: 'var(--nb-blue)',
    fg: '#000000',
  },
  primary: {
    bg: 'var(--nb-primary)',
    fg: 'var(--nb-primary-foreground)',
  },
  secondary: {
    bg: 'var(--nb-secondary)',
    fg: 'var(--nb-secondary-foreground)',
  },
  accent: {
    bg: 'var(--nb-accent)',
    fg: 'var(--nb-accent-foreground)',
  },
  success: {
    bg: 'var(--nb-success)',
    fg: 'var(--nb-success-foreground)',
  },
  warning: {
    bg: 'var(--nb-warning)',
    fg: 'var(--nb-warning-foreground)',
  },
  danger: {
    bg: 'var(--nb-danger)',
    fg: 'var(--nb-danger-foreground)',
  },
};

export function nbToneTokens(tone: NbTone): NbToneTokens {
  return NB_TONE_TOKENS[tone];
}

/**
 * Neutral tone aliases accepted by the tone capability in addition to the core
 * {@link NbTone} palette. These map onto existing theme surfaces rather than
 * the playful/semantic palette:
 * - `surface`    → the default surface tokens
 * - `background` → the page background/foreground
 * - `ink`        → solid black (`black` tone)
 */
export type NbToneToken = NbTone | 'surface' | 'background' | 'ink';

/**
 * Component-specific tone variables: background, foreground, and border color.
 * Border color is always the brutalist ink (`--nb-border`) so the border
 * *width* capability and the tone capability never fight over color.
 */
export interface NbToneVars {
  bg: string;
  fg: string;
  borderColor: string;
}

export function nbToneVars(tone: NbToneToken): NbToneVars {
  const borderColor = 'var(--nb-border)';

  if (tone === 'surface') {
    return { ...nbToneTokens('default'), borderColor };
  }

  if (tone === 'background') {
    return {
      bg: 'var(--nb-background)',
      fg: 'var(--nb-foreground)',
      borderColor,
    };
  }

  if (tone === 'ink') {
    return { ...nbToneTokens('black'), borderColor };
  }

  return { ...nbToneTokens(tone), borderColor };
}
