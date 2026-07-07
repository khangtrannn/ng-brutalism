import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbTitle } from './nb-title';

@Component({
  imports: [NbTitle],
  template: `<h1 nbTitle>Ng Brutalism</h1>`,
})
class TitleTest {}

describe('NbTitle', () => {
  it('marks the host with the wave underline data attributes', async () => {
    const fixture = await createFixture(TitleTest);
    const title = fixture.nativeElement.querySelector(
      'h1[nbTitle]'
    ) as HTMLElement;

    expect(title.getAttribute('data-nb-title')).toBe('');
    expect(title.getAttribute('data-underline')).toBe('wave');
    expect(title.textContent?.trim()).toBe('Ng Brutalism');
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
