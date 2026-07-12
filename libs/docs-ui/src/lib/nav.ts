import { docsNavGroups } from './docs.navigation';

export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly description?: string;
}

export interface NavGroup {
  readonly label: string;
  readonly items: readonly NavItem[];
}

export const PRIMITIVE_MENU_GROUPS: readonly NavGroup[] = [
  {
    label: 'Composition',
    items: [
      {
        label: 'Surface',
        path: '/components/surface',
        description: 'Brutalist panel',
      },
      {
        label: 'Section',
        path: '/components/section',
        description: 'Panel regions',
      },
      {
        label: 'Stack',
        path: '/components/stack',
        description: 'Vertical rhythm',
      },
      {
        label: 'Cluster',
        path: '/components/cluster',
        description: 'Horizontal groups',
      },
      {
        label: 'Split',
        path: '/components/split',
        description: 'Main + aside',
      },
      {
        label: 'Card',
        path: '/components/card',
        description: 'Ready-made shell',
      },
      {
        label: 'Separator',
        path: '/components/separator',
        description: 'Visual dividers',
      },
    ],
  },
  {
    label: 'Actions',
    items: [
      {
        label: 'Button',
        path: '/components/button',
        description: 'Actions and links',
      },
      {
        label: 'Icon Button',
        path: '/components/icon-button',
        description: 'Icon-only actions',
      },
    ],
  },
  {
    label: 'Typography',
    items: [
      { label: 'Text', path: '/components/text', description: 'Body copy' },
      {
        label: 'Title',
        path: '/components/title',
        description: 'Section headings',
      },
      {
        label: 'Display',
        path: '/components/display',
        description: 'Hero text',
      },
      {
        label: 'Stat',
        path: '/components/stat',
        description: 'Value + label pairs',
      },
    ],
  },
  {
    label: 'Forms',
    items: [
      { label: 'Input', path: '/components/input', description: 'Form fields' },
      {
        label: 'Textarea',
        path: '/components/textarea',
        description: 'Multi-line input',
      },
      {
        label: 'Checkbox',
        path: '/components/checkbox',
        description: 'Toggles',
      },
      {
        label: 'Select',
        path: '/components/select',
        description: 'Dropdown choices',
      },
      { label: 'Label', path: '/components/label', description: 'Form labels' },
      {
        label: 'Input Group',
        path: '/components/input-group',
        description: 'Prefix and suffix',
      },
      {
        label: 'Field',
        path: '/components/field',
        description: 'Label + control linking',
      },
    ],
  },
  {
    label: 'Media',
    items: [
      {
        label: 'Avatar',
        path: '/components/avatar',
        description: 'Profile images',
      },
      {
        label: 'Avatar Group',
        path: '/components/avatar-group',
        description: 'Team stacks',
      },
      { label: 'Icon', path: '/components/icon', description: 'SVG icons' },
      {
        label: 'Media Frame',
        path: '/components/media-frame',
        description: 'Framed images',
      },
      {
        label: 'Media Item',
        path: '/components/media-item',
        description: 'Icon + label rows',
      },
      {
        label: 'Image Card',
        path: '/components/image-card',
        description: 'Image-first cards',
      },
    ],
  },
  {
    label: 'Emphasis',
    items: [
      {
        label: 'Badge',
        path: '/components/badge',
        description: 'Status labels',
      },
      { label: 'Chip', path: '/components/chip', description: 'Metadata tags' },
      {
        label: 'Callout',
        path: '/components/callout',
        description: 'Highlight panels',
      },
      {
        label: 'Sticker',
        path: '/components/sticker',
        description: 'Decorative bursts',
      },
      {
        label: 'Status Dot',
        path: '/components/status-dot',
        description: 'State indicators',
      },
      {
        label: 'Rating',
        path: '/components/rating',
        description: 'Star scores',
      },
      {
        label: 'Progress',
        path: '/components/progress',
        description: 'Completion bars',
      },
      {
        label: 'Halftone',
        path: '/components/halftone',
        description: 'Decorative dot pattern',
      },
    ],
  },
  {
    label: 'Interaction',
    items: [
      {
        label: 'Accordion',
        path: '/components/accordion',
        description: 'Disclosure panels',
      },
      {
        label: 'Dialog',
        path: '/components/dialog',
        description: 'Modal flows',
      },
      {
        label: 'Marquee',
        path: '/components/marquee',
        description: 'Scrolling ticker',
      },
    ],
  },
] as const;

export const RECIPE_MENU_GROUPS: readonly NavGroup[] = [
  {
    label: 'Recipes',
    items: [
      {
        label: 'Travel Card',
        path: '/recipes/travel-card',
        description: 'Media composition',
      },
      {
        label: 'Podcast Card',
        path: '/recipes/podcast-card',
        description: 'Audio episode card',
      },
      {
        label: 'Open to Work',
        path: '/recipes/open-to-work-card',
        description: 'Profile card',
      },
    ],
  },
] as const;

export const DOC_NAV: readonly NavGroup[] = docsNavGroups.flatMap((group) =>
  group.label === 'Primitives'
    ? PRIMITIVE_MENU_GROUPS
    : [
        {
          label: group.label,
          items: group.items.flatMap((item) =>
            item.path ? [{ label: item.label, path: item.path }] : [],
          ),
        },
      ],
);
