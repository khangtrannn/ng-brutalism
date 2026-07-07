import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  booleanAttribute,
  input,
} from '@angular/core';
import { NbToneCapability } from '../core/capabilities';
import type { NbTone } from '@ng-brutalism/ui/tokens';

export type NbMediaItemVariant = 'plain' | 'boxed' | 'chip';

export type NbMediaItemOrientation = 'horizontal' | 'vertical';

export type NbMediaItemAlign = 'start' | 'center' | 'between';

export type NbMediaItemSize = 'xs' | 'sm' | 'md' | 'lg';

// Tone is the shared color vocabulary; MediaItem does not redefine it.
export type NbMediaItemTone = NbTone;

@Component({
  selector: 'nb-media-item, [nbMediaItem]',
  exportAs: 'nbMediaItem',
  template: `
    @if (icon()) { @if (iconBackground()) {
    <span
      data-nb-media-item-icon
      data-surface="true"
      [style.--nb-media-item-icon-bg]="iconBackground()"
    >
      <img [src]="icon()" [alt]="iconAlt()" />
    </span>
    } @else {
    <img [src]="icon()" [alt]="iconAlt()" />
    } } @else {
    <ng-content
      select="nb-media-item-icon, [nbMediaItemIcon], [nbSurface], img, svg"
    />
    }

    <div data-nb-media-item-content>
      @if (title()) {
      <span data-nb-media-item-title>{{ title() }}</span>
      } @else {
      <ng-content select="nb-media-item-title, [nbMediaItemTitle]" />
      } @if (description()) {
      <span data-nb-media-item-description>{{ description() }}</span>
      } @else {
      <ng-content
        select="nb-media-item-description, [nbMediaItemDescription]"
      />
      } @if (!title() && !description()) {
      <ng-content />
      }
    </div>

    <ng-content select="nb-media-item-action, [nbMediaItemAction]" />
  `,
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-nb-media-item]': '""',
    '[attr.data-variant]': 'variant()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-align]': 'align()',
    '[attr.data-size]': 'size()',
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
}

@Directive({
  selector: 'nb-media-item-icon, [nbMediaItemIcon]',
  exportAs: 'nbMediaItemIcon',
  host: {
    '[attr.data-nb-media-item-icon]': '""',
    '[attr.data-surface]': 'surface()',
    '[style.--nb-media-item-icon-bg]': 'surface() ? background() : null',
  },
})
export class NbMediaItemIcon {
  readonly surface = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly background = input<string>('var(--nb-surface)');
}

@Directive({
  selector: 'nb-media-item-title, [nbMediaItemTitle]',
  exportAs: 'nbMediaItemTitle',
  host: {
    '[attr.data-nb-media-item-title]': '""',
  },
})
export class NbMediaItemTitle {}

@Directive({
  selector: 'nb-media-item-description, [nbMediaItemDescription]',
  exportAs: 'nbMediaItemDescription',
  host: {
    '[attr.data-nb-media-item-description]': '""',
  },
})
export class NbMediaItemDescription {}
