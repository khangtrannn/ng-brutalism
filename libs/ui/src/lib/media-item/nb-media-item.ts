import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { nbClass } from '../core/class';
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
          [class]="iconClasses()"
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

    <div data-nb-media-item-content class="min-w-0">
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
    '[class]': 'classes()',
    '[attr.data-nb-media-item]': '""',
    '[attr.data-variant]': 'variant()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-align]': 'align()',
    '[attr.data-size]': 'size()',
    '[style.background]': 'backgroundStyle()',
    '[style.color]': 'foregroundStyle()',
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

  private readonly tone = inject(NbToneCapability);

  // The `plain` variant has no surface (transparent background, no border), so
  // tone-driven background/border only apply to `boxed`/`chip`. When unset,
  // returning null lets the variant's `bg-[var(--nb-media-item-bg)]` /
  // `border-[var(--nb-media-item-border-color)]` classes read the public hooks.
  protected readonly backgroundStyle = computed(() =>
    this.variant() === 'plain' ? null : this.tone.background()
  );
  protected readonly foregroundStyle = computed(() => this.tone.foreground());
  protected readonly borderColorStyle = computed(() =>
    this.variant() === 'plain' ? null : this.tone.borderColor()
  );

  protected readonly classes = computed(() =>
    nbClass(
      'relative min-w-0',
      'inline-flex font-bold leading-tight',
      '[--nb-media-item-description-opacity:0.7]',
      '[&_svg]:shrink-0 [&_img]:shrink-0 [&_[data-nb-media-item-icon]]:shrink-0 [&_[nbSurface]]:shrink-0',
      '[&_svg]:rounded-[calc(var(--nb-media-item-radius)-0.25rem)]',
      '[&_img]:rounded-[calc(var(--nb-media-item-radius)-0.25rem)]',
      '[&_svg]:h-[var(--nb-media-item-icon-size)] [&_svg]:max-w-[var(--nb-media-item-icon-size)] [&_svg]:w-auto',
      '[&_img]:h-[var(--nb-media-item-icon-size)] [&_img]:max-w-[var(--nb-media-item-icon-size)] [&_img]:w-auto [&_img]:object-contain',
      '[&_[data-nb-media-item-title]]:block',
      '[&_[data-nb-media-item-title]]:[font-family:var(--nb-media-item-title-font-family,inherit)]',
      '[&_[data-nb-media-item-title]]:font-black',
      '[&_[data-nb-media-item-title]]:leading-none',
      '[&_[data-nb-media-item-title]]:text-[length:var(--nb-media-item-title-size,var(--nb-media-item-title-default-size))]',
      '[&_[data-nb-media-item-description]]:mt-1',
      '[&_[data-nb-media-item-description]]:block',
      '[&_[data-nb-media-item-description]]:text-[length:var(--nb-media-item-description-size,var(--nb-media-item-description-default-size))]',
      '[&_[data-nb-media-item-description]]:font-bold',
      '[&_[data-nb-media-item-description]]:leading-none',
      '[&_[data-nb-media-item-description]]:opacity-[var(--nb-media-item-description-opacity)]',
      this.variantClass(),
      this.orientationClass(),
      this.alignClass(),
      this.sizeClass()
    )
  );

  protected readonly iconClasses = computed(() => mediaItemIconClasses());

  private variantClass(): string {
    const map: Record<NbMediaItemVariant, string> = {
      plain: '[--nb-media-item-radius:var(--nb-radius)] bg-transparent',
      boxed:
        'border-[var(--nb-border-width)] border-[var(--nb-media-item-border-color)] bg-[var(--nb-media-item-bg)] shadow-[var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_0_var(--nb-shadow)] [--nb-media-item-radius:var(--nb-radius)] rounded-[var(--nb-media-item-radius)]',
      chip: 'border-[var(--nb-border-width)] border-[var(--nb-media-item-border-color)] bg-[var(--nb-media-item-bg)] [--nb-media-item-radius:9999px] rounded-[var(--nb-media-item-radius)]',
    };
    return map[this.variant()];
  }

  private orientationClass(): string {
    const map: Record<NbMediaItemOrientation, string> = {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col',
    };
    return map[this.orientation()];
  }

  private alignClass(): string {
    const map: Record<NbMediaItemAlign, string> = {
      start: 'justify-start text-left',
      center: 'justify-center text-center',
      between: 'w-full justify-between',
    };
    return map[this.align()];
  }

  private sizeClass(): string {
    const map: Record<NbMediaItemSize, string> = {
      xs: nbClass(
        'gap-[var(--nb-media-item-gap)] text-[0.6875rem]',
        '[--nb-media-item-gap:0.375rem]',
        '[--nb-media-item-icon-size:1rem]',
        '[--nb-media-item-surface-size:2rem]',
        '[--nb-media-item-title-default-size:0.75rem]',
        '[--nb-media-item-description-default-size:0.5625rem]',
        this.variant() === 'plain' ? '' : 'px-2 py-1'
      ),
      sm: nbClass(
        'gap-[var(--nb-media-item-gap)] text-xs',
        '[--nb-media-item-gap:0.5rem]',
        '[--nb-media-item-icon-size:1rem]',
        '[--nb-media-item-surface-size:2.25rem]',
        '[--nb-media-item-title-default-size:0.75rem]',
        '[--nb-media-item-description-default-size:0.625rem]',
        this.variant() === 'plain' ? '' : 'px-2.5 py-1.5'
      ),
      md: nbClass(
        'gap-[var(--nb-media-item-gap)] text-sm',
        '[--nb-media-item-gap:0.75rem]',
        '[--nb-media-item-icon-size:1.25rem]',
        '[--nb-media-item-surface-size:2.75rem]',
        '[--nb-media-item-title-default-size:0.875rem]',
        '[--nb-media-item-description-default-size:0.65625rem]',
        this.variant() === 'plain' ? '' : 'px-3 py-2'
      ),
      lg: nbClass(
        'gap-[var(--nb-media-item-gap)] text-base',
        '[--nb-media-item-gap:1rem]',
        '[--nb-media-item-icon-size:1.5rem]',
        '[--nb-media-item-surface-size:3.25rem]',
        '[--nb-media-item-title-default-size:1rem]',
        '[--nb-media-item-description-default-size:0.75rem]',
        this.variant() === 'plain' ? '' : 'px-4 py-3'
      ),
    };
    return map[this.size()];
  }
}

@Directive({
  selector: 'nb-media-item-icon, [nbMediaItemIcon]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-media-item-icon]': '""',
    '[attr.data-surface]': 'surface()',
    '[attr.data-background]': 'surface() ? background() : null',
    '[style.--nb-media-item-icon-bg]': 'surface() ? background() : null',
  },
})
export class NbMediaItemIcon {
  readonly surface = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly background = input<string>('var(--nb-surface)');

  protected readonly classes = computed(() =>
    nbClass('shrink-0', this.surface() && mediaItemIconClasses())
  );
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

function mediaItemIconClasses(): string {
  return nbClass(
    'relative inline-flex size-[var(--nb-media-item-surface-size)] items-center justify-center',
    'rounded-lg border-[var(--nb-border-width)] border-[var(--nb-border)]',
    'bg-(--nb-media-item-icon-bg) text-black'
  );
}
