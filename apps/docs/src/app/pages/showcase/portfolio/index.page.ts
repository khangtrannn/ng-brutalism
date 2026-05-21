import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

import {
  ABOUT_CARDS,
  ASSET_PATH,
  NAV_LINKS,
  PORTFOLIO_PROJECTS,
  SKILLS,
  TIMELINE,
} from './portfolio.data';
import { PortfolioFooter } from './components/portfolio-footer';
import { PortfolioHero } from './components/portfolio-hero';
import { PortfolioJourney } from './components/portfolio-journey';
import { PortfolioNav } from './components/portfolio-nav';
import { PortfolioProjects } from './components/portfolio-projects';

@Component({
    selector: 'docs-portfolio-showcase-page',
    imports: [
        PortfolioFooter,
        PortfolioHero,
        PortfolioJourney,
        PortfolioNav,
        PortfolioProjects,
    ],
    templateUrl: './portfolio.page.html',
    styleUrl: './portfolio.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PortfolioShowcasePageComponent {
  protected readonly assetPath = ASSET_PATH;
  protected readonly menuOpen = signal(false);
  protected readonly activeJourney = signal(-1);

  private readonly greetings = ['Hello!', 'Hola!', 'Bonjour!', 'Xin chào!'];
  protected readonly greeting = toSignal(
    interval(1500).pipe(
      map((tick) => this.greetings[(tick + 1) % this.greetings.length]),
    ),
    { initialValue: this.greetings[0] },
  );

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
