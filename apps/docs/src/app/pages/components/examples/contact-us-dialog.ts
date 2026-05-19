import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import {
  NbButton,
  NbDialog,
  NbDialogActions,
  NbDialogClose,
  NbDialogContent,
  NbDialogDescription,
  NbDialogTitle,
  NbInput,
  NbInputGroup,
  NbInputPrefix,
  NbLabel,
  NbSelectComponent,
  NbSelectOption,
  NbTextarea,
  NbTitle,
} from '@ng-brutalism/ui';

@Component({
    selector: 'contact-us-dialog',
    imports: [
        NbButton,
        NbDialog,
        NbDialogActions,
        NbDialogClose,
        NbDialogContent,
        NbDialogDescription,
        NbDialogTitle,
        NbInput,
        NbInputGroup,
        NbInputPrefix,
        NbLabel,
        NbSelectComponent,
        NbSelectOption,
        NbTextarea,
        NbTitle,
    ],
    template: `
    <button
      nbButton
      style="--nb-button-bg: var(--nb-yellow)"
      (click)="dialog().open()"
    >
      Contact Us
    </button>
    <nb-dialog #dialogRef>
      <div
        class="relative bg-(--nb-field-bg) px-6 pt-7 pb-5 sm:px-10 sm:pt-9 sm:pb-6"
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

        <span
          class="inline-block border-2 border-(--nb-border) bg-[#c4a8ff] px-4 py-1.5 font-mono text-sm font-black uppercase tracking-wider text-black shadow-[3px_3px_0_0_var(--nb-shadow)]"
        >
          Let's Talk
        </span>

        <div class="flex">
          <div class="flex flex-col">
            <div>
              <h2
                nbDialogTitle
                nbTitle
                class="mt-4 p-0 font-mono text-3xl font-black leading-tight"
              >
                Send us a message
              </h2>
            </div>

            <p
              nbDialogDescription
              class="mt-3 inline-block p-0 font-mono text-base font-medium text-black"
            >
              Fill in the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <img
            src="/showcase/contact-dialog/message.png"
            alt=""
            aria-hidden="true"
            class="pointer-events-none hidden h-28 w-auto select-none sm:block"
          />
        </div>
      </div>

      <nb-dialog-content class="border-y-0 bg-white px-6 pb-6 pt-4 sm:px-10">
        <form class="grid gap-5">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="grid gap-2">
              <label nbLabel for="contact-name" class="font-mono text-base"
                >Name</label
              >
              <nb-input-group>
                <span nbInputPrefix>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  nbInput
                  id="contact-name"
                  placeholder="Your name"
                  class="h-12 font-mono"
                />
              </nb-input-group>
            </div>
            <div class="grid gap-2">
              <label nbLabel for="contact-email" class="font-mono text-base"
                >Email</label
              >
              <nb-input-group>
                <span nbInputPrefix>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </span>
                <input
                  nbInput
                  id="contact-email"
                  type="email"
                  placeholder="you@company.com"
                  class="h-12 font-mono"
                />
              </nb-input-group>
            </div>
          </div>

          <div class="grid gap-2">
            <label
              nbLabel
              id="contact-subject-label"
              class="font-mono text-base"
              >Subject</label
            >
            <nb-input-group>
              <span nbInputPrefix>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
                  />
                  <path d="M7 7h.01" />
                </svg>
              </span>
              <nb-select
                placeholder="What is this regarding?"
                aria-labelledby="contact-subject-label"
              >
                <nb-select-option value="general" label="General Inquiry">
                  General Inquiry
                </nb-select-option>
                <nb-select-option value="project" label="Project Proposal">
                  Project Proposal
                </nb-select-option>
                <nb-select-option value="bug" label="Bug Report">
                  Bug Report
                </nb-select-option>
                <nb-select-option value="other" label="Other">
                  Other
                </nb-select-option>
              </nb-select>
            </nb-input-group>
          </div>

          <div class="grid gap-2">
            <label nbLabel for="contact-message" class="font-mono text-base"
              >Message</label
            >
            <nb-input-group>
              <span nbInputPrefix align="stretch">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
                </svg>
              </span>
              <textarea
                nbTextarea
                id="contact-message"
                placeholder="Type your message here..."
                class="min-h-30 font-mono"
              ></textarea>
            </nb-input-group>
          </div>
        </form>
      </nb-dialog-content>

      <nb-dialog-actions
        class="flex-col items-stretch justify-between gap-4 border-t-2 border-(--nb-border) bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-10"
      >
        <div class="flex items-center gap-3">
          <span
            class="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-(--nb-border) bg-[#c4a8ff]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
              />
            </svg>
          </span>
          <div class="font-mono text-[10px] leading-tight">
            <p class="font-bold">Your data is safe with us.</p>
            <p>We'll never share your info.</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span
            class="hidden h-10 border-1 w-px bg-(--nb-border) sm:block"
            aria-hidden="true"
          ></span>
          <svg
            width="36"
            height="14"
            viewBox="0 0 36 14"
            fill="none"
            stroke="#000"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="hidden sm:block rotate-[165deg]"
            aria-hidden="true"
          >
            <polyline points="2,11 7,3 13,11 19,3 25,11 31,3 34,11" />
          </svg>
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
            nbDialogClose
            class="flex min-w-36 items-center justify-center gap-2 font-mono"
            style="--nb-button-bg: #ffd92e; --nb-button-fg: #000;"
          >
            Send Message
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </nb-dialog-actions>
    </nb-dialog>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsDialog {
  dialog = viewChild.required<NbDialog>('dialogRef');
}
