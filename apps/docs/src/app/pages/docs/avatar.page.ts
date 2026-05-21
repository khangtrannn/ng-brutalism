import { ChangeDetectionStrategy, Component } from '@angular/core';

import AvatarPage from '../components/avatar.page';

@Component({
    selector: 'docs-avatar-route-page',
    imports: [AvatarPage],
    template: `<docs-avatar-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsAvatarRoutePage {}
