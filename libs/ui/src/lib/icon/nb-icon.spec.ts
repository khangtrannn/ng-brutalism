import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { NbIcon } from './nb-icon';

@Component({
  imports: [NbIcon],
  template: `<span nbIcon src="/icons/star.svg" decorative></span>`,
})
class DecorativeIconTest {}

@Component({
  imports: [NbIcon],
  template: `<span nbIcon src="/icons/star.svg" label="Star"></span>`,
})
class LabeledIconTest {}

@Component({
  imports: [NbIcon],
  template: `<span nbIcon src="/icons/star.svg" mode="mask" decorative></span>`,
})
class MaskModeIconTest {}

@Component({
  imports: [NbIcon],
  template: `<span
    nbIcon
    src="/icons/star.png"
    mode="image"
    decorative
  ></span>`,
})
class ImageModeIconTest {}

@Component({
  imports: [NbIcon],
  template: `<span
    nbIcon
    src="/icons/star.svg"
    tone="danger"
    decorative
  ></span>`,
})
class ToneIconTest {}

@Component({
  imports: [NbIcon],
  template: `<span nbIcon src="/icons/star.svg"></span>`,
})
class BareIconTest {}

describe('NbIcon', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('decorative icon gets aria-hidden and no role', async () => {
    // Arrange
    const fixture = await createFixture(DecorativeIconTest);
    const icon = findIcon(fixture);

    // Assert
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.getAttribute('role')).toBeNull();
    expect(icon.getAttribute('aria-label')).toBeNull();
    expect(icon.getAttribute('data-icon-tone')).toBeNull();
    expect(icon.getAttribute('data-tone')).toBeNull();
  });

  it('labeled icon gets role="img" and aria-label', async () => {
    // Arrange
    const fixture = await createFixture(LabeledIconTest);
    const icon = findIcon(fixture);

    // Assert
    expect(icon.getAttribute('role')).toBe('img');
    expect(icon.getAttribute('aria-label')).toBe('Star');
    expect(icon.getAttribute('aria-hidden')).toBeNull();
  });

  it('mask mode sets mask-image inline and leaves colorization to CSS', async () => {
    // Arrange
    const fixture = await createFixture(MaskModeIconTest);
    const icon = findIcon(fixture);

    // Assert
    expect(icon.style.maskImage).toContain('url(');
    expect(icon.style.backgroundImage).toBe('');
    expect(icon.style.backgroundColor).toBe('');
    expect(icon.getAttribute('data-mode')).toBe('mask');
  });

  it('image mode sets background-image and suppresses mask', async () => {
    // Arrange
    const fixture = await createFixture(ImageModeIconTest);
    const icon = findIcon(fixture);

    // Assert
    expect(icon.style.backgroundImage).toContain('url(');
    expect(icon.style.maskImage).toBe('');
  });

  it('assigns --nb-icon-color CSS variable for override support', async () => {
    // Arrange
    const fixture = await createFixture(ToneIconTest);
    const icon = findIcon(fixture);

    // Assert
    expect(icon.getAttribute('data-icon-tone')).toBe('danger');
    expect(icon.getAttribute('data-tone')).toBeNull();
    expect(icon.style.getPropertyValue('--nb-icon-color')).toBeTruthy();
  });

  it('warns once in dev mode when icon is neither decorative nor labeled', async () => {
    // Arrange
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const fixture = await createFixture(BareIconTest);

    // Act
    fixture.detectChanges();

    // Assert
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      '[ng-brutalism] nbIcon should be marked decorative or given a label.'
    );
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

function findIcon(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('[nbIcon]') as HTMLElement;
}
