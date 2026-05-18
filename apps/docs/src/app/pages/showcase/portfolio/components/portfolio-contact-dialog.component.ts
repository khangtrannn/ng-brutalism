import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  NbButton,
  NbDialog,
  NbDialogClose,
  NbDialogContent,
  NbDialogDescription,
  NbDialogFooter,
  NbDialogHeader,
  NbDialogTitle,
  NbDialogTrigger,
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
    NbDialogClose,
    NbDialogContent,
    NbDialogDescription,
    NbDialogFooter,
    NbDialogHeader,
    NbDialogTitle,
    NbDialogTrigger,
    NbInput,
    NbLabel,
    NbTextarea,
  ],
  template: `
    <nb-dialog>
      <button
        nbButton
        nbDialogTrigger
        style="--nb-button-bg: #76fbd9;"
        class="h-10 font-heading text-base text-black transition-all hover:scale-[1.02] active:scale-[0.98] md:h-12 md:text-lg lg:h-14 lg:text-xl"
      >
        Get in Touch!
      </button>
      <nb-dialog-content>
        <nb-dialog-header>
          <nb-dialog-title>Get in Touch</nb-dialog-title>
          <nb-dialog-description>
            Please fill out the form below to get in touch with me.
          </nb-dialog-description>
        </nb-dialog-header>

        <form
          id="portfolio-contact"
          class="grid gap-4 px-6 py-5"
          (submit)="submitContact($event)"
        >
          <div class="grid gap-2">
            <label nbLabel for="portfolio-name">Name</label>
            <input nbInput id="portfolio-name" name="name" placeholder="Name" />
          </div>
          <div class="grid gap-2">
            <label nbLabel for="portfolio-email">Email</label>
            <input
              nbInput
              id="portfolio-email"
              name="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="grid gap-2">
            <label nbLabel for="portfolio-message">Message</label>
            <textarea
              nbTextarea
              id="portfolio-message"
              name="message"
              placeholder="Message"
            ></textarea>
          </div>

          @if (sent()) {
          <p
            class="border-2 border-black bg-[#76fbd9] px-3 py-2 text-sm font-bold text-black shadow-[3px_3px_0_0_#000]"
            role="status"
          >
            Message staged. The demo flow is working.
          </p>
          }
        </form>

        <nb-dialog-footer>
          <button nbButton variant="neutral" nbDialogClose>Close</button>
          <button nbButton type="submit" form="portfolio-contact">Send</button>
        </nb-dialog-footer>
      </nb-dialog-content>
    </nb-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioContactDialogComponent {
  readonly sent = input(false);
  readonly submitted = output<void>();

  protected submitContact(event: SubmitEvent): void {
    event.preventDefault();
    this.submitted.emit();
  }
}
