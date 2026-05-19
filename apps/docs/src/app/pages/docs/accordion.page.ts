import { ChangeDetectionStrategy, Component } from '@angular/core';

import AccordionPageComponent from '../components/accordion.page';

@Component({
    selector: 'docs-accordion-redirect-page',
    imports: [AccordionPageComponent],
    template: `<docs-accordion-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AccordionRoutePageComponent {}
