import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NbAvatar,
  NbBadge,
  NbButton,
  NbCard,
  NbCardContent,
  NbCardDescription,
  NbCardHeader,
  NbCardTitle,
  NbDialog,
  NbDialogClose,
  NbDialogContent,
  NbDialogDescription,
  NbDialogFooter,
  NbDialogHeader,
  NbDialogTitle,
  NbDialogTrigger,
  NbImageCard,
  NbInput,
  NbLabel,
  NbMarquee,
  NbMarqueeItem,
  NbTextarea,
} from '@ng-brutalism/ui';

@Component({
  selector: 'docs-portfolio-showcase-page',
  standalone: true,
  imports: [
    RouterLink,
    NbAvatar,
    NbBadge,
    NbButton,
    NbCard,
    NbCardContent,
    NbCardDescription,
    NbCardHeader,
    NbCardTitle,
    NbDialog,
    NbDialogClose,
    NbDialogContent,
    NbDialogDescription,
    NbDialogFooter,
    NbDialogHeader,
    NbDialogTitle,
    NbDialogTrigger,
    NbImageCard,
    NbInput,
    NbLabel,
    NbMarquee,
    NbMarqueeItem,
    NbTextarea,
  ],
  template: `
    <div
      class="min-h-screen border-x-0 border-(--nb-border) bg-(--portfolio-bg) text-(--nb-foreground) [--portfolio-bg:#f8f0df] [--portfolio-panel:#fffaf0] [--portfolio-accent:#99e8c8] [--portfolio-accent-2:#ff7eb6] [--portfolio-accent-3:#ffd24a]"
      [class.dark]="isDark()"
      [class.!bg-[#171717]]="isDark()"
      [class.!text-white]="isDark()"
    >
      <header
        class="sticky top-0 z-40 border-b-4 border-(--nb-border) bg-(--portfolio-panel) shadow-[0_5px_0_0_var(--nb-shadow)]"
        [class.!bg-[#242424]]="isDark()"
      >
        <nav
          class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5"
          aria-label="Portfolio"
        >
          <a
            routerLink="/"
            class="border-2 border-(--nb-border) bg-(--portfolio-accent-3) px-3 py-2 font-mono text-sm font-bold shadow-[4px_4px_0_0_var(--nb-shadow)]"
          >
            NB
          </a>

          <div class="hidden items-center gap-8 font-bold md:flex">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <button
            nbButton
            type="button"
            size="sm"
            variant="neutral"
            (click)="toggleTheme()"
            [attr.aria-pressed]="isDark()"
          >
            {{ isDark() ? 'Light' : 'Dark' }}
          </button>
        </nav>
      </header>

      <main>
        <section
          class="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div class="space-y-8">
            <div class="flex flex-wrap items-center gap-4">
              <nb-avatar
                class="h-20 w-20 text-2xl"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80"
                alt="Portrait of portfolio owner"
              />
              <div>
                <p class="font-mono text-sm font-bold uppercase">
                  Available for Angular UI systems
                </p>
                <h1
                  class="max-w-4xl font-heading text-5xl font-black leading-[0.92] sm:text-6xl lg:text-7xl"
                >
                  Mina Park
                </h1>
              </div>
            </div>

            <p class="max-w-2xl text-lg font-medium leading-8 sm:text-xl">
              Frontend engineer turning complex product workflows into fast,
              tactile Angular interfaces with clear states and confident motion.
            </p>

            <div class="flex flex-wrap items-center gap-4">
              <nb-dialog>
                <button nbButton nbDialogTrigger>Start a project</button>
                <nb-dialog-content>
                  <nb-dialog-header>
                    <nb-dialog-title>Tell me about the work</nb-dialog-title>
                    <nb-dialog-description>
                      Share a few details and I will reply with next steps.
                    </nb-dialog-description>
                  </nb-dialog-header>

                  <form
                    id="contact"
                    class="grid gap-4 px-6 py-5"
                    (submit)="submitContact($event)"
                  >
                    <div class="grid gap-2">
                      <label nbLabel for="portfolio-name">Name</label>
                      <input
                        nbInput
                        id="portfolio-name"
                        name="name"
                        placeholder="Your name"
                      />
                    </div>

                    <div class="grid gap-2">
                      <label nbLabel for="portfolio-email">Email</label>
                      <input
                        nbInput
                        id="portfolio-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div class="grid gap-2">
                      <label nbLabel for="portfolio-message">Message</label>
                      <textarea
                        nbTextarea
                        id="portfolio-message"
                        name="message"
                        placeholder="What are we building?"
                      ></textarea>
                    </div>

                    @if (sent()) {
                      <p
                        class="border-2 border-(--nb-border) bg-(--portfolio-accent) px-3 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--nb-shadow)]"
                        role="status"
                      >
                        Message staged. The demo flow is working.
                      </p>
                    }
                  </form>

                  <nb-dialog-footer>
                    <button nbButton variant="neutral" nbDialogClose>
                      Close
                    </button>
                    <button nbButton type="submit" form="contact">Send</button>
                  </nb-dialog-footer>
                </nb-dialog-content>
              </nb-dialog>

              <a nbButton variant="neutral" href="#projects">View work</a>
              <a
                nbButton
                size="icon"
                variant="neutral"
                href="https://github.com/khangtrannn/ng-brutalism"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                GH
              </a>
              <a
                nbButton
                size="icon"
                variant="neutral"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                IN
              </a>
            </div>
          </div>

          <div
            class="border-4 border-(--nb-border) bg-(--portfolio-panel) p-4 shadow-[12px_12px_0_0_var(--nb-shadow)]"
            [class.!bg-[#242424]]="isDark()"
          >
            <nb-image-card
              image="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80"
              alt="Laptop showing a product interface"
              caption="Design systems, dashboards, and polished Angular apps."
            />
          </div>
        </section>

        <nb-marquee duration="18s">
          @for (skill of marqueeSkills; track skill) {
            <nb-marquee-item>{{ skill }}</nb-marquee-item>
          }
        </nb-marquee>

        <section
          id="about"
          class="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-2"
        >
          <nb-card>
            <nb-card-header>
              <nb-card-title>Product-minded build partner</nb-card-title>
              <nb-card-description>
                I pair Angular architecture with practical UX decisions.
              </nb-card-description>
            </nb-card-header>
            <nb-card-content>
              <p class="leading-7">
                Recent work spans internal tools, onboarding flows, component
                libraries, and accessibility repairs for teams that need durable
                interfaces more than decorative demos.
              </p>
            </nb-card-content>
          </nb-card>

          <nb-image-card
            image="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80"
            alt="Colorful geometric architectural facade"
            caption="Sharp structure, louder personality."
          />

          <nb-image-card
            image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80"
            alt="Bright collaborative workspace"
            caption="Built close to real teams and real constraints."
          />

          <nb-card>
            <nb-card-header>
              <nb-card-title>Readable systems over clever tricks</nb-card-title>
              <nb-card-description>
                Components, tokens, docs, and tests that future teams can keep.
              </nb-card-description>
            </nb-card-header>
            <nb-card-content>
              <p class="leading-7">
                The work favors explicit APIs, small composable primitives, and
                enough documentation to make adoption feel boring in the best
                way.
              </p>
            </nb-card-content>
          </nb-card>
        </section>

        <section id="skills" class="mx-auto max-w-7xl px-5 py-16">
          <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="font-mono text-sm font-bold uppercase">Toolbox</p>
              <h2 class="font-heading text-4xl font-black sm:text-5xl">
                Skills grid
              </h2>
            </div>
            <span nbBadge variant="secondary">8 core strengths</span>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            @for (skill of skills; track skill.label) {
              <nb-card>
                <nb-card-content>
                  <div class="flex items-center gap-4">
                    <span
                      class="flex size-12 items-center justify-center border-2 border-(--nb-border) bg-(--portfolio-accent-3) font-heading text-xl font-black shadow-[3px_3px_0_0_var(--nb-shadow)]"
                    >
                      {{ skill.icon }}
                    </span>
                    <span class="font-bold">{{ skill.label }}</span>
                  </div>
                </nb-card-content>
              </nb-card>
            }
          </div>
        </section>

        <section id="projects" class="mx-auto max-w-7xl px-5 py-16">
          <div class="mb-8">
            <p class="font-mono text-sm font-bold uppercase">Selected work</p>
            <h2 class="font-heading text-4xl font-black sm:text-5xl">
              Projects
            </h2>
          </div>

          <div class="grid gap-6 lg:grid-cols-3">
            @for (project of projects; track project.title) {
              <article
                class="border-4 border-(--nb-border) bg-(--portfolio-panel) shadow-[8px_8px_0_0_var(--nb-shadow)]"
                [class.!bg-[#242424]]="isDark()"
              >
                <nb-image-card
                  [image]="project.image"
                  [alt]="project.alt"
                  [caption]="project.title"
                />
                <div class="space-y-5 p-5">
                  <p class="leading-7">{{ project.description }}</p>
                  <div class="flex flex-wrap gap-2">
                    @for (tag of project.tags; track tag) {
                      <span nbBadge variant="secondary">{{ tag }}</span>
                    }
                  </div>
                  <div class="flex flex-wrap gap-3">
                    <a nbButton size="sm" [href]="project.github">GitHub</a>
                    <a
                      nbButton
                      size="sm"
                      variant="neutral"
                      [href]="project.live"
                    >
                      Live
                    </a>
                  </div>
                </div>
              </article>
            }
          </div>
        </section>
      </main>

      <footer
        class="border-t-4 border-(--nb-border) bg-(--portfolio-panel) px-5 py-8"
        [class.!bg-[#242424]]="isDark()"
      >
        <div
          class="mx-auto flex max-w-7xl flex-col gap-4 font-bold sm:flex-row sm:items-center sm:justify-between"
        >
          <p>Mina Park - Angular portfolio showcase</p>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PortfolioShowcasePageComponent {
  protected readonly isDark = signal(false);
  protected readonly sent = signal(false);

  protected readonly marqueeSkills = [
    'Angular',
    'Signals',
    'Design Systems',
    'Accessibility',
    'SSR',
    'Tailwind',
    'Testing',
    'Docs',
  ];

  protected readonly skills = [
    { icon: 'A', label: 'Angular architecture' },
    { icon: 'S', label: 'Signals and state' },
    { icon: 'D', label: 'Design systems' },
    { icon: 'T', label: 'Typed APIs' },
    { icon: 'R', label: 'Responsive UI' },
    { icon: 'A', label: 'Accessibility' },
    { icon: 'P', label: 'Performance' },
    { icon: 'V', label: 'Visual QA' },
  ];

  protected readonly projects = [
    {
      title: 'Ops Command Center',
      description:
        'Dense workflow dashboard with resilient tables, status filters, and keyboard-friendly controls.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      alt: 'Analytics dashboard on a monitor',
      tags: ['Angular', 'SSR', 'A11Y'],
      github: 'https://github.com/khangtrannn/ng-brutalism',
      live: '/',
    },
    {
      title: 'Launch Kit',
      description:
        'Reusable UI kit with brutalist tokens, documented examples, and compact primitives.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
      alt: 'Open laptop with interface design work',
      tags: ['Components', 'Docs', 'Tokens'],
      github: 'https://github.com/khangtrannn/ng-brutalism',
      live: '/components/button',
    },
    {
      title: 'Conversion Studio',
      description:
        'Landing and onboarding experience tuned for fast edits, clear calls to action, and brand consistency.',
      image:
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80',
      alt: 'Designer working with color swatches',
      tags: ['UX', 'Forms', 'Motion'],
      github: 'https://github.com/khangtrannn/ng-brutalism',
      live: '/',
    },
  ];

  protected toggleTheme(): void {
    this.isDark.update((value) => !value);
  }

  protected submitContact(event: SubmitEvent): void {
    event.preventDefault();
    this.sent.set(true);
  }
}
