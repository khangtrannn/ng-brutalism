import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { nbBorderWidthValue, type NbBorderStrength } from '../tokens/border';
import { nbRadiusValue, type NbRadius } from '../tokens/radius';
import { nbShadowValue, type NbShadow } from '../tokens/shadow';
import { nbToneVars, type NbToneToken } from '../tokens/tone';
import { NB_DIALOG, type NbDialogController } from './dialog.types';

@Component({
  selector: 'nb-dialog',
  template: `
    <dialog
      #dialogEl
      data-nb-dialog
      data-slot="dialog-surface"
      [style.background]="background()"
      [style.color]="foreground()"
      [style.border-color]="borderColor()"
      [style.border-radius]="radiusStyle()"
      [style.box-shadow]="shadowStyle()"
      [style.border-width]="borderWidthStyle()"
      (click)="dismissOnBackdrop($event)"
    >
      <ng-content />
    </dialog>
  `,
  providers: [{ provide: NB_DIALOG, useExisting: NbDialog }],
  host: { '[attr.data-slot]': '"dialog"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDialog implements NbDialogController {
  // The dialog surface is an inner element, so it resolves the style tokens
  // itself rather than composing the host-painting capabilities.
  readonly tone = input<NbToneToken | undefined>(undefined);
  readonly radius = input<NbRadius | undefined>(undefined);
  readonly shadow = input<NbShadow | undefined>(undefined);
  readonly border = input<NbBorderStrength | undefined>(undefined);

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  protected readonly background = computed(() => this.toneVars()?.bg ?? null);
  protected readonly foreground = computed(() => this.toneVars()?.fg ?? null);
  protected readonly borderColor = computed(
    () => this.toneVars()?.borderColor ?? null,
  );
  protected readonly radiusStyle = computed(() => {
    const radius = this.radius();
    return radius ? nbRadiusValue(radius) : null;
  });
  protected readonly shadowStyle = computed(() => {
    const shadow = this.shadow();
    return shadow ? nbShadowValue(shadow) : null;
  });
  protected readonly borderWidthStyle = computed(() => {
    const border = this.border();
    return border ? nbBorderWidthValue(border) : null;
  });

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
