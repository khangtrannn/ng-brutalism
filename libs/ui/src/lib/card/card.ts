import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';

export type NbCardActionsAlign = 'start' | 'end';

@Component({
  selector: 'nb-card',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardComponent {
  protected readonly classes = nbClass(
    '[--nb-card-bg:var(--nb-background)]',
    '[--nb-card-fg:var(--nb-foreground)]',
    '[--nb-card-border:var(--nb-border)]',
    '[--nb-card-radius:18px]',
    '[--nb-card-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
    'flex flex-col gap-6 py-6',
    'rounded-(--nb-card-radius) border-2 border-(--nb-card-border)',
    'bg-(--nb-card-bg) text-(--nb-card-fg)',
    'shadow-[var(--nb-card-shadow)] font-medium'
  );
}

@Component({
  selector: 'nb-card-header',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-header"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardHeaderComponent {
  protected readonly classes = nbClass(
    'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6',
    '[.border-b]:pb-6'
  );
}

@Component({
  selector: 'nb-card-title',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-title"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardTitleComponent {
  protected readonly classes = nbClass('font-bold leading-none');
}

@Component({
  selector: 'nb-card-description',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-description"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardDescriptionComponent {
  protected readonly classes = nbClass('text-sm font-medium');
}

@Component({
  selector: 'nb-card-actions',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"card-actions"',
    '[attr.data-align]': 'align()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardActionsComponent {
  readonly align = input<NbCardActionsAlign>('start');

  protected readonly classes = computed(() =>
    nbClass(
      'flex flex-wrap items-center gap-3 px-6',
      '[[data-slot=card-footer]_&]:px-0',
      this.align() === 'end' ? 'justify-end' : 'justify-start'
    )
  );
}

@Component({
  selector: 'nb-card-content',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-content"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardContentComponent {
  protected readonly classes = nbClass('px-6');
}

@Component({
  selector: 'nb-card-footer',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-footer"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardFooterComponent {
  protected readonly classes = nbClass(
    'flex items-center px-6',
    'has-[[data-slot=card-actions]]:flex-wrap',
    'has-[[data-slot=card-actions]]:justify-between',
    'has-[[data-slot=card-actions]]:gap-4',
    '[.border-t]:pt-6'
  );
}
