import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

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
  template: `<span nbIcon src="/icons/star.png" mode="image" decorative></span>`,
})
class ImageModeIconTest {}

@Component({
  imports: [NbIcon],
  template: `<span nbIcon src="/icons/star.svg" tone="danger" decorative></span>`,
})
class ToneIconTest {}

describe('NbIcon', () => {
  it('decorative icon gets aria-hidden and no role', async () => {
    const fixture = await createFixture(DecorativeIconTest);
    const icon = findIcon(fixture);

    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.getAttribute('role')).toBeNull();
    expect(icon.getAttribute('aria-label')).toBeNull();
  });

  it('labeled icon gets role="img" and aria-label', async () => {
    const fixture = await createFixture(LabeledIconTest);
    const icon = findIcon(fixture);

    expect(icon.getAttribute('role')).toBe('img');
    expect(icon.getAttribute('aria-label')).toBe('Star');
    expect(icon.getAttribute('aria-hidden')).toBeNull();
  });

  it('mask mode sets mask-image and background-color for colorization', async () => {
    const fixture = await createFixture(MaskModeIconTest);
    const icon = findIcon(fixture);

    expect(icon.style.maskImage).toContain('url(');
    expect(icon.style.backgroundColor).toBeTruthy();
    expect(icon.style.backgroundImage).toBe('');
  });

  it('image mode sets background-image and suppresses mask', async () => {
    const fixture = await createFixture(ImageModeIconTest);
    const icon = findIcon(fixture);

    expect(icon.style.backgroundImage).toContain('url(');
    expect(icon.style.maskImage).toBe('');
  });

  it('assigns --nb-icon-color CSS variable for override support', async () => {
    const fixture = await createFixture(ToneIconTest);
    const icon = findIcon(fixture);

    expect(icon.style.getPropertyValue('--nb-icon-color')).toBeTruthy();
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
