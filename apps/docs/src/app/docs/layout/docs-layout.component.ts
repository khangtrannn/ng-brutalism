import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NbDocsNavbarComponent } from './navbar.component';
import { NbDocsPaginationComponent } from './pagination.component';
import { NbDocsSidebarComponent } from './sidebar.component';
import { NbDocsTocComponent } from './toc.component';

@Component({
  selector: 'nb-docs-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NbDocsNavbarComponent,
    NbDocsSidebarComponent,
    NbDocsTocComponent,
    NbDocsPaginationComponent,
  ],
  template: `
    <div class="relative min-h-screen overflow-x-clip">
      <nb-docs-navbar />

      <div class="flex pt-28">
        <nb-docs-sidebar class="shrink-0" />

        <main
          data-docs-content
          class="docs-grid-bg min-h-[calc(100vh-7rem)] flex-1 px-5 py-10 lg:ml-80 lg:mr-48 lg:px-8"
        >
          <div class="mx-auto min-h-full w-full max-w-3xl">
            <router-outlet />
            <nb-docs-pagination />
          </div>
        </main>

        <aside
          class="fixed top-28 right-8 hidden h-[calc(100vh-8rem)] w-44 shrink-0 overflow-y-auto border-4 border-(--nb-border) bg-white pt-6 pr-4 pl-4 shadow-[6px_6px_0_0_var(--nb-shadow)] lg:block"
        >
          <nb-docs-toc />
        </aside>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDocsLayoutComponent {}
