import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  PLATFORM_ID,
  contentChild,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { nbClass } from '../core/class';
import { NB_DIALOG, type NbDialogController } from './dialog.types';

@Component({
  selector: 'nb-dialog-content',
  standalone: true,
  template: `
    <dialog
      #dialogEl
      data-nb-dialog
      [class]="classes"
      (click)="onBackdropClick($event)"
    >
      <ng-content />
    </dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogContentComponent {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly dialogEl =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');

  protected readonly classes = nbClass(
    'w-full max-w-lg rounded-nb border-2 border-(--nb-border)',
    'bg-white text-(--nb-foreground)',
    'shadow-[8px_8px_0_0_var(--nb-shadow)]',
    'p-0',
    'open:flex open:flex-col'
  );

  open(): void {
    if (this.isBrowser) {
      this.dialogEl().nativeElement.showModal();
    }
  }

  close(): void {
    if (this.isBrowser) {
      this.dialogEl().nativeElement.close();
    }
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialogEl().nativeElement) {
      this.close();
    }
  }
}

@Component({
  selector: 'nb-dialog',
  standalone: true,
  imports: [NbDialogContentComponent],
  template: `<ng-content />`,
  host: { '[attr.data-slot]': '"dialog"' },
  providers: [{ provide: NB_DIALOG, useExisting: NbDialogComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogComponent implements NbDialogController {
  private readonly content = contentChild.required(NbDialogContentComponent);

  open(): void {
    this.content().open();
  }

  close(): void {
    this.content().close();
  }
}

@Directive({
  selector: '[nbDialogTrigger]',
  standalone: true,
  host: { '(click)': 'controller.open()' },
})
export class NbDialogTrigger {
  protected readonly controller = inject(NB_DIALOG);
}

@Directive({
  selector: '[nbDialogClose]',
  standalone: true,
  host: { '(click)': 'controller.close()' },
})
export class NbDialogClose {
  protected readonly controller = inject(NB_DIALOG);
}

@Component({
  selector: 'nb-dialog-header',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"dialog-header"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogHeaderComponent {
  protected readonly classes = nbClass(
    'flex flex-col gap-1.5 px-6 pt-6 pb-4',
    'border-b-2 border-(--nb-border)'
  );
}

@Component({
  selector: 'nb-dialog-title',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"dialog-title"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogTitleComponent {
  protected readonly classes = nbClass('text-lg font-bold leading-none');
}

@Component({
  selector: 'nb-dialog-description',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"dialog-description"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogDescriptionComponent {
  protected readonly classes = nbClass('text-sm font-medium text-gray-600');
}

@Component({
  selector: 'nb-dialog-footer',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"dialog-footer"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogFooterComponent {
  protected readonly classes = nbClass(
    'flex items-center justify-end gap-3 px-6 py-4',
    'border-t-2 border-(--nb-border)'
  );
}
