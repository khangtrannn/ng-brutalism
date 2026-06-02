import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbCluster,
  NbDisplay,
  NbIconButton,
  NbMediaFrame,
  NbSection,
  NbSplit,
  NbStack,
  NbStatusDot,
  NbSticker,
  NbStickerFace,
  NbSurface,
  NbText,
  NbTypography,
  NbHalftone,
  type NbChipTone,
} from '@ng-brutalism/ui';

interface OtwSkill {
  readonly label: string;
  readonly tone: NbChipTone;
}

interface OtwLink {
  readonly label: string;
  readonly icon: string;
  readonly href: string;
  readonly tone: NbChipTone;
}

@Component({
  selector: 'recipe-open-to-work-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbChip,
    NbChipGroup,
    NbCluster,
    NbDisplay,
    NbIconButton,
    NbMediaFrame,
    NbSection,
    NbSplit,
    NbStack,
    NbStatusDot,
    NbSticker,
    NbStickerFace,
    NbSurface,
    NbText,
    NbTypography,
    NbHalftone,
  ],
  template: `
    <div nbCluster justify="center" padding="xl" class="otw-stage w-full">
      <article
        nbSurface
        border="strong"
        shadow="hard"
        radius="xl"
        class="relative w-full max-w-215 [--nb-surface-bg:#fff0d9]"
      >
        <!-- Decorative star sticker overflowing the top-right corner -->
        <nb-sticker
          shape="star"
          tone="pink"
          decorative
          [rotate]="10"
          class="absolute -top-7 -right-4 z-20 sm:-top-9 sm:-right-7"
        >
          <nb-sticker-face />
        </nb-sticker>

        <!-- Top: portrait + identity -->
        <div
          nbSplit
          ratio="1:1"
          gap="xl"
          padding="lg"
          collapse="sm"
          align="start"
        >
          <div
            nbMediaFrame
            ratio="3/4"
            tone="pink"
            border="strong"
            radius="lg"
            shadow="none"
          >
            <img
              src="/open-to-work/khang-avatar.png"
              [alt]="profile.imageAlt"
            />
          </div>

          <div nbStack gap="none" align="start" justify="end" class="h-full">
            <span nbChip tone="mint" radius="md" class="font-bold uppercase">
              <span nbStatusDot state="online" class="[--nb-status-dot-size:14px]"></span>
              {{ profile.status }}
            </span>

            <h1 nbDisplay size="lg" fluid class="mt-8 mb-2 uppercase">
              Khang<br />Tran
            </h1>

            <div nbStack class="mb-6" gap="xs" align="start">
              <span
                nbText
                size="2xl"
                weight="bold"
                underline="bar"
                underlineGap="xs"
                underlineWidth="md"
                style="--nb-underline-color: var(--otw-pink)"
              >
                {{ profile.role }}
              </span>
            </div>

            <div
              nbHalftone
              shape="rectangle"
              [rows]="3"
              [columns]="11"
              [size]="7"
              [gapX]="25"
              [gapY]="20"
              class="opacity-70"
            ></div>
          </div>
        </div>

        <!-- Skills + bio -->
        <div nbSection padding="lg">
          <div nbStack gap="lg" align="start">
            <div
              nbChipGroup
              gap="sm"
              radius="sm"
              shadow="hard"
              transform="uppercase"
              tracking="wide"
            >
              @for (skill of profile.skills; track skill.label) {
              <span nbChip nbTypography font="display" [tone]="skill.tone">{{
                skill.label
              }}</span>
              }
            </div>

            <p nbText size="lg" weight="medium" measure="md">
              {{ profile.bio }}
            </p>
          </div>
        </div>

        <!-- Footer: socials + CTA -->
        <div nbSection divider="top" padding="lg">
          <div nbSplit ratio="1:1" gap="lg" collapse="sm" align="center">
            <div nbCluster gap="sm" align="center">
              @for (link of profile.links; track link.label) {
              <button
                nbIconButton
                shape="circle"
                size="lg"
                shadow="none"
                [tone]="link.tone"
                [icon]="link.icon"
                [attr.aria-label]="link.label"
              ></button>
              }
            </div>

            <button
              nbButton
              tone="yellow"
              size="xl"
              radius="md"
              fullWidth
              class="sm:w-auto"
            >
              <span
                nbText
                size="xl"
                weight="black"
                transform="uppercase"
                tracking="wide"
              >
                View Profile
              </span>
              <span
                nbButtonTrailingIcon
                shape="circle"
                tone="inverse"
                size="md"
                icon="/open-to-work/arrow-icon.svg"
              ></span>
            </button>
          </div>
        </div>
      </article>
    </div>
  `,
  styles: `
    :host {
      /* Recipe-level palette — not library tokens, scoped to this demo. */
      --otw-pink: #ff8ac7;
      --otw-paper-grid: #eadfca;
      display: block;
    }

    /* Warm cream grid-paper backdrop, CSS-only. */
    .otw-stage {
      background-color: #fff8e8;
      background-image:
        linear-gradient(to right, var(--otw-paper-grid) 1px, transparent 1px),
        linear-gradient(to bottom, var(--otw-paper-grid) 1px, transparent 1px);
      background-size: 28px 28px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenToWorkCard {
  protected readonly profile = {
    name: 'Khang Tran',
    role: 'Software Engineer',
    status: 'Open to work',
    bio: 'Building loud, accessible, and expressive Angular interfaces with sharp developer experience.',
    imageAlt: 'Neo-brutalist illustration of Khang Tran',
    skills: [
      { label: 'Angular', tone: 'pink' },
      { label: 'TypeScript', tone: 'blue' },
      { label: 'Node.js', tone: 'lavender' },
    ] satisfies OtwSkill[],
    links: [
      {
        label: 'Khang Tran on LinkedIn',
        icon: '/open-to-work/linkedin-icon.png',
        href: 'https://www.linkedin.com/in/khangtrann/',
        tone: 'mint',
      },
      {
        label: 'Khang Tran on X',
        icon: '/open-to-work/twitter-icon.png',
        href: 'https://x.com/mktrann',
        tone: 'lavender',
      },
      {
        label: 'Khang Tran personal site',
        icon: '/open-to-work/globe-icon.png',
        href: 'https://ngbrutalism.khangtran.dev',
        tone: 'pink',
      },
      {
        label: 'Email Khang Tran',
        icon: '/open-to-work/email-icon.png',
        href: 'mailto:minhkhangtrannn@gmail.com',
        tone: 'yellow',
      },
    ] satisfies OtwLink[],
  };
}
