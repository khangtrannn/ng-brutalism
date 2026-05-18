import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { nbClass } from '../core/class';
import { NB_DIALOG, type NbDialogController } from './dialog.types';

@Component({
  selector: 'nb-dialog',
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
  host: { '[attr.data-slot]': '"dialog"' },
  providers: [{ provide: NB_DIALOG, useExisting: NbDialogComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialogComponent implements NbDialogController {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly dialogEl =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');

  protected readonly classes = nbClass(
    'w-[calc(100vw-2rem)] max-w-2xl rounded-nb border-2 border-(--nb-border)',
    'bg-white text-(--nb-foreground)',
    'shadow-[8px_8px_0_0_var(--nb-shadow)]',
    'm-auto p-0 max-h-[90vh] overflow-x-hidden',
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
