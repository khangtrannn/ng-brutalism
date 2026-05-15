import { ChangeDetectionStrategy, Component } from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'neo-card',
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
    'flex flex-col gap-6 py-6',
    'rounded-nb border-2 border-(--nb-border)',
    'bg-(--nb-background) text-(--nb-foreground)',
    'shadow-nb font-medium'
  );
}

@Component({
  selector: 'neo-card-header',
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
    'has-[[data-slot=card-action]]:grid-cols-[1fr_auto]',
    '[.border-b]:pb-6'
  );
}

@Component({
  selector: 'neo-card-title',
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
  selector: 'neo-card-description',
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
  selector: 'neo-card-action',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"card-action"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCardActionComponent {
  protected readonly classes = nbClass(
    'col-start-2 row-span-2 row-start-1 self-start justify-self-end'
  );
}

@Component({
  selector: 'neo-card-content',
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
  selector: 'neo-card-footer',
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
    '[.border-t]:pt-6'
  );
}
