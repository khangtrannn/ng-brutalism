import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbMediaItem, type NbMediaItemTone } from './nb-media-item';

@Component({
  imports: [NbMediaItem],
  template: `<nb-media-item
    [variant]="variant"
    [tone]="tone"
    title="Title"
    description="Description"
  />`,
})
class MediaItemTokenTest {
  variant: 'plain' | 'boxed' | 'chip' = 'boxed';
  tone: NbMediaItemTone | undefined = undefined;
}

describe('NbMediaItem token surface', () => {
  it('leaves default visuals to CSS token fallbacks', async () => {
    // Arrange
    const fixture = await createFixture();
    const item = findItem(fixture);

    // Assert
    expect(item.getAttribute('data-nb-tone')).toBeNull();
    expect(item.style.getPropertyValue('background')).toBe('');
    expect(item.style.getPropertyValue('color')).toBe('');
    expect(item.style.getPropertyValue('border-color')).toBe('');
  });

  it('reflects tone semantically without writing final colors inline', async () => {
    // Arrange
    const fixture = await createFixture({ tone: 'accent' });
    const item = findItem(fixture);

    // Assert
    expect(item.getAttribute('data-nb-tone')).toBe('accent');
    expect(item.style.getPropertyValue('background')).toBe('');
    expect(item.style.getPropertyValue('color')).toBe('');
    expect(item.style.getPropertyValue('border-color')).toBe('');
  });

  it('reflects tone for the plain variant too (text-only tint)', async () => {
    // Arrange
    const fixture = await createFixture({ variant: 'plain', tone: 'danger' });
    const item = findItem(fixture);

    // Assert
    expect(item.getAttribute('data-nb-tone')).toBe('danger');
    expect(item.getAttribute('data-variant')).toBe('plain');
  });
});

async function createFixture(
  inputs: Partial<Pick<MediaItemTokenTest, 'variant' | 'tone'>> = {}
): Promise<ComponentFixture<MediaItemTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [MediaItemTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(MediaItemTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findItem(fixture: ComponentFixture<MediaItemTokenTest>): HTMLElement {
  return fixture.nativeElement.querySelector('nb-media-item') as HTMLElement;
}
