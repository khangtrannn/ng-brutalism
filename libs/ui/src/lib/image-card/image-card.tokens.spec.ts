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
    const cls = image.className;

    expect(cls).toContain('block');
    expect(cls).toContain('w-full');
    expect(cls).toContain('h-auto');
    expect(cls).not.toContain('border-b-2');
    expect(cls).not.toContain('border-(--nb-border)');
  });

  it('uses the scoped border token for the caption divider', async () => {
    const fixture = await createFixture();
    const caption = findCaption(fixture);
    const cls = caption.className;

    expect(caption.style.getPropertyValue('border-top-width')).toBe(
      'var(--nb-image-card-border-width, var(--nb-border-width))'
    );
    expect(caption.style.getPropertyValue('border-top-color')).toBe(
      'var(--nb-image-card-border-color, var(--nb-border))'
    );
    expect(caption.style.cssText).not.toContain('--nb-resolved');
    expect(cls).toContain('border-t-solid');
    expect(cls).not.toContain('border-(--nb-border)');
  });

  it('does not regress the default image-card class shape', async () => {
    const fixture = await createFixture();
    const imageCard = findImageCard(fixture);
    const cls = imageCard.className;

    expect(cls).toContain('flex');
    expect(cls).toContain('flex-col');
    expect(cls).toContain('overflow-hidden');
    expect(cls).toContain('font-medium');
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
