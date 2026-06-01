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
import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { NB_DIALOG, type NbDialogController } from './dialog.types';

@Component({
  selector: 'nb-dialog',
  template: `
    <dialog
      #dialogEl
      data-nb-dialog
      [class]="classes"
      (click)="dismissOnBackdrop($event)"
    >
      <ng-content />
    </dialog>
  `,
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'dialog' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'white',
        radius: 'sm',
        shadow: 'hard',
        border: 'default',
      } satisfies NbStyleDefaults,
    },
    { provide: NB_DIALOG, useExisting: NbDialog },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: { '[attr.data-slot]': '"dialog"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialog implements NbDialogController {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly dialogEl =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');

  protected readonly classes = nbClass(
    'w-[calc(100vw-2rem)] max-w-2xl',
    'border-(--nb-dialog-border-color)',
    'bg-(--nb-dialog-bg) text-(--nb-dialog-fg)',
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

  protected dismissOnBackdrop(event: MouseEvent): void {
    if (event.target === this.dialogEl().nativeElement) {
      this.close();
    }
  }
}
