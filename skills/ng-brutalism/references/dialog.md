# Dialog

The neo-brutalist Angular Dialog component — a brutalist modal built on the native `<dialog>` element. Compound API with SSR-safe open/close. Click the backdrop to dismiss.

## Import
```typescript
import {
  NbButton,
  NbDialog,
  NbDialogTitle,
  NbDialogDescription,
  NbDialogContent,
  NbDialogActions,
  NbDialogClose,
  NbIconButton,
  NbTitle,
  NbInput,
  NbInputGroup,
  NbInputPrefix,
  NbLabel,
  NbSelect,
  NbSelectOption,
  NbTextarea,
} from '@ng-brutalism/ui';
```

## API Reference
| Part | Description |
|---|---|
| `nb-dialog` | Root component. Renders the native `<dialog>` modal. Exposes `open()` and `close()` for `viewChild` access. |
| `[nbDialogTitle]` | Directive applied to a heading element. Styles the dialog title. |
| `[nbDialogDescription]` | Directive for muted supporting text below the title. |
| `nb-dialog-content` | Scrollable body section with top and bottom borders. |
| `nb-dialog-actions` | Footer section with right-aligned action buttons. |
| `[nbDialogClose]` | Directive that closes the dialog on click. |

## Usage Examples

### Default
```html
<button nbButton (click)="dialog.open()">Open Dialog</button>

<nb-dialog #dialog>
  <div class="relative p-6">
    <button
      nbIconButton
      nbDialogClose
      tone="background"
      radius="md"
      aria-label="Close dialog"
      class="absolute right-6 top-6"
    >
      &times;
    </button>
    <h2 nbDialogTitle nbTitle>Dialog Title</h2>
    <p nbDialogDescription>This is a description of the dialog.</p>
  </div>

  <nb-dialog-content class="px-6 py-4">
    <p>Dialog content goes here.</p>
  </nb-dialog-content>

  <nb-dialog-actions class="px-6 py-4 flex justify-end gap-3">
    <button nbButton tone="background" nbDialogClose>Cancel</button>
    <button nbButton nbDialogClose>Confirm</button>
  </nb-dialog-actions>
</nb-dialog>
```

### Contact Us Form
```html
<button nbButton style="--nb-button-bg: #fff" (click)="dialog.open()">Contact Us</button>
<nb-dialog #dialog>
  <div class="relative bg-(--nb-field-bg) px-6 pt-7 pb-5 sm:px-10 sm:pt-9 sm:pb-6">
    <button
      nbIconButton
      nbDialogClose
      tone="background"
      radius="md"
      aria-label="Close dialog"
      style="--nb-icon-button-bg: #fff"
      class="absolute right-6 top-6 text-xl leading-none sm:right-10 sm:top-9"
    >
      &times;
    </button>

    <span class="inline-block border-2 border-(--nb-border) bg-[#c4a8ff] px-4 py-1.5 font-mono text-sm font-black uppercase tracking-wider text-black shadow-[3px_3px_0_0_var(--nb-shadow)]">
      Let's Talk
    </span>

    <h2 nbDialogTitle nbTitle class="mt-4 p-0 font-mono text-3xl font-black leading-tight">
      Send us a message
    </h2>

    <p nbDialogDescription class="mt-3 inline-block p-0 font-mono text-base font-medium text-black">
      Fill in the form below and we'll get back to you as soon as possible.
    </p>
  </div>

  <nb-dialog-content class="border-y-0 bg-white px-6 pb-6 pt-4 sm:px-10">
    <form class="grid gap-5">
      <div class="grid gap-5 sm:grid-cols-2">
        <div class="grid min-w-0 gap-2">
          <label nbLabel for="contact-name" class="font-mono text-base">Name</label>
          <nb-input-group class="min-w-0">
            <input nbInput id="contact-name" placeholder="Your name" class="h-12 font-mono" />
          </nb-input-group>
        </div>
        <div class="grid min-w-0 gap-2">
          <label nbLabel for="contact-email" class="font-mono text-base">Email</label>
          <nb-input-group class="min-w-0">
            <input nbInput id="contact-email" type="email" placeholder="you@company.com" class="h-12 font-mono" />
          </nb-input-group>
        </div>
      </div>

      <div class="grid gap-2">
        <label nbLabel id="contact-subject-label" class="font-mono text-base">Subject</label>
        <nb-input-group>
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
        <label nbLabel for="contact-message" class="font-mono text-base">Message</label>
        <nb-input-group>
          <textarea nbTextarea id="contact-message" placeholder="Type your message here..." class="min-h-40 font-mono"></textarea>
        </nb-input-group>
      </div>
    </form>
  </nb-dialog-content>

  <nb-dialog-actions class="flex-col items-stretch justify-between gap-4 border-t-2 border-(--nb-border) bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-10">
    <div class="flex items-center gap-3">
      <div class="font-mono text-xs leading-tight">
        <p class="font-bold">Your data is safe with us.</p>
        <p>We'll never share your info.</p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button nbButton tone="background" nbDialogClose class="min-w-28 font-mono" style="--nb-button-bg: #fff">Cancel</button>
      <button nbButton nbDialogClose class="flex min-w-36 items-center justify-center gap-2 font-mono" style="--nb-button-bg: #ffd92e; --nb-button-fg: #000;">
        Send Message
      </button>
    </div>
  </nb-dialog-actions>
</nb-dialog>
