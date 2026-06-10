import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbImageCard, NbImageCardCaption } from './nb-image-card';

@Component({
  imports: [NbImageCard, NbImageCardCaption],
  template: `
    <nb-image-card
      image="https://example.com/photo.jpg"
      alt="Example"
    >
      <nb-image-card-caption>A caption</nb-image-card-caption>
    </nb-image-card>
  `,
})
class ImageCardTokenTest {}

describe('NbImageCard token surface', () => {
  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const imageCard = findImageCard(fixture);

    expect(imageCard.style.getPropertyValue('background')).toBe('');
    expect(imageCard.style.getPropertyValue('color')).toBe('');
    expect(imageCard.style.getPropertyValue('border-color')).toBe('');
    expect(imageCard.style.getPropertyValue('--nb-image-card-bg')).toBe('');
    expect(imageCard.style.getPropertyValue('border-radius')).toBe('');
    expect(imageCard.style.getPropertyValue('box-shadow')).toBe('');
    expect(imageCard.style.getPropertyValue('border-width')).toBe('');
    expect(imageCard.style.cssText).not.toContain('--nb-resolved');
  });

  it('does not emit legacy token utility classes', async () => {
    const fixture = await createFixture();
    const imageCard = findImageCard(fixture);
    const cls = imageCard.className;

    expect(cls).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-shadow(?:\s|$)/);
    expect(cls).not.toContain('bg-(--nb-image-card-bg)');
    expect(cls).not.toContain('text-(--nb-image-card-fg)');
    expect(cls).not.toContain('border-(--nb-image-card-border-color)');
    expect(cls).not.toContain('bg-(--nb-background)');
    expect(cls).not.toContain('text-(--nb-foreground)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-nb');
  });

  it('does not put caption divider styles on the image', async () => {
    const fixture = await createFixture();
    const image = findImage(fixture);

    expect(image.className).toBe('');
    expect(image.getAttribute('data-slot')).toBe('image-card-image');
  });

  it('leaves caption divider fallbacks to CSS', async () => {
    const fixture = await createFixture();
    const caption = findCaption(fixture);

    expect(caption.style.getPropertyValue('border-top-width')).toBe('');
    expect(caption.style.getPropertyValue('border-top-color')).toBe('');
    expect(caption.style.cssText).not.toContain('--nb-resolved');
    expect(caption.className).toBe('');
  });

  it('keeps image-card anatomy out of host classes', async () => {
    const fixture = await createFixture();
    const imageCard = findImageCard(fixture);

    expect(imageCard.className).toBe('');
    expect(imageCard.getAttribute('data-slot')).toBe('image-card');
  });
});

async function createFixture(): Promise<
  ComponentFixture<ImageCardTokenTest>
> {
  await TestBed.configureTestingModule({
    imports: [ImageCardTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(ImageCardTokenTest);
  fixture.detectChanges();

  return fixture;
}

function findImageCard(
  fixture: ComponentFixture<ImageCardTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-image-card') as HTMLElement;
}

function findImage(
  fixture: ComponentFixture<ImageCardTokenTest>
): HTMLImageElement {
  return fixture.nativeElement.querySelector('img') as HTMLImageElement;
}

function findCaption(
  fixture: ComponentFixture<ImageCardTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector(
    'nb-image-card-caption'
  ) as HTMLElement;
}
