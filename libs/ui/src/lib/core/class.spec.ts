import { describe, expect, it } from 'vitest';

import { nbClass } from './class';

describe('nbClass', () => {
  it('merges conditional and conflicting Tailwind classes', () => {
    expect(nbClass('flex', false && 'hidden', 'px-2 px-4')).toBe('flex px-4');
  });
});
