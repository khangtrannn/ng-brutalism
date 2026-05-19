import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
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
  NbSelect,
  NbTextarea,
} from '@ng-brutalism/ui';

@Component({
  selector: 'contact-us-dialog',
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
    NbInputGroup,
    NbInputPrefix,
    NbLabel,
    NbSelect,
    NbTextarea,
  ],
  template: `
    <button nbButton (click)="dialog.open()">Contact Us</button>
    <nb-dialog #dialog>
      <div class="relative bg-[#faf3d6] px-6 pt-7 pb-5 sm:px-10 sm:pt-9 sm:pb-6">
        <button
          nbButton
          nbDialogClose
          size="icon"
          variant="neutral"
          aria-label="Close dialog"
          class="absolute right-6 top-6 text-xl leading-none sm:right-10 sm:top-9"
        >
          &times;
        </button>

        <div class="pointer-events-none absolute right-28 top-6 hidden items-center gap-3 sm:flex">
          <span class="font-mono text-3xl font-black leading-none">&#42;</span>
          <svg width="48" height="16" viewBox="0 0 68 22" fill="none" stroke="#ff2f68" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="2,17 13,5 24,17 35,5 46,17 57,5 66,17" />
          </svg>
          <svg width="76" height="60" viewBox="0 0 100 80" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <g stroke="#000" stroke-width="2.5">
              <line x1="86" y1="10" x2="94" y2="6" />
              <line x1="90" y1="20" x2="98" y2="22" />
              <line x1="86" y1="32" x2="94" y2="38" />
              <line x1="14" y1="10" x2="6" y2="6" />
              <line x1="10" y1="22" x2="2" y2="22" />
            </g>
            <path d="M52 10 C28 8 14 22 16 42 C18 58 38 68 58 64 C78 60 90 44 86 26 C82 12 68 8 52 10 Z" fill="#ff8a6c" stroke="#000" stroke-width="2.5" />
            <path d="M28 22 H68 a4 4 0 0 1 4 4 v16 a4 4 0 0 1 -4 4 H44 l-6 8 -2 -8 H28 a4 4 0 0 1 -4 -4 V26 a4 4 0 0 1 4 -4 Z" fill="#fff" stroke="#000" stroke-width="2.5" />
            <circle cx="38" cy="34" r="2.5" fill="#000" />
            <circle cx="48" cy="34" r="2.5" fill="#000" />
            <circle cx="58" cy="34" r="2.5" fill="#000" />
          </svg>
        </div>

        <span class="inline-block border-2 border-(--nb-border) bg-[#c4a8ff] px-4 py-1.5 font-mono text-sm font-black uppercase tracking-wider text-black shadow-[3px_3px_0_0_var(--nb-shadow)]">
          Let's Talk
        </span>

        <h2 nbDialogTitle class="mt-4 p-0 font-mono text-3xl font-black leading-tight">
          Send us a message
        </h2>
        <svg viewBox="0 0 220 12" preserveAspectRatio="none" width="220" height="10" class="mt-1 block h-2.5 w-72 max-w-full" aria-hidden="true">
          <path d="M0,6 Q10,0 20,6 T40,6 T60,6 T80,6 T100,6 T120,6 T140,6 T160,6 T180,6 T200,6 T220,6" fill="none" stroke="#a78bfa" stroke-width="4" stroke-linecap="round" />
        </svg>

        <p nbDialogDescription class="mt-3 inline-block p-0 font-mono text-base font-medium text-black">
          Fill in the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <nb-dialog-content class="border-y-0 bg-white px-6 pb-6 pt-4 sm:px-10">
        <form class="grid gap-5">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="grid gap-2">
              <label nbLabel for="contact-name" class="font-mono text-base">Name</label>
              <nb-input-group>
                <span nbInputPrefix>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input nbInput id="contact-name" placeholder="Your name" class="h-12 font-mono" />
              </nb-input-group>
            </div>
            <div class="grid gap-2">
              <label nbLabel for="contact-email" class="font-mono text-base">Email</label>
              <nb-input-group>
                <span nbInputPrefix>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </span>
                <input nbInput id="contact-email" type="email" placeholder="you@company.com" class="h-12 font-mono" />
              </nb-input-group>
            </div>
          </div>

          <div class="grid gap-2">
            <label nbLabel for="contact-subject" class="font-mono text-base">Subject</label>
            <nb-input-group>
              <span nbInputPrefix>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
                  <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <select nbSelect id="contact-subject" class="h-12 font-mono">
                <option value="" disabled selected>What is this regarding?</option>
                <option value="general">General Inquiry</option>
                <option value="project">Project Proposal</option>
                <option value="bug">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </nb-input-group>
          </div>

          <div class="grid gap-2">
            <label nbLabel for="contact-message" class="font-mono text-base">Message</label>
            <nb-input-group>
              <span nbInputPrefix align="stretch">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
                </svg>
              </span>
              <textarea nbTextarea id="contact-message" placeholder="Type your message here..." class="min-h-40 font-mono"></textarea>
            </nb-input-group>
          </div>
        </form>
      </nb-dialog-content>

      <nb-dialog-actions class="flex-col items-stretch justify-between gap-4 border-t-2 border-(--nb-border) bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-10">
        <div class="flex items-center gap-3">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-(--nb-border) bg-[#c4a8ff]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            </svg>
          </span>
          <div class="font-mono text-xs leading-tight">
            <p class="font-bold">Your data is safe with us.</p>
            <p>We'll never share your info.</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="hidden h-10 w-px bg-(--nb-border) sm:block" aria-hidden="true"></span>
          <svg width="36" height="14" viewBox="0 0 36 14" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="hidden sm:block" aria-hidden="true">
            <polyline points="2,11 7,3 13,11 19,3 25,11 31,3 34,11" />
          </svg>
          <button nbButton variant="neutral" nbDialogClose class="min-w-28 font-mono">Cancel</button>
          <button nbButton nbDialogClose class="flex min-w-36 items-center justify-center gap-2 font-mono" style="--nb-button-bg: #ffd92e; --nb-button-fg: #000;">
            Send Message
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </nb-dialog-actions>
    </nb-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsDialog {
  @ViewChild('dialog') dialog!: NbDialog;
}
