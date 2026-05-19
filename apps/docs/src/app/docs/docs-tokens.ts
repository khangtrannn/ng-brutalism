import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type DocsTokenComponent =
  | 'accordion'
  | 'avatar'
  | 'badge'
  | 'button'
  | 'card'
  | 'checkbox'
  | 'dialog'
  | 'image-card'
  | 'input'
  | 'input-group'
  | 'label'
  | 'marquee'
  | 'select'
  | 'theme'
  | 'title'
  | 'textarea';

interface DocsToken {
  name: string;
  defaultValue: string;
  usage: string;
}

const sharedTokens: DocsToken[] = [
  {
    name: '--nb-border',
    defaultValue: '#000000',
    usage: 'Border color and focus ring color',
  },
  {
    name: '--nb-shadow',
    defaultValue: '#000000',
    usage: 'Offset shadow color',
  },
  {
    name: '--nb-radius',
    defaultValue: '0rem',
    usage: 'Corner radius through the rounded-nb utility',
  },
  {
    name: '--nb-shadow-offset-x',
    defaultValue: '4px',
    usage: 'Horizontal shadow and press offset',
  },
  {
    name: '--nb-shadow-offset-y',
    defaultValue: '4px',
    usage: 'Vertical shadow and press offset',
  },
  {
    name: '--nb-foreground',
    defaultValue: '#000000',
    usage: 'Default foreground text color',
  },
  {
    name: '--nb-background',
    defaultValue: '#ffffff',
    usage: 'Default surface background color',
  },
];

