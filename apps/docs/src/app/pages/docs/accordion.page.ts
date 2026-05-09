import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'docs-accordion-redirect-page',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionRedirectPageComponent {
  private readonly router = inject(Router);

  constructor() {
    void this.router.navigateByUrl('/components/accordion', { replaceUrl: true });
  }
}
