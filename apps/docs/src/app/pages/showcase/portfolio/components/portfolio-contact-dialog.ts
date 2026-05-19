import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  NbButton,
  NbDialog,
  NbDialogActions,
  NbDialogClose,
  NbDialogContent,
  NbDialogDescription,
  NbDialogTitle,
  NbInput,
  NbLabel,
  NbTextarea,
} from '@ng-brutalism/ui';

@Component({
  selector: 'docs-portfolio-contact-dialog',
  standalone: true,
  imports: [
    NbButton,
    NbDialog,
    NbDialogActions,
    NbDialogClose,
    NbDialogContent,
    NbDialogDescription,
    NbDialogTitle,
    NbInput,
    NbLabel,
    NbTextarea,
  ],
  template: `
    <button
      nbButton
      (click)="contactDialog.open()"
      style="--nb-button-bg: #76fbd9;"
      class="h-10 font-heading text-base text-black transition-all hover:scale-[1.02] active:scale-[0.98] md:h-12 md:text-lg lg:h-14 lg:text-xl"
    >
      Get in Touch!
    </button>

    <nb-dialog #contactDialog>
      <div
        class="relative bg-[#faf3d6] px-6 pt-7 pb-5 sm:px-10 sm:pt-9 sm:pb-6"
      >
        <button
          nbButton
          nbDialogClose
          size="icon"
          variant="neutral"
          aria-label="Close dialog"
          style="--nb-button-bg: #fff"
          class="absolute right-6 top-6 text-xl leading-none sm:right-10 sm:top-9"
        >
          &times;
        </button>

        <div
          class="pointer-events-none absolute right-24 top-12 hidden items-center gap-2 sm:flex"
        >
          <span class="font-mono text-3xl font-black leading-none">&#42;</span>
          <svg
            width="68"
            height="22"
            viewBox="0 0 68 22"
            fill="none"
            stroke="#ff2f68"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="2,17 13,5 24,17 35,5 46,17 57,5 66,17" />
          </svg>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <span
            class="inline-block border-2 border-(--nb-border) bg-[#c4a8ff] px-4 py-1.5 font-mono text-sm font-black uppercase tracking-wider text-black shadow-[3px_3px_0_0_var(--nb-shadow)]"
          >
            Let's Talk
          </span>
          <h2
            nbDialogTitle
            class="p-0 font-mono text-3xl font-black leading-none"
          >
            Send Message
          </h2>
        </div>

        <p
          nbDialogDescription
          class="mt-3 inline-block border-b-2 border-[#ff2f68] p-0 pb-2 pr-6 font-mono text-base font-medium text-black"
        >
          Fill in the form below and I'll get back to you.
        </p>
      </div>

      <nb-dialog-content
        class="border-y-0 bg-[#faf3d6] px-6 pb-6 pt-2 sm:px-10"
      >
        <form [id]="formId" class="grid gap-5" (submit)="submitContact($event)">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="grid gap-2">
              <label nbLabel [attr.for]="nameId" class="font-mono text-base">
                Name
              </label>
              <input
                nbInput
                [id]="nameId"
                name="name"
                placeholder="Your name"
                class="h-12 font-mono"
              />
            </div>
            <div class="grid gap-2">
              <label nbLabel [attr.for]="emailId" class="font-mono text-base">
                Email
              </label>
              <input
                nbInput
                [id]="emailId"
                name="email"
                type="email"
                placeholder="you@company.com"
                class="h-12 font-mono"
              />
            </div>
          </div>

          <div class="grid gap-2">
            <label nbLabel [attr.for]="subjectId" class="font-mono text-base">
              Subject
            </label>
            <input
              nbInput
              [id]="subjectId"
              name="subject"
              placeholder="What is this regarding?"
              class="h-12 font-mono"
            />
          </div>

          <div class="grid gap-2">
            <label nbLabel [attr.for]="messageId" class="font-mono text-base">
              Message
            </label>
            <textarea
              nbTextarea
              [id]="messageId"
              name="message"
              placeholder="Type your message here..."
              class="min-h-40 font-mono"
            ></textarea>
          </div>

          @if (sent()) {
          <p
            class="border-2 border-black bg-[#76fbd9] px-3 py-2 font-mono text-sm font-black text-black shadow-[3px_3px_0_0_#000]"
            role="status"
          >
            Message staged. The demo flow is working.
          </p>
          }
        </form>
      </nb-dialog-content>

      <nb-dialog-actions
        class="gap-4 border-t-2 border-(--nb-border) bg-[#faf3d6] px-6 py-5 sm:px-10"
      >
        <button
          nbButton
          variant="neutral"
          nbDialogClose
          style="--nb-button-bg: #fff"
          class="min-w-28 font-mono"
        >
          Cancel
        </button>
        <button
          nbButton
          type="submit"
          [attr.form]="formId"
          class="min-w-28 font-mono"
          style="--nb-button-bg: #ffd92e; --nb-button-fg: #000;"
        >
          Send
        </button>
      </nb-dialog-actions>
    </nb-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioContactDialogComponent {
  private static nextId = 0;

  readonly sent = input(false);
  readonly submitted = output<void>();

  protected readonly id = ++PortfolioContactDialogComponent.nextId;
  protected readonly formId = `portfolio-contact-${this.id}`;
  protected readonly nameId = `portfolio-name-${this.id}`;
  protected readonly emailId = `portfolio-email-${this.id}`;
  protected readonly subjectId = `portfolio-subject-${this.id}`;
  protected readonly messageId = `portfolio-message-${this.id}`;

  protected submitContact(event: SubmitEvent): void {
    event.preventDefault();
    this.submitted.emit();
  }
}
