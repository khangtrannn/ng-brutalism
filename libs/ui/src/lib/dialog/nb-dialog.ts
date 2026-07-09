import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  booleanAttribute,
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
import type {
  NbBorderStrength,
  NbRadius,
  NbShadow,
  NbTone,
} from '@ng-brutalism/ui/tokens';
import { NB_DIALOG, type NbDialogController } from './dialog.types';

export type NbDialogTone = NbTone;
export type NbDialogRadius = NbRadius;
export type NbDialogShadow = NbShadow;
export type NbDialogBorder = NbBorderStrength;

@Component({
  selector: 'nb-dialog',
  exportAs: 'nbDialog',
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
  host: { 'data-slot': 'dialog' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialog implements NbDialogController {
  #isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

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
  readonly dismissible = input(true, { transform: booleanAttribute });
  readonly closed = output<void>();

  private readonly dialogEl =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');

  open(): void {
    if (this.#isBrowser) {
      this.dialogEl().nativeElement.showModal();
    }
  }

  close(): void {
    if (this.#isBrowser) {
      this.dialogEl().nativeElement.close();
    }
  }

  protected dismissOnBackdrop(event: MouseEvent): void {
    if (this.dismissible() && event.target === this.dialogEl().nativeElement) {
      this.close();
    }
  }
}
