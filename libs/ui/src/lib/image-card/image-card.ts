import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-image-card',
  standalone: true,
  template: `
    <img
      [src]="image()"
      [alt]="alt()"
      [class]="imageClasses"
      loading="lazy"
      decoding="async"
    />
    <ng-content select="nb-image-card-caption" />
  `,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"image-card"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbImageCard {
  readonly image = input.required<string>();
  readonly alt = input.required<string>();

  protected readonly classes = nbClass(
    '[--nb-image-card-bg:var(--nb-background)]',
    '[--nb-image-card-fg:var(--nb-foreground)]',
    '[--nb-image-card-border:var(--nb-border)]',
    '[--nb-image-card-radius:var(--nb-radius)]',
    '[--nb-image-card-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
    'flex flex-col overflow-hidden',
    'rounded-(--nb-image-card-radius) border-2 border-(--nb-image-card-border)',
    'bg-(--nb-image-card-bg) text-(--nb-image-card-fg)',
    'shadow-[var(--nb-image-card-shadow)] font-medium'
  );

  protected readonly imageClasses = nbClass('block w-full h-auto');
}

@Component({
  selector: 'nb-image-card-caption',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"image-card-caption"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbImageCardCaption {
  protected readonly classes = nbClass(
    'border-t-2 border-(--nb-image-card-border)',
    'px-6 py-4 text-center font-bold text-base'
  );
}