const componentTokens: Record<DocsTokenComponent, DocsToken[]> = {
  accordion: [
    {
      name: '--nb-main',
      defaultValue: 'oklch(90% 0.15 95)',
      usage: 'Trigger background',
    },
    {
      name: '--nb-main-foreground',
      defaultValue: 'oklch(10% 0 0)',
      usage: 'Trigger text color',
    },
    {
      name: '--nb-surface',
      defaultValue: '#ffffff',
      usage: 'Item and panel background',
    },
    {
      name: '--nb-surface-foreground',
      defaultValue: '#000000',
      usage: 'Item and panel text color',
    },
  ],
  avatar: [
    {
      name: '--nb-secondary-background',
      defaultValue: 'oklch(96% 0 0)',
      usage: 'Fallback background',
    },
  ],
  badge: [
    {
      name: '--nb-accent',
      defaultValue: '#8ae9ff',
      usage: 'Secondary variant background',
    },
    {
      name: '--nb-accent-foreground',
      defaultValue: '#000000',
      usage: 'Secondary variant text color',
    },
    {
      name: '--nb-success',
      defaultValue: '#63e6be',
      usage: 'Success variant background',
    },
    {
      name: '--nb-success-foreground',
      defaultValue: '#000000',
      usage: 'Success variant text color',
    },
    {
      name: '--nb-warning',
      defaultValue: '#ffd24a',
      usage: 'Warning variant background',
    },
    {
      name: '--nb-warning-foreground',
      defaultValue: '#000000',
      usage: 'Warning variant text color',
    },
    {
      name: '--nb-danger',
      defaultValue: '#ff4f8a',
      usage: 'Destructive variant background',
    },
    {
      name: '--nb-danger-foreground',
      defaultValue: '#000000',
      usage: 'Destructive variant text color',
    },
  ],
  button: [
    {
      name: '--nb-button-bg',
      defaultValue: 'var(--nb-main)',
      usage: 'Button background, reassigned by variant',
    },
    {
      name: '--nb-button-fg',
      defaultValue: 'var(--nb-main-foreground)',
      usage: 'Button text and icon color, reassigned by variant',
    },
    {
      name: '--nb-button-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Button border color',
    },
    {
      name: '--nb-button-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Button corner radius',
    },
    {
      name: '--nb-button-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Button box shadow, reassigned by shadow',
    },
  ],
  card: [
    {
      name: '--nb-card-bg',
      defaultValue: 'var(--nb-background)',
      usage: 'Card background',
    },
    {
      name: '--nb-card-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Card text color',
    },
    {
      name: '--nb-card-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Card border color',
    },
    {
      name: '--nb-card-radius',
      defaultValue: '18px',
      usage: 'Card corner radius',
    },
    {
      name: '--nb-card-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Card box shadow',
    },
  ],
  checkbox: [
    {
      name: '--nb-main',
      defaultValue: 'oklch(90% 0.15 95)',
      usage: 'Checked background',
    },
  ],
  dialog: [
    {
      name: '--nb-dialog-bg',
      defaultValue: '#fff',
      usage: 'Dialog background',
    },
    {
      name: '--nb-dialog-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Dialog text color',
    },
    {
      name: '--nb-dialog-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Dialog border color',
    },
    {
      name: '--nb-dialog-radius',
      defaultValue: '0.5rem',
      usage: 'Dialog corner radius',
    },
    {
      name: '--nb-dialog-shadow',
      defaultValue: '8px 8px 0 0 var(--nb-shadow)',
      usage: 'Dialog box shadow',
    },
    {
      name: '--nb-dialog-description-fg',
      defaultValue: '#4b5563',
      usage: 'Description text color',
    },
    {
      name: '--nb-dialog-content-bg',
      defaultValue: 'transparent',
      usage: 'Content area background',
    },
    {
      name: '--nb-dialog-actions-bg',
      defaultValue: 'transparent',
      usage: 'Actions area background',
    },
  ],
  'image-card': [],
  input: [
    {
      name: '--nb-input-bg',
      defaultValue: 'var(--nb-field-bg)',
      usage: 'Input background',
    },
    {
      name: '--nb-input-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Input text color',
    },
    {
      name: '--nb-input-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Input border and focus ring color',
    },
    {
      name: '--nb-input-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Input corner radius',
    },
    {
      name: '--nb-input-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Input box shadow',
    },
  ],
  'input-group': [
    {
      name: '--nb-input-group-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Group wrapper background',
    },
    {
      name: '--nb-input-group-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Group wrapper border and focus ring color',
    },
    {
      name: '--nb-input-group-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Group wrapper corner radius',
    },
    {
      name: '--nb-input-group-addon-bg',
      defaultValue: 'var(--nb-yellow)',
      usage: 'Prefix and suffix background',
    },
    {
      name: '--nb-input-group-prefix-bg',
      defaultValue: 'var(--nb-input-group-addon-bg)',
      usage: 'Prefix background',
    },
    {
      name: '--nb-input-group-suffix-bg',
      defaultValue: 'var(--nb-input-group-addon-bg)',
      usage: 'Suffix background',
    },
  ],
  label: [
    {
      name: '--nb-font-weight-bold',
      defaultValue: '700',
      usage: 'Label font weight token',
    },
  ],
  marquee: [
    {
      name: '--nb-marquee-duration',
      defaultValue: '5s',
      usage: 'Computed animation duration',
    },
  ],
  select: [
    {
      name: '--nb-select-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Select background',
    },
    {
      name: '--nb-select-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Select text and icon color',
    },
    {
      name: '--nb-select-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Select border and focus ring color',
    },
    {
      name: '--nb-select-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Select corner radius',
    },
    {
      name: '--nb-select-listbox-bg',
      defaultValue: 'var(--nb-surface, #ffffff)',
      usage: 'Custom select listbox background',
    },
  ],
  theme: [
    {
      name: '--nb-field-bg',
      defaultValue: '#faf3d6',
      usage: 'Shared field background',
    },
    {
      name: '--nb-primary',
      defaultValue: '#ff90e8',
      usage: 'Primary accent color',
    },
    {
      name: '--nb-primary-foreground',
      defaultValue: '#000000',
      usage: 'Text on primary surfaces',
    },
    {
      name: '--nb-secondary',
      defaultValue: '#ffd84d',
      usage: 'Secondary accent color',
    },
    {
      name: '--nb-secondary-foreground',
      defaultValue: '#000000',
      usage: 'Text on secondary surfaces',
    },
    {
      name: '--nb-yellow',
      defaultValue: '#ffd24a',
      usage: 'Yellow accent and select icons',
    },
    {
      name: '--nb-accent',
      defaultValue: '#8ae9ff',
      usage: 'Accent color',
    },
    {
      name: '--nb-accent-foreground',
      defaultValue: '#000000',
      usage: 'Text on accent surfaces',
    },
    {
      name: '--nb-danger',
      defaultValue: '#ff6b6b',
      usage: 'Danger and destructive states',
    },
    {
      name: '--nb-danger-foreground',
      defaultValue: '#000000',
      usage: 'Text on danger surfaces',
    },
    {
      name: '--nb-success',
      defaultValue: '#a8ff78',
      usage: 'Success states',
    },
    {
      name: '--nb-success-foreground',
      defaultValue: '#000000',
      usage: 'Text on success surfaces',
    },
    {
      name: '--nb-warning',
      defaultValue: '#ffda6a',
      usage: 'Warning states',
    },
    {
      name: '--nb-warning-foreground',
      defaultValue: '#000000',
      usage: 'Text on warning surfaces',
    },
    {
      name: '--nb-main',
      defaultValue: 'oklch(90% 0.15 95)',
      usage: 'Strong component fills',
    },
    {
      name: '--nb-main-foreground',
      defaultValue: 'oklch(10% 0 0)',
      usage: 'Text on main fills',
    },
    {
      name: '--nb-surface',
      defaultValue: '#ffffff',
      usage: 'Component surface background',
    },
    {
      name: '--nb-surface-foreground',
      defaultValue: '#000000',
      usage: 'Text on component surfaces',
    },
    {
      name: '--nb-secondary-background',
      defaultValue: 'oklch(96% 0 0)',
      usage: 'Subtle secondary backgrounds',
    },
    {
      name: '--nb-border-width',
      defaultValue: '2px',
      usage: 'Border width token available to consumers',
    },
    {
      name: '--nb-reverse-shadow-offset-x',
      defaultValue: '-4px',
      usage: 'Reverse shadow horizontal offset',
    },
    {
      name: '--nb-reverse-shadow-offset-y',
      defaultValue: '-4px',
      usage: 'Reverse shadow vertical offset',
    },
    {
      name: '--nb-size-sm',
      defaultValue: '2rem',
      usage: 'Small size scale token',
    },
    {
      name: '--nb-size-md',
      defaultValue: '2.5rem',
      usage: 'Medium size scale token',
    },
    {
      name: '--nb-size-lg',
      defaultValue: '3rem',
      usage: 'Large size scale token',
    },
    {
      name: '--nb-font-sans',
      defaultValue: 'system-ui, sans-serif',
      usage: 'Default body font',
    },
    {
      name: '--nb-font-mono',
      defaultValue: 'monospace',
      usage: 'Monospace font token',
    },
    {
      name: '--nb-font-weight-normal',
      defaultValue: '500',
      usage: 'Default body font weight',
    },
    {
      name: '--nb-font-weight-bold',
      defaultValue: '700',
      usage: 'Bold component font weight',
    },
    {
      name: '--nb-focus-ring',
      defaultValue: '3px solid var(--nb-foreground)',
      usage: 'Focus outline utility',
    },
    {
      name: '--nb-focus-ring-offset',
      defaultValue: '2px',
      usage: 'Focus outline offset',
    },
  ],
  title: [
    {
      name: '--nb-title-wave-width',
      defaultValue: 'min(18rem, 100%)',
      usage: 'Underline width',
    },
    {
      name: '--nb-title-wave-height',
      defaultValue: '0.625rem',
      usage: 'Underline height',
    },
    {
      name: '--nb-title-wave-gap',
      defaultValue: '0',
      usage: 'Space between title text and underline',
    },
    {
      name: '--nb-title-wave-color',
      defaultValue: '#a78bfa',
      usage: 'Underline color',
    },
  ],
  textarea: [
    {
      name: '--nb-textarea-bg',
      defaultValue: 'var(--nb-input-bg, var(--nb-field-bg))',
      usage: 'Textarea background',
    },
    {
      name: '--nb-textarea-fg',
      defaultValue: 'var(--nb-foreground)',
      usage: 'Textarea text color',
    },
    {
      name: '--nb-textarea-border',
      defaultValue: 'var(--nb-border)',
      usage: 'Textarea border and focus ring color',
    },
    {
      name: '--nb-textarea-radius',
      defaultValue: 'var(--nb-radius)',
      usage: 'Textarea corner radius',
    },
    {
      name: '--nb-textarea-shadow',
      defaultValue:
        'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)',
      usage: 'Textarea box shadow',
    },
    {
      name: '--nb-input-bg',
      defaultValue: 'var(--nb-field-bg)',
      usage: 'Shared field background consumed by the textarea default',
    },
  ],
};

@Component({
  selector: 'docs-tokens',
  standalone: true,
  template: `
    <section id="customization">
      <h2 class="mt-10 mb-4 text-2xl font-bold">Customization</h2>
      <p class="mb-5 text-base font-medium">
        Override these CSS variables on <code>:root</code>, a wrapper, or the
        component element. More local values win, so per-instance styling can
        sit directly on the element.
      </p>

      <div
        class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
      >
        <table class="w-full border-collapse text-left">
          <thead class="bg-nb-secondary text-nb-secondary-fg">
            <tr>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                Token
              </th>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                Default
              </th>
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Used for
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            @for (token of tokens(); track token.name) {
            <tr class="border-b-2 border-(--nb-border) last:border-b-0">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                {{ token.name }}
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                {{ token.defaultValue }}
              </td>
              <td class="px-4 py-3">
                {{ token.usage }}
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsTokens {
  readonly component = input.required<DocsTokenComponent>();

  protected tokens(): DocsToken[] {
    if (this.component() === 'theme') {
      return [...sharedTokens, ...componentTokens.theme];
    }

    return [...componentTokens[this.component()], ...sharedTokens];
  }
}
