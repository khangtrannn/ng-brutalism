import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbBadge } from './badge.directive';

@Component({
  standalone: true,
  imports: [NbBadge],
  template: `<span nbBadge>New</span>`,
})
class BadgeTestComponent {}

describe('NbBadge', () => {
  it('uses a badge-specific radius token', async () => {
    const fixture = await createFixture(BadgeTestComponent);
    const badge = fixture.nativeElement.querySelector(
      'span[nbBadge]'
    ) as HTMLSpanElement;

    expect(badge.className).toContain('rounded-(--nb-badge-radius)');
    expect(badge.className).toContain('[--nb-badge-radius:9999px]');
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
