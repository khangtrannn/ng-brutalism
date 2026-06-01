/**
 * Divider line placement between layout regions. Distinct from `border`
 * (outline strength): `divider` describes *which side(s)* carry a separating
 * line, while `border` describes *how thick* an element's outline is.
 */
export type NbDivider =
  | 'none'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'block'
  | 'inline'
  | 'all';
