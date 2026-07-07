import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import type { NbBorderStrength } from '../tokens/border';
import type { NbRadius } from '../tokens/radius';
import type { NbShadow } from '../tokens/shadow';
import type { NbTone } from '../tokens/tone';
import { NB_DIALOG, type NbDialogController } from './dialog.types';

export type NbDialogTone = NbTone;
export type NbDialogRadius = NbRadius;
export type NbDialogShadow = NbShadow;
export type NbDialogBorder = NbBorderStrength;

@Component({
  selector: 'nb-dialog',
  template: `
    <dialog
      #dialogEl
      data-nb-dialog
      data-slot="dialog-surface"
      [attr.data-nb-tone]="tone() ?? null"
      [style.--nb-dialog-radius]="radius()"
      [style.--nb-dialog-shadow]="shadow()"
      [style.--nb-dialog-border-width]="border()"
      (click)="dismissOnBackdrop($event)"
      (close)="closed.emit()"
    >
      <ng-content />
    </dialog>
  `,
  providers: [{ provide: NB_DIALOG, useExisting: NbDialog }],
  host: { '[attr.data-slot]': '"dialog"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialog implements NbDialogController {
  readonly tone = input<NbTone | undefined>(undefined);
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
  readonly closed = output<void>();

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly dialogEl =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');

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
