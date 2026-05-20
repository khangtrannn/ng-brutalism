import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

import {
  ABOUT_CARDS,
  ASSET_PATH,
  NAV_LINKS,
  PORTFOLIO_PROJECTS,
  SKILLS,
  TIMELINE,
} from './portfolio.data';
import { PortfolioFooterComponent } from './components/portfolio-footer';
import { PortfolioHeroComponent } from './components/portfolio-hero';
import { PortfolioJourneyComponent } from './components/portfolio-journey';
import { PortfolioNavComponent } from './components/portfolio-nav';
import { PortfolioProjectsComponent } from './components/portfolio-projects';

@Component({
    selector: 'docs-portfolio-showcase-page',
    imports: [
        PortfolioFooterComponent,
        PortfolioHeroComponent,
        PortfolioJourneyComponent,
        PortfolioNavComponent,
        PortfolioProjectsComponent,
    ],
    templateUrl: './portfolio.page.html',
    styleUrl: './portfolio.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PortfolioShowcasePageComponent {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly assetPath = ASSET_PATH;
  protected readonly menuOpen = signal(false);
  protected readonly activeJourney = signal(-1);

  private readonly greetings = ['Hello!', 'Hola!', 'Bonjour!', 'Xin chào!'];
  private greetingIndex = 0;
  protected readonly greeting = signal(this.greetings[0]);

  constructor() {
    afterNextRender(() => {
      interval(1500)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.greetingIndex = (this.greetingIndex + 1) % this.greetings.length;
          this.greeting.set(this.greetings[this.greetingIndex]);
        });
    });
  }

  protected readonly navLinks = NAV_LINKS;
  protected readonly skills = SKILLS;
  protected readonly aboutCards = ABOUT_CARDS;
  protected readonly timeline = TIMELINE;
  protected readonly projects = PORTFOLIO_PROJECTS;

  protected toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected setActiveJourney(index: number): void {
    this.activeJourney.set(index);
  }

}
