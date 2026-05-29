import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbSurface, type NbSurfaceTone } from './nb-surface';

@Component({
  imports: [NbSurface],
  template: `<div nbSurface>Default surface</div>`,
})
class DefaultSurfaceTest {}

@Component({
  imports: [NbSurface],
  template: `
    <article
      nbSurface
      tone="cream"
      radius="xl"
      border="thick"
      shadow="heavy"
      clip
    >
      Recipe card
    </article>
  `,
})
class RecipeSurfaceTest {}

@Component({
  imports: [NbSurface],
  template: `<div nbSurface [tone]="tone">Tone surface</div>`,
})
class ToneSurfaceTest {
  tone: NbSurfaceTone = 'pink';
}

describe('NbSurface', () => {
  it('applies default brutalist surface classes and metadata', async () => {
    const fixture = await createFixture(DefaultSurfaceTest);
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-nb-surface')).toBe('');
    expect(surface.getAttribute('data-tone')).toBe('default');
    expect(surface.getAttribute('data-radius')).toBe('md');
    expect(surface.getAttribute('data-border')).toBe('default');
    expect(surface.getAttribute('data-shadow')).toBe('default');
    expect(surface.className).toContain('relative');
    expect(surface.className).toContain('bg-(--nb-surface-bg)');
    expect(surface.className).toContain('text-(--nb-surface-fg)');
    expect(surface.className).toContain(
      'border-(length:--nb-surface-border-width)'
    );
    expect(surface.className).toContain('border-(--nb-surface-border)');
    expect(surface.className).toContain('rounded-(--nb-surface-radius)');
    expect(surface.className).toContain('shadow-[var(--nb-surface-shadow)]');
    expect(surface.className).toContain('[--nb-surface-bg:var(--nb-surface)]');
    expect(surface.className).toContain(
      '[--nb-surface-radius:var(--nb-radius)]'
    );
    expect(surface.className).toContain(
      '[--nb-surface-border-width:var(--nb-border-width)]'
    );
    expect(surface.className).not.toContain('overflow-hidden');
  });

  it('maps tone, radius, border, shadow, and bare clip attributes', async () => {
    const fixture = await createFixture(RecipeSurfaceTest);
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-tone')).toBe('cream');
    expect(surface.getAttribute('data-radius')).toBe('xl');
    expect(surface.getAttribute('data-border')).toBe('thick');
    expect(surface.getAttribute('data-shadow')).toBe('heavy');
    expect(surface.className).toContain('[--nb-surface-bg:#fff8e7]');
    expect(surface.className).toContain('[--nb-surface-radius:1.5rem]');
    expect(surface.className).toContain('[--nb-surface-border-width:4px]');
    expect(surface.className).toContain(
      '[--nb-surface-shadow:10px_10px_0_0_var(--nb-shadow)]'
    );
    expect(surface.className).toContain('overflow-hidden');
  });

  it.each([
    ['pink', '#ff6aa2'],
    ['mint', '#b8f7c5'],
    ['lavender', '#dcc8ff'],
    ['blue', '#69b7ff'],
  ] satisfies readonly [NbSurfaceTone, string][])(
    'keeps the %s decorative tone visually distinct from semantic tones',
    async (tone, color) => {
      const fixture = await createFixture(ToneSurfaceTest, (instance) => {
        instance.tone = tone;
      });

      const surface = fixture.nativeElement.querySelector(
        '[nbSurface]'
      ) as HTMLElement;

      expect(surface.getAttribute('data-tone')).toBe(tone);
      expect(surface.className).toContain(`[--nb-surface-bg:${color}]`);
    }
  );
});

async function createFixture<T>(
  component: new () => T,
  setup?: (instance: T) => void
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  setup?.(fixture.componentInstance);
  fixture.detectChanges();

  return fixture;
}
