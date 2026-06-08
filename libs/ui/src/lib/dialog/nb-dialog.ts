import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
      data-slot="dialog-surface"
      [style.background]="tone.background()"
      [style.color]="tone.foreground()"
      [style.border-color]="tone.borderColor()"
      [style.border-radius]="radius.value()"
      [style.box-shadow]="shadow.value()"
      [style.border-width]="border.width()"
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
  protected readonly tone = inject(NbToneCapability);
  protected readonly radius = inject(NbRadiusCapability);
  protected readonly shadow = inject(NbShadowCapability);
  protected readonly border = inject(NbBorderCapability);

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
