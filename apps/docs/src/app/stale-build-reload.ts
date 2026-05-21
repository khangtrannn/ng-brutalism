import { ErrorHandler, Injectable } from '@angular/core';

const reloadStorageKey = 'ng-brutalism:stale-build-reload-at';
const reloadCooldownMs = 30_000;

const staleBuildErrorPatterns = [
  /failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /importing a module script failed/i,
  /unable to preload css/i,
];

function isStaleBuildError(error: unknown): boolean {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : String(error);

  return staleBuildErrorPatterns.some((pattern) => pattern.test(message));
}

function reloadOnceForStaleBuild(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const now = Date.now();
  const lastReloadAt = Number(
    window.sessionStorage.getItem(reloadStorageKey) ?? 0
  );

  if (Number.isFinite(lastReloadAt) && now - lastReloadAt < reloadCooldownMs) {
    return false;
  }

  window.sessionStorage.setItem(reloadStorageKey, String(now));
  window.location.reload();

  return true;
}

@Injectable()
export class DocsErrorHandler extends ErrorHandler {
  override handleError(error: unknown): void {
    if (isStaleBuildError(error) && reloadOnceForStaleBuild()) {
      return;
    }

    super.handleError(error);
  }
}

export function installStaleBuildReloadHandler(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    reloadOnceForStaleBuild();
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (isStaleBuildError(event.reason) && reloadOnceForStaleBuild()) {
      event.preventDefault();
    }
  });
}
