import { docsNavGroups } from './docs.navigation';
import { docsComponentStatus } from './docs-component-status';

describe('docsComponentStatus', () => {
  it('has exactly one entry per component nav page, with no orphans', () => {
    const primitives = docsNavGroups.find(
      (group) => group.label === 'Primitives'
    );
    const slugs = (primitives?.items ?? [])
      .map((item) => item.path?.match(/^\/components\/(.+)$/)?.[1])
      .filter((slug): slug is string => !!slug);

    expect(slugs.length).toBeGreaterThan(0);
    expect(Object.keys(docsComponentStatus).sort()).toEqual(
      [...slugs].sort()
    );
  });
});
