import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbBadge, type NbBadgeTone } from './nb-badge';

@Component({
  imports: [NbBadge],
  template: `<span nbBadge [tone]="tone">Badge</span>`,
})
class BadgeTokenTest {
  tone: NbBadgeTone = 'white';
}

describe('NbBadge token surface', () => {
  it('maps explicit tone input to actual color styles', async () => {
    const fixture = await createFixture();
    const badge = findBadge(fixture);

    // tone="white" is bound explicitly (matching the badge's library default) —
    // the directive input wins outright with a literal value, no public hook.
    expect(badge.style.getPropertyValue('background')).toBeTruthy();
    expect(badge.style.getPropertyValue('color')).toBeTruthy();
    expect(badge.style.getPropertyValue('border-color')).toBe('var(--nb-border)');
    expect(badge.style.getPropertyValue('--nb-badge-bg')).toBe('');
    expect(badge.style.cssText).not.toContain('--nb-resolved');
    expect(badge.style.getPropertyValue('border-radius')).toBe('');
    expect(badge.style.getPropertyValue('box-shadow')).toBe('');
    expect(badge.style.getPropertyValue('border-width')).toBe('');
  });

  it('does not emit legacy token utility classes', async () => {
    const fixture = await createFixture();
    const badge = findBadge(fixture);
    const cls = badge.className;

    expect(cls).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-shadow(?:\s|$)/);
    expect(cls).not.toContain('bg-(--nb-badge-bg)');
    expect(cls).not.toContain('text-(--nb-badge-fg)');
    expect(cls).not.toContain('border-(--nb-badge-border-color)');
    expect(cls).not.toContain('bg-(--nb-accent)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-[2px_2px_0_0_var(--nb-shadow)]');
  });

  it.each([
    ['accent', 'var(--nb-accent)', 'var(--nb-accent-foreground)'],
    ['success', 'var(--nb-success)', 'var(--nb-success-foreground)'],
    ['warning', 'var(--nb-warning)', 'var(--nb-warning-foreground)'],
    ['danger', 'var(--nb-danger)', 'var(--nb-danger-foreground)'],
  ] satisfies Array<[NbBadgeTone, string, string]>)(
    'tone="%s" resolves shared color tokens',
    async (tone, bg, fg) => {
      const fixture = await createFixture({ tone });
      const badge = findBadge(fixture);

      expect(badge.style.getPropertyValue('background')).toBe(bg);
      expect(badge.style.getPropertyValue('color')).toBe(fg);
      expect(badge.style.getPropertyValue('border-color')).toBe(
        'var(--nb-border)'
      );
      expect(badge.style.getPropertyValue('--nb-badge-bg')).toBe('');
      expect(badge.style.cssText).not.toContain('--nb-resolved');
    }
  );

  it('does not regress the default badge class shape', async () => {
    const fixture = await createFixture();
    const cls = findBadge(fixture).className;

    expect(cls).toContain('inline-flex');
    expect(cls).toContain('items-center');
    expect(cls).toContain('px-2.5');
    expect(cls).toContain('py-0.5');
    expect(cls).toContain('text-xs');
    expect(cls).toContain('font-bold');
  });
});

async function createFixture(
  inputs: Partial<Pick<BadgeTokenTest, 'tone'>> = {}
): Promise<ComponentFixture<BadgeTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [BadgeTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(BadgeTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findBadge(
  fixture: ComponentFixture<BadgeTokenTest>
): HTMLSpanElement {
  return fixture.nativeElement.querySelector(
    'span[nbBadge]'
  ) as HTMLSpanElement;
}
