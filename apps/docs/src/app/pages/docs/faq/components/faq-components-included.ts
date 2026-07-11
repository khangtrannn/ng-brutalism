import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-faq-components-included',
  imports: [NbStat, NbSurface, RouterLink],
  template: `
    <section id="components-included">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        What components are included?
      </h2>
      <p class="mb-5 text-base font-medium">
        Every shipped component, grouped by role.
      </p>
      <div class="space-y-5">
        @for (group of componentGroups; track group.label) {
        <div>
          <p
            class="mb-3 font-mono text-xs font-bold tracking-widest uppercase opacity-60"
          >
            {{ group.label }}
          </p>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            @for (component of group.items; track component.path) {
            <a
              nbSurface
              tone="white"
              border="strong"
              padding="sm"
              layout="stack"
              interactive
              class="items-start"
              [routerLink]="component.path"
            >
              <nb-stat
                value="{{ component.label }}"
                label="{{ component.summary }}"
              />
            </a>
            }
          </div>
        </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponentsIncluded {
  protected readonly componentGroups = [
    {
      label: 'Composition',
      items: [
        {
          label: 'Surface',
          path: '/components/surface',
          summary: 'Brutalist panel',
        },
        {
          label: 'Section',
          path: '/components/section',
          summary: 'Panel regions',
        },
        {
          label: 'Stack',
          path: '/components/stack',
          summary: 'Vertical rhythm',
        },
        {
          label: 'Cluster',
          path: '/components/cluster',
          summary: 'Horizontal groups',
        },
        { label: 'Split', path: '/components/split', summary: 'Main + aside' },
        { label: 'Card', path: '/components/card', summary: 'Ready-made shell' },
        {
          label: 'Separator',
          path: '/components/separator',
          summary: 'Visual dividers',
        },
      ],
    },
    {
      label: 'Actions',
      items: [
        {
          label: 'Button',
          path: '/components/button',
          summary: 'Actions and links',
        },
        {
          label: 'Icon Button',
          path: '/components/icon-button',
          summary: 'Icon-only actions',
        },
      ],
    },
    {
      label: 'Typography',
      items: [
        { label: 'Text', path: '/components/text', summary: 'Body copy' },
        {
          label: 'Title',
          path: '/components/title',
          summary: 'Section headings',
        },
        { label: 'Display', path: '/components/display', summary: 'Hero text' },
        {
          label: 'Stat',
          path: '/components/stat',
          summary: 'Value + label pairs',
        },
      ],
    },
    {
      label: 'Forms',
      items: [
        { label: 'Input', path: '/components/input', summary: 'Form fields' },
        {
          label: 'Textarea',
          path: '/components/textarea',
          summary: 'Multi-line input',
        },
        { label: 'Checkbox', path: '/components/checkbox', summary: 'Toggles' },
        {
          label: 'Select',
          path: '/components/select',
          summary: 'Dropdown choices',
        },
        { label: 'Label', path: '/components/label', summary: 'Form labels' },
        {
          label: 'Input Group',
          path: '/components/input-group',
          summary: 'Prefix and suffix',
        },
        {
          label: 'Field',
          path: '/components/field',
          summary: 'Label + control linking',
        },
      ],
    },
    {
      label: 'Media',
      items: [
        {
          label: 'Avatar',
          path: '/components/avatar',
          summary: 'Profile images',
        },
        {
          label: 'Avatar Group',
          path: '/components/avatar-group',
          summary: 'Team stacks',
        },
        { label: 'Icon', path: '/components/icon', summary: 'SVG icons' },
        {
          label: 'Media Frame',
          path: '/components/media-frame',
          summary: 'Framed images',
        },
        {
          label: 'Media Item',
          path: '/components/media-item',
          summary: 'Icon + label rows',
        },
        {
          label: 'Image Card',
          path: '/components/image-card',
          summary: 'Image-first cards',
        },
      ],
    },
    {
      label: 'Emphasis',
      items: [
        { label: 'Badge', path: '/components/badge', summary: 'Status labels' },
        { label: 'Chip', path: '/components/chip', summary: 'Metadata tags' },
        {
          label: 'Callout',
          path: '/components/callout',
          summary: 'Highlight panels',
        },
        {
          label: 'Sticker',
          path: '/components/sticker',
          summary: 'Decorative bursts',
        },
        {
          label: 'Status Dot',
          path: '/components/status-dot',
          summary: 'State indicators',
        },
        { label: 'Rating', path: '/components/rating', summary: 'Star scores' },
        {
          label: 'Progress',
          path: '/components/progress',
          summary: 'Completion bars',
        },
        {
          label: 'Halftone',
          path: '/components/halftone',
          summary: 'Decorative dot pattern',
        },
      ],
    },
    {
      label: 'Interaction',
      items: [
        {
          label: 'Accordion',
          path: '/components/accordion',
          summary: 'Disclosure panels',
        },
        { label: 'Dialog', path: '/components/dialog', summary: 'Modal flows' },
        {
          label: 'Marquee',
          path: '/components/marquee',
          summary: 'Scrolling ticker',
        },
      ],
    },
    {
      label: 'Recipes',
      items: [
        {
          label: 'Travel Card',
          path: '/recipes/travel-card',
          summary: 'Media composition',
        },
        {
          label: 'Podcast Card',
          path: '/recipes/podcast-card',
          summary: 'Audio episode card',
        },
        {
          label: 'Open to Work',
          path: '/recipes/open-to-work-card',
          summary: 'Profile card',
        },
      ],
    },
  ];
}
