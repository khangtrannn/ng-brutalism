import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  computed,
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
      [style.background]="backgroundStyle()"
      [style.color]="foregroundStyle()"
      [style.border-color]="borderColorStyle()"
      [style.border-radius]="radiusStyle()"
      [style.box-shadow]="shadowStyle()"
      [style.border-width]="borderWidthStyle()"
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
  private readonly tone = inject(NbToneCapability);
  private readonly radius = inject(NbRadiusCapability);
  private readonly shadow = inject(NbShadowCapability);
  private readonly border = inject(NbBorderCapability);

  protected readonly backgroundStyle = computed(() => this.tone.background());
  protected readonly foregroundStyle = computed(() => this.tone.foreground());
  protected readonly borderColorStyle = computed(() => this.tone.borderColor());
  protected readonly radiusStyle = computed(() => this.radius.value());
  protected readonly shadowStyle = computed(() => this.shadow.value());
  protected readonly borderWidthStyle = computed(() => this.border.width());

  protected readonly classes = nbClass(
    'w-[calc(100vw-2rem)] max-w-2xl',
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
