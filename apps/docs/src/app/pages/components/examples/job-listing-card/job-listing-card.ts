import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbCluster,
  NbDisplay,
  NbIconButton,
  NbMediaItem,
  NbMediaItemIcon,
  NbMediaItemTitle,
  NbSection,
  NbSplit,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import {
  JobCardBookmarkIcon,
  JobCardBriefcaseIcon,
  JobCardClockIcon,
  JobCardExperienceIcon,
  JobCardHeartIcon,
  JobCardLocationIcon,
  JobCardLogoIcon,
  JobCardRemoteIcon,
  JobCardSalaryIcon,
  JobCardStarIcon,
  JobCardUrgentIcon,
} from './job-listing-card.icons';

@Component({
  selector: 'docs-job-listing-card',
  host: { class: 'block w-full' },
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbChip,
    NbChipGroup,
    NbCluster,
    NbDisplay,
    NbIconButton,
    NbMediaItem,
    NbMediaItemIcon,
    NbMediaItemTitle,
    NbSection,
    NbSplit,
    NbStack,
    NbSurface,
    NbText,
    JobCardBookmarkIcon,
    JobCardBriefcaseIcon,
    JobCardClockIcon,
    JobCardExperienceIcon,
    JobCardHeartIcon,
    JobCardLocationIcon,
    JobCardLogoIcon,
    JobCardRemoteIcon,
    JobCardSalaryIcon,
    JobCardStarIcon,
    JobCardUrgentIcon,
  ],
  template: `
    <div nbCluster justify="center" padding="lg" class="overflow-visible">
      <article
        nbSurface
        tone="cream"
        typography="accent"
        border="strong"
        shadow="heavy"
        radius="xl"
        class="w-full max-w-120 overflow-visible"
        style="
          container-type: inline-size;
          --nb-font-accent: 'Patrick Hand', 'Comic Sans MS', 'Bradley Hand',
            'Segoe Print', cursive;
        "
        role="group"
        aria-label="Job posting"
      >
        <div nbSection padding="lg">
          <div nbStack gap="lg">
            <header
              nbSplit
              ratio="fill:auto"
              collapse="none"
              align="start"
              gap="md"
            >
              <div nbCluster gap="md" align="start" wrap="nowrap">
                <div
                  nbSurface
                  layout="center"
                  border="strong"
                  shadow="default"
                  radius="lg"
                  class="shrink-0"
                  style="
                    width: clamp(3.125rem, 11.2cqw, 3.5rem);
                    height: clamp(3.125rem, 11.2cqw, 3.5rem);
                    --nb-surface-bg: #0e47df;
                    --nb-surface-fg: #fff;
                    --nb-icon-size: clamp(1.5rem, 5.6cqw, 1.75rem);
                  "
                  aria-hidden="true"
                >
                  <docs-job-card-logo-icon />
                </div>

                <div nbStack gap="xs">
                  <h2 class="m-0">
                    <span nbDisplay size="sm" fluid weight="normal" class="block">
                      Senior Frontend
                    </span>

                    <span
                      nbDisplay
                      size="sm"
                      fluid
                      weight="normal"
                      underline="wave"
                      class="inline-block"
                      style="--nb-underline-color: #0e47df"
                    >
                      Engineer
                    </span>
                  </h2>

                  <span nbText size="2xl" weight="bold" leading="none">
                    Inspectorio
                  </span>
                </div>
              </div>

              <button
                nbIconButton
                type="button"
                tone="white"
                size="lg"
                shape="square"
                radius="none"
                shadow="none"
                style="--nb-icon-size: 1.5rem"
                aria-label="Save to favorites"
              >
                <docs-job-card-heart-icon />
              </button>
            </header>

            <div
              nbChipGroup
              gap="sm"
              align="center"
              radius="none"
              shadow="none"
              style="
                --nb-icon-size: 1.1rem;
                --nb-chip-icon-size: 1.1rem;
              "
            >
              <span nbChip tone="mint" padding="lg">
                <docs-job-card-remote-icon />
                Remote
              </span>

              <span nbChip tone="lavender" padding="lg">
                <docs-job-card-briefcase-icon />
                Full-time
              </span>

              <span nbChip tone="yellow" padding="lg">
                <docs-job-card-salary-icon />
                Negotiable
              </span>

              <span nbChip tone="blue" padding="lg">
                <docs-job-card-experience-icon />
                5+ years
              </span>

              <span nbChip tone="pink" padding="lg">
                <docs-job-card-urgent-icon />
                Urgent
              </span>
            </div>

            <p
              nbText
              weight="normal"
              leading="tight"
              measure="sm"
              style="font-size: clamp(1.25rem, 4cqw, 1.5rem)"
            >
              Build delightful UI systems and scalable web experiences.
            </p>

            <div
              nbSurface
              tone="yellow"
              border="strong"
              shadow="default"
              radius="xl"
              padding="lg"
              style="--nb-surface-bg: #fff3c4"
            >
              <div nbStack gap="md">
                <div nbCluster gap="md" align="center" wrap="nowrap">
                  <div
                    nbSurface
                    tone="yellow"
                    layout="center"
                    border="strong"
                    shadow="none"
                    radius="full"
                    style="
                      width: 3rem;
                      height: 3rem;
                      --nb-icon-size: 1.5rem;
                    "
                    aria-hidden="true"
                  >
                    <docs-job-card-star-icon />
                  </div>

                  <span nbText size="3xl" weight="normal" leading="none">
                    Highlights
                  </span>
                </div>

                <div
                  nbCluster
                  gap="lg"
                  align="start"
                  wrap="nowrap"
                  separator="solid"
                  class="max-[420px]:flex-col max-[420px]:[&>*+*]:border-l-0 max-[420px]:[&>*+*]:pl-0 max-[420px]:[&>*+*]:ml-0"
                >
                  <span
                    nbCluster
                    gap="sm"
                    align="start"
                    wrap="nowrap"
                    class="flex-1"
                  >
                    <span
                      aria-hidden="true"
                      class="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#0e47df]"
                    ></span>
                    <span nbText size="lg" weight="normal" leading="tight">
                      Angular + TypeScript
                    </span>
                  </span>

                  <span
                    nbCluster
                    gap="sm"
                    align="start"
                    wrap="nowrap"
                    class="flex-1"
                  >
                    <span
                      aria-hidden="true"
                      class="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#0e47df]"
                    ></span>
                    <span nbText size="lg" weight="normal" leading="tight">
                      Design system
                    </span>
                  </span>

                  <span
                    nbCluster
                    gap="sm"
                    align="start"
                    wrap="nowrap"
                    class="flex-1"
                  >
                    <span
                      aria-hidden="true"
                      class="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#0e47df]"
                    ></span>
                    <span nbText size="lg" weight="normal" leading="tight">
                      International team
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div nbSection divider="top" dividerStyle="dashed" padding="lg">
          <div nbSplit ratio="fill:auto" collapse="none" align="end" gap="sm">
            <div
              nbStack
              gap="sm"
              style="
                --nb-icon-size: 1rem;
                --nb-media-item-title-size: 1rem;
                white-space: nowrap;
              "
            >
              <nb-media-item size="sm">
                <span nbMediaItemIcon>
                  <docs-job-card-location-icon />
                </span>
                <span nbMediaItemTitle>Ho Chi Minh City / Remote</span>
              </nb-media-item>

              <nb-media-item size="sm">
                <span nbMediaItemIcon>
                  <docs-job-card-clock-icon />
                </span>
                <span nbMediaItemTitle>Posted 2 days ago</span>
              </nb-media-item>
            </div>

            <div nbCluster gap="md" align="center" justify="end" wrap="nowrap">
              <button nbButton type="button" tone="yellow" radius="none">
                Apply
              </button>

              <button nbButton type="button" tone="pink" radius="none">
                Save
                <span
                  nbButtonTrailingIcon
                  size="sm"
                  shape="none"
                  tone="default"
                  style="--nb-icon-size: 1.25rem"
                >
                  <docs-job-card-bookmark-icon />
                </span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class JobListingCard {}
