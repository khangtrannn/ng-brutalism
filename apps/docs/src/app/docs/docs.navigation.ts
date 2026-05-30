export interface DocsTocItem {
  readonly label: string;
  readonly fragment: string;
}

export interface DocsNavItem {
  readonly label: string;
  readonly path?: string;
  readonly toc?: readonly DocsTocItem[];
}

export interface DocsNavGroup {
  readonly label: string;
  readonly items: readonly DocsNavItem[];
}

export const docsNavGroups: readonly DocsNavGroup[] = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction', path: '/docs/introduction' },
      { label: 'Installation', path: '/docs/installation' },
      { label: 'Inspired Designs', path: '/docs/inspired-designs' },
      {
        label: 'FAQ',
        path: '/docs/faq',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'What it is', fragment: 'what-is-ng-brutalism' },
          { label: 'Why Angular', fragment: 'why-angular' },
          { label: 'Modern Angular', fragment: 'modern-angular' },
          { label: 'Tailwind v4', fragment: 'tailwind-v4' },
          { label: 'Comparison', fragment: 'library-comparison' },
          { label: 'Production readiness', fragment: 'production-readiness' },
          { label: 'Components', fragment: 'components-included' },
          { label: 'SSR', fragment: 'ssr' },
          { label: 'Author', fragment: 'who-made-it' },
        ],
      },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        label: 'Accordion',
        path: '/components/accordion',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Single collapsible', fragment: 'single-collapsible' },
          { label: 'Multiple', fragment: 'multiple' },
          { label: 'Disabled item', fragment: 'disabled-item' },
          { label: 'Default opened item', fragment: 'default-open' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Button',
        path: '/components/button',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Installation', fragment: 'installation' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Examples', fragment: 'examples' },
          { label: 'Variants', fragment: 'variants' },
          { label: 'Sizes', fragment: 'sizes' },
          { label: 'Full width', fragment: 'full-width' },
          { label: 'Disabled', fragment: 'disabled' },
          { label: 'Anchor usage', fragment: 'anchor-usage' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Callout',
        path: '/components/callout',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Examples', fragment: 'examples' },
          { label: 'Tones', fragment: 'tones' },
          { label: 'Sizes', fragment: 'sizes' },
          { label: 'Layouts', fragment: 'layouts' },
          { label: 'Shadows', fragment: 'shadows' },
          { label: 'Customization', fragment: 'customization' },
          { label: 'API', fragment: 'api' },
        ],
      },
      { label: 'Avatar', path: '/components/avatar' },
      {
        label: 'Avatar Group',
        path: '/components/avatar-group',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Without overflow', fragment: 'no-overflow' },
          { label: 'API', fragment: 'api' },
        ],
      },
      { label: 'Badge', path: '/components/badge' },
      { label: 'Card', path: '/components/card' },
      { label: 'Checkbox', path: '/components/checkbox' },
      {
        label: 'Chip',
        path: '/components/chip',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Tones', fragment: 'tones' },
          { label: 'With Icon', fragment: 'with-icon' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Cluster',
        path: '/components/cluster',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Gaps', fragment: 'gaps' },
          { label: 'Alignment', fragment: 'alignment' },
          { label: 'Justification', fragment: 'justification' },
          { label: 'Wrapping', fragment: 'wrapping' },
          { label: 'Composition', fragment: 'composition' },
          { label: 'Responsive gap', fragment: 'responsive' },
          { label: 'API', fragment: 'api' },
        ],
      },
      { label: 'Dialog', path: '/components/dialog' },
      {
        label: 'Display',
        path: '/components/display',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Sizes', fragment: 'sizes' },
          { label: 'Color', fragment: 'color' },
          { label: 'Custom Size', fragment: 'custom-size' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Halftone',
        path: '/components/halftone',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Positions', fragment: 'positions' },
          { label: 'Custom Color', fragment: 'custom-color' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Icon Button',
        path: '/components/icon-button',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Shapes', fragment: 'shapes' },
          { label: 'Sizes', fragment: 'sizes' },
          { label: 'Variants', fragment: 'variants' },
          { label: 'API', fragment: 'api' },
        ],
      },
      { label: 'Image Card', path: '/components/image-card' },
      { label: 'Input', path: '/components/input' },
      {
        label: 'Input Group',
        path: '/components/input-group',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Prefix and Suffix', fragment: 'prefix-suffix' },
          { label: 'With Label', fragment: 'with-label' },
          { label: 'Textarea', fragment: 'textarea' },
          { label: 'Disabled', fragment: 'disabled' },
          { label: 'API', fragment: 'api' },
        ],
      },
      { label: 'Label', path: '/components/label' },
      { label: 'Marquee', path: '/components/marquee' },
      {
        label: 'Media Item',
        path: '/components/media-item',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Variants', fragment: 'variants' },
          { label: 'Orientations', fragment: 'orientations' },
          { label: 'With description', fragment: 'with-description' },
          { label: 'Sizes', fragment: 'sizes' },
          { label: 'Tones', fragment: 'tones' },
          { label: 'Alignment', fragment: 'alignment' },
          { label: 'Real-world examples', fragment: 'real-world' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Media Frame',
        path: '/components/media-frame',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Examples', fragment: 'examples' },
          { label: 'Tones', fragment: 'tones' },
          { label: 'Ratios', fragment: 'ratios' },
          { label: 'Fit', fragment: 'fit' },
          { label: 'Shape', fragment: 'shape' },
          { label: 'Customization', fragment: 'customization' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Progress',
        path: '/components/progress',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Tones', fragment: 'tones' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Rating',
        path: '/components/rating',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Values', fragment: 'values' },
          { label: 'With count', fragment: 'with-count' },
          { label: 'Custom max', fragment: 'custom-max' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Select',
        path: '/components/select',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'With Label', fragment: 'with-label' },
          { label: 'Input Group', fragment: 'input-group' },
          { label: 'Disabled', fragment: 'disabled' },
          { label: 'Custom Background', fragment: 'custom-background' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Separator',
        path: '/components/separator',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Variants', fragment: 'variants' },
          { label: 'Vertical', fragment: 'orientation' },
          { label: 'Custom Color', fragment: 'custom-color' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Section',
        path: '/components/section',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Paddings', fragment: 'paddings' },
          { label: 'Borders', fragment: 'borders' },
          { label: 'Border styles', fragment: 'border-styles' },
          { label: 'Layouts', fragment: 'layouts' },
          { label: 'Composition', fragment: 'composition' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Stat',
        path: '/components/stat',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'With icon', fragment: 'with-icon' },
          { label: 'Row direction', fragment: 'row-direction' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Status Dot',
        path: '/components/status-dot',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'States', fragment: 'states' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Stack',
        path: '/components/stack',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Gaps', fragment: 'gaps' },
          { label: 'Alignment', fragment: 'alignment' },
          { label: 'Justification', fragment: 'justification' },
          { label: 'Dividers', fragment: 'dividers' },
          { label: 'Responsive gap', fragment: 'responsive' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Split',
        path: '/components/split',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Ratios', fragment: 'ratios' },
          { label: 'Gaps and padding', fragment: 'gaps-padding' },
          { label: 'Collapse', fragment: 'collapse' },
          { label: 'Alignment', fragment: 'alignment' },
          { label: 'Composition', fragment: 'composition' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Sticker',
        path: '/components/sticker',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Shapes', fragment: 'shapes' },
          { label: 'Tones', fragment: 'tones' },
          { label: 'Rotation', fragment: 'rotate' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Surface',
        path: '/components/surface',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Tones', fragment: 'tones' },
          { label: 'Shape', fragment: 'shape' },
          { label: 'Clip', fragment: 'clip' },
          { label: 'Customization', fragment: 'customization' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Text',
        path: '/components/text',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Sizes', fragment: 'sizes' },
          { label: 'Weights', fragment: 'weights' },
          { label: 'Tones', fragment: 'tones' },
          { label: 'Transform', fragment: 'transform' },
          { label: 'Tracking', fragment: 'tracking' },
          { label: 'Measure', fragment: 'measure' },
          { label: 'Leading', fragment: 'leading' },
          { label: 'Composition', fragment: 'composition' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Title',
        path: '/components/title',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Custom Wave', fragment: 'custom-wave' },
          { label: 'Mixed Content', fragment: 'mixed-content' },
          { label: 'Customization', fragment: 'customization' },
          { label: 'API', fragment: 'api' },
        ],
      },
      { label: 'Textarea', path: '/components/textarea' },
    ],
  },
  {
    label: 'Recipes',
    items: [
      {
        label: 'Travel Card',
        path: '/recipes/travel-card',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Code', fragment: 'code' },
          { label: 'Primitives used', fragment: 'primitives' },
        ],
      },
    ],
  },
];

export const docsNavItems: readonly DocsNavItem[] = docsNavGroups.flatMap(
  (group) => group.items
);

export function findDocsNavItem(path: string): DocsNavItem | undefined {
  const normalizedPath = path.split(/[?#]/, 1)[0] || '/';

  return docsNavItems.find((item) => item.path === normalizedPath);
}
