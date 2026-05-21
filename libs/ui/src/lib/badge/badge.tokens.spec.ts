import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbBadge } from './nb-badge';
import type { NbBadgeVariant } from './badge.types';

@Component({
  imports: [NbBadge],
  template: `<span nbBadge [variant]="variant">Badge</span>`,
})
class BadgeTokenTestComponent {
  variant: NbBadgeVariant = 'default';
}

describe('NbBadge token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const badge = findBadge(fixture);
    const cls = badge.className;

    expect(cls).toContain('[--nb-badge-bg:#fff]');
    expect(cls).toContain('[--nb-badge-fg:var(--nb-foreground)]');
    expect(cls).toContain('[--nb-badge-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-badge-radius:9999px]');
    expect(cls).toContain('[--nb-badge-shadow:2px_2px_0_var(--nb-shadow)]');
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const badge = findBadge(fixture);
    const cls = badge.className;

    expect(cls).toContain('bg-(--nb-badge-bg)');
    expect(cls).toContain('text-(--nb-badge-fg)');
    expect(cls).toContain('border-(--nb-badge-border)');
    expect(cls).toContain('rounded-(--nb-badge-radius)');
    expect(cls).toContain('shadow-[var(--nb-badge-shadow)]');
    expect(cls).not.toContain('bg-(--nb-accent)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-[2px_2px_0_0_var(--nb-shadow)]');
  });

  it.each([
    ['secondary', 'var(--nb-accent)', 'var(--nb-accent-foreground)'],
    ['success', 'var(--nb-success)', 'var(--nb-success-foreground)'],
    ['warning', 'var(--nb-warning)', 'var(--nb-warning-foreground)'],
    ['danger', 'var(--nb-danger)', 'var(--nb-danger-foreground)'],
  ] satisfies Array<[NbBadgeVariant, string, string]>)(
    'variant="%s" reassigns expected color tokens',
    async (variant, bg, fg) => {
      const fixture = await createFixture({ variant });
      const cls = findBadge(fixture).className;

      expect(cls).toContain(`[--nb-badge-bg:${bg}]`);
      expect(cls).toContain(`[--nb-badge-fg:${fg}]`);
    }
  );

  it('does not regress the default badge class shape', async () => {
    const fixture = await createFixture();
    const cls = findBadge(fixture).className;

    expect(cls).toContain('inline-flex');
    expect(cls).toContain('items-center');
    expect(cls).toContain('border-2');
    expect(cls).toContain('px-2.5');
    expect(cls).toContain('py-0.5');
    expect(cls).toContain('text-xs');
    expect(cls).toContain('font-bold');
  });
});

async function createFixture(
  inputs: Partial<Pick<BadgeTokenTestComponent, 'variant'>> = {}
): Promise<ComponentFixture<BadgeTokenTestComponent>> {
  await TestBed.configureTestingModule({
    imports: [BadgeTokenTestComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(BadgeTokenTestComponent);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findBadge(
  fixture: ComponentFixture<BadgeTokenTestComponent>
): HTMLSpanElement {
  return fixture.nativeElement.querySelector(
    'span[nbBadge]'
  ) as HTMLSpanElement;
}
