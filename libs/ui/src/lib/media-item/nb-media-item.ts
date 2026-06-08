import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbToneToken } from '../tokens/tone';

export type NbMediaItemVariant = 'plain' | 'boxed' | 'chip';

export type NbMediaItemOrientation = 'horizontal' | 'vertical';

export type NbMediaItemAlign = 'start' | 'center' | 'between';

export type NbMediaItemSize = 'xs' | 'sm' | 'md' | 'lg';

// Tone is the shared color vocabulary; MediaItem does not redefine it.
export type NbMediaItemTone = NbToneToken;

@Component({
  selector: 'nb-media-item, [nbMediaItem]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'media-item' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { tone: 'default' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  template: `
    @if (icon()) {
      @if (iconBackground()) {
        <span
          data-nb-media-item-icon
          data-surface="true"
          [attr.data-background]="iconBackground()"
          [style.--nb-media-item-icon-bg]="iconBackground()"
        >
          <img [src]="icon()" [alt]="iconAlt()" />
        </span>
      } @else {
        <img [src]="icon()" [alt]="iconAlt()" />
      }
    } @else {
      <ng-content select="nb-media-item-icon, [nbMediaItemIcon], [nbSurface], img, svg" />
    }

    <div data-nb-media-item-content>
      @if (title()) {
        <span data-nb-media-item-title>{{ title() }}</span>
      } @else {
        <ng-content select="nb-media-item-title, [nbMediaItemTitle]" />
      }
      @if (description()) {
        <span data-nb-media-item-description>{{ description() }}</span>
      } @else {
        <ng-content select="nb-media-item-description, [nbMediaItemDescription]" />
      }
      @if (!title() && !description()) {
        <ng-content />
      }
    </div>

    <ng-content select="nb-media-item-action, [nbMediaItemAction]" />
  `,
  host: {
    '[attr.data-nb-media-item]': '""',
    '[attr.data-variant]': 'variant()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-align]': 'align()',
    '[attr.data-size]': 'size()',
    '[style.background]': 'backgroundStyle()',
    '[style.color]': 'tone.foreground()',
    '[style.border-color]': 'borderColorStyle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbMediaItem {
  readonly variant = input<NbMediaItemVariant>('plain');
  readonly orientation = input<NbMediaItemOrientation>('horizontal');
  readonly align = input<NbMediaItemAlign>('start');
  readonly size = input<NbMediaItemSize>('md');
  readonly icon = input<string | undefined>(undefined);
  readonly iconAlt = input<string>('');
  readonly iconBackground = input<string | undefined>(undefined);
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);

  protected readonly tone = inject(NbToneCapability);

  // The `plain` variant has no surface (transparent background, no border), so
  // tone-driven background/border only apply to `boxed`/`chip`. When unset,
  // returning null lets the variant's `bg-[var(--nb-media-item-bg)]` /
  // `border-[var(--nb-media-item-border-color)]` classes read the public hooks.
  protected readonly backgroundStyle = computed(() =>
    this.variant() === 'plain' ? null : this.tone.background()
  );
  protected readonly borderColorStyle = computed(() =>
    this.variant() === 'plain' ? null : this.tone.borderColor()
  );

}

@Directive({
  selector: 'nb-media-item-icon, [nbMediaItemIcon]',
  host: {
    '[attr.data-nb-media-item-icon]': '""',
    '[attr.data-surface]': 'surface()',
    '[attr.data-background]': 'surface() ? background() : null',
    '[style.--nb-media-item-icon-bg]': 'surface() ? background() : null',
  },
})
export class NbMediaItemIcon {
  readonly surface = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly background = input<string>('var(--nb-surface)');
}

@Directive({
  selector: 'nb-media-item-title, [nbMediaItemTitle]',
  host: {
    '[attr.data-nb-media-item-title]': '""',
  },
})
export class NbMediaItemTitle {}

@Directive({
  selector: 'nb-media-item-description, [nbMediaItemDescription]',
  host: {
    '[attr.data-nb-media-item-description]': '""',
  },
})
export class NbMediaItemDescription {}
