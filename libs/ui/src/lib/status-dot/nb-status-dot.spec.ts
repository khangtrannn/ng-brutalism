import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbStatusDot } from './nb-status-dot';

@Component({
  imports: [NbStatusDot],
  template: `<span nbStatusDot></span>`,
})
class DefaultStatusDotTest {}

@Component({
  imports: [NbStatusDot],
  template: `<span nbStatusDot state="live" size="lg"></span>`,
})
class LiveStatusDotTest {}

describe('NbStatusDot', () => {
  it('defaults to an online, md dot with an accessible role and label', async () => {
    // Arrange
    const fixture = await createFixture(DefaultStatusDotTest);
    const dot = findDot(fixture);

    // Assert
    expect(dot.getAttribute('data-state')).toBe('online');
    expect(dot.getAttribute('data-size')).toBe('md');
    expect(dot.getAttribute('role')).toBe('img');
    expect(dot.getAttribute('aria-label')).toBe('Status: online');
  });

  it('reflects state and size inputs, updating the aria-label to match', async () => {
    // Arrange
    const fixture = await createFixture(LiveStatusDotTest);
    const dot = findDot(fixture);

    // Assert
    expect(dot.getAttribute('data-state')).toBe('live');
    expect(dot.getAttribute('data-size')).toBe('lg');
    expect(dot.getAttribute('aria-label')).toBe('Status: live');
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

function findDot(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('[nbStatusDot]') as HTMLElement;
}
