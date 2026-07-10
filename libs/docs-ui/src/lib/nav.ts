import { docsNavGroups } from './docs.navigation';

export interface NavItem {
  readonly label: string;
  readonly path: string;
}

export interface NavGroup {
  readonly label: string;
  readonly items: readonly NavItem[];
}

export const DOC_NAV: readonly NavGroup[] = docsNavGroups.map((group) => ({
  label: group.label,
  items: group.items.flatMap((item) =>
    item.path ? [{ label: item.label, path: item.path }] : []
  ),
}));
