import { ChangeDetectionStrategy, Component } from '@angular/core';

import AccordionPage from '../components/accordion.page';

@Component({
    selector: 'docs-accordion-redirect-page',
    imports: [AccordionPage],
    template: `<docs-accordion-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AccordionRoutePage {}
