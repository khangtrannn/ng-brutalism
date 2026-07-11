import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsTokens } from '@ng-brutalism/docs-ui';

import { InstallationManual } from './components/installation-manual';
import { InstallationOverview } from './components/installation-overview';
import { InstallationPackage } from './components/installation-package';
import { InstallationPrerequisites } from './components/installation-prerequisites';
import { InstallationStyles } from './components/installation-styles';
import { InstallationTheming } from './components/installation-theming';
import { InstallationUsage } from './components/installation-usage';

@Component({
  selector: 'docs-installation-page',
  imports: [
    DocsTokens,
    InstallationManual,
    InstallationOverview,
    InstallationPackage,
    InstallationPrerequisites,
    InstallationStyles,
    InstallationTheming,
    InstallationUsage,
  ],
  template: `
    <article>
      <docs-installation-overview />
      <docs-installation-prerequisites />
      <docs-installation-package />
      <docs-installation-manual />
      <docs-installation-styles />
      <docs-installation-theming />
      <docs-tokens component="theme" />
      <docs-installation-usage />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InstallationPage {}
