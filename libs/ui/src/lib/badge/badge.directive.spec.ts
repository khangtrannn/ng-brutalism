import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbBadge } from './nb-badge';

@Component({
  imports: [NbBadge],
  template: `<span nbBadge>New</span>`,
})
class BadgeTest {}

describe('NbBadge', () => {
  it('leaves radius defaults to CSS token fallbacks', async () => {
    const fixture = await createFixture(BadgeTest);
    const badge = fixture.nativeElement.querySelector(
      'span[nbBadge]'
    ) as HTMLSpanElement;

    expect(badge.className).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(badge.style.getPropertyValue('border-radius')).toBe('');
    expect(badge.style.cssText).not.toContain('--nb-resolved');
    expect(badge.className).not.toContain('rounded-nb');
  });
});

async function createFixture<T>(
  component: new () => T
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}
