import './styles.css';
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';
import { installStaleBuildReloadHandler } from './app/stale-build-reload';

installStaleBuildReloadHandler();
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
