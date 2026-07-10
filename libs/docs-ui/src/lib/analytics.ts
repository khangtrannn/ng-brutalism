import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

const WORKER_URL = 'https://ng-brutalism-analytics.khangtrann8198.workers.dev';

@Injectable({ providedIn: 'root' })
export class Analytics {
  private readonly document = inject(DOCUMENT);

  trackCopy(tab: string): void {
    if (typeof this.document.defaultView?.fetch !== 'function') return;
    const page = this.document.location.pathname;
    this.document.defaultView
      .fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, tab }),
      })
      .catch(() => {});
  }
}
