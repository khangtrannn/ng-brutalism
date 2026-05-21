import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbImageCard, NbImageCardCaption } from './nb-image-card';

@Component({
  standalone: true,
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
class ImageCardTokenTestComponent {}

describe('NbImageCard token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const imageCard = findImageCard(fixture);
    const cls = imageCard.className;

    expect(cls).toContain('[--nb-image-card-bg:var(--nb-background)]');
    expect(cls).toContain('[--nb-image-card-fg:var(--nb-foreground)]');
    expect(cls).toContain('[--nb-image-card-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-image-card-radius:var(--nb-radius)]');
    expect(cls).toContain(
      '[--nb-image-card-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    );
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const imageCard = findImageCard(fixture);
    const cls = imageCard.className;

    expect(cls).toContain('bg-(--nb-image-card-bg)');
    expect(cls).toContain('text-(--nb-image-card-fg)');
    expect(cls).toContain('border-(--nb-image-card-border)');
    expect(cls).toContain('rounded-(--nb-image-card-radius)');
    expect(cls).toContain('shadow-[var(--nb-image-card-shadow)]');
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

    expect(cls).toContain('border-t-2');
    expect(cls).toContain('border-(--nb-image-card-border)');
    expect(cls).not.toContain('border-(--nb-border)');
  });

  it('does not regress the default image-card class shape', async () => {
    const fixture = await createFixture();
    const imageCard = findImageCard(fixture);
    const cls = imageCard.className;

    expect(cls).toContain('flex');
    expect(cls).toContain('flex-col');
    expect(cls).toContain('overflow-hidden');
    expect(cls).toContain('border-2');
    expect(cls).toContain('font-medium');
  });
});

async function createFixture(): Promise<
  ComponentFixture<ImageCardTokenTestComponent>
> {
  await TestBed.configureTestingModule({
    imports: [ImageCardTokenTestComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(ImageCardTokenTestComponent);
  fixture.detectChanges();

  return fixture;
}

function findImageCard(
  fixture: ComponentFixture<ImageCardTokenTestComponent>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-image-card') as HTMLElement;
}

function findImage(
  fixture: ComponentFixture<ImageCardTokenTestComponent>
): HTMLImageElement {
  return fixture.nativeElement.querySelector('img') as HTMLImageElement;
}

function findCaption(
  fixture: ComponentFixture<ImageCardTokenTestComponent>
): HTMLElement {
  return fixture.nativeElement.querySelector(
    'nb-image-card-caption'
  ) as HTMLElement;
}
