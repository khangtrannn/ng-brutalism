import { ChangeDetectionStrategy, Component } from '@angular/core';

import { VersioningHardeningStatus } from './components/versioning-hardening-status';
import { VersioningOverview } from './components/versioning-overview';
import { VersioningV0xContract } from './components/versioning-v0x-contract';
import { VersioningV1Gate } from './components/versioning-v1-gate';

@Component({
  selector: 'docs-versioning-page',
  imports: [
    VersioningHardeningStatus,
    VersioningOverview,
    VersioningV0xContract,
    VersioningV1Gate,
  ],
  template: `
    <article>
      <docs-versioning-overview />
      <docs-versioning-v0x-contract />
      <docs-versioning-v1-gate />
      <docs-versioning-hardening-status />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VersioningPage {}
