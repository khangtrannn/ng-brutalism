export type NbSemanticTone =
  | 'surface'
  | 'background'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger';

export type NbPaletteTone =
  | 'ink'
  | 'cream'
  | 'white'
  | 'black'
  | 'yellow'
  | 'pink'
  | 'mint'
  | 'lavender'
  | 'blue';

export type NbTone = NbSemanticTone | NbPaletteTone;
