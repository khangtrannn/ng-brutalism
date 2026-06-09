export type NbTone =
  | 'surface'
  | 'background'
  | 'ink'
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
  surface: {
    bg: 'var(--nb-surface)',
    fg: 'var(--nb-surface-foreground)',
  },
  background: {
    bg: 'var(--nb-background)',
    fg: 'var(--nb-foreground)',
  },
  ink: {
    bg: '#000000',
    fg: '#ffffff',
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
 * Component-specific tone variables: background, foreground, and border color.
 * Border color is always the brutalist ink (`--nb-border`) so the border
 * *width* capability and the tone capability never fight over color.
 */
export interface NbToneVars {
  bg: string;
  fg: string;
  borderColor: string;
}

export function nbToneVars(tone: NbTone): NbToneVars {
  const borderColor = 'var(--nb-border)';

  return { ...nbToneTokens(tone), borderColor };
}
