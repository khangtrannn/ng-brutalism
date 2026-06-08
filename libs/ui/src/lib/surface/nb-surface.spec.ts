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
      size="lg"
      layout="center"
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

@Component({
  imports: [NbSurface],
  template: `
    <section nbSurface border="strong" layout="stack" radius="lg" shadow="hard" clip>
      Flight card
    </section>
  `,
})
class FlightCardSurfaceTest {}

@Component({
  imports: [NbSurface],
  template: `
    <header
      nbSurface
      border="none"
      edge="bottom"
      layout="row"
      padding="md"
      radius="none"
      shadow="none"
    >
      Flight header
    </header>
  `,
})
class HeaderBandSurfaceTest {}

describe('NbSurface', () => {
  it('applies default brutalist surface classes, metadata, and component variables', async () => {
    const fixture = await createFixture(DefaultSurfaceTest);
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-nb-surface')).toBe('');
    // No style inputs set — capability attrs stay absent; CSS fallback owns the
    // visual defaults. Attribute presence means "consumer chose this".
    expect(surface.getAttribute('data-tone')).toBeNull();
    expect(surface.getAttribute('data-radius')).toBeNull();
    expect(surface.getAttribute('data-border')).toBeNull();
    expect(surface.getAttribute('data-shadow')).toBeNull();
    expect(surface.getAttribute('data-padding')).toBeNull();
    expect(surface.getAttribute('data-edge')).toBe('none');

    expect(surface.getAttribute('data-clip')).toBeNull();
    expect(surface.className).toBe('');

    const style = surface.style;
    expect(style.getPropertyValue('background')).toBe('');
    expect(style.getPropertyValue('color')).toBe('');
    expect(style.getPropertyValue('border-color')).toBe('');
    expect(style.getPropertyValue('--nb-surface-bg')).toBe('');
    expect(style.getPropertyValue('border-radius')).toBe('');
    expect(style.getPropertyValue('border-width')).toBe('');
    expect(style.getPropertyValue('padding')).toBe('');
    expect(style.getPropertyValue('--nb-surface-padding')).toBe('');
    expect(style.cssText).not.toContain('--nb-resolved');
  });

  it('maps tone, radius, border, shadow, and bare clip attributes', async () => {
    const fixture = await createFixture(RecipeSurfaceTest);
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-size')).toBe('lg');
    expect(surface.getAttribute('data-layout')).toBe('center');

    // Explicit inputs win outright — literal values, no public hook.
    expect(surface.style.getPropertyValue('background')).toBe('var(--nb-cream)');
    expect(surface.style.getPropertyValue('border-radius')).toBe('1rem');
    expect(surface.style.getPropertyValue('border-width')).toBe('4px');
    expect(surface.style.getPropertyValue('box-shadow')).toBe(
      '10px 10px 0 0 var(--nb-shadow)'
    );
    expect(surface.style.cssText).not.toContain('--nb-resolved');
    expect(surface.getAttribute('data-clip')).toBe('');
    expect(surface.className).toBe('');
  });

  it.each([
    ['pink', 'var(--nb-pink)'],
    ['mint', 'var(--nb-mint)'],
    ['lavender', 'var(--nb-lavender)'],
    ['blue', 'var(--nb-blue)'],
  ] satisfies readonly [NbSurfaceTone, string][])(
    'keeps the %s decorative tone visually distinct from semantic tones',
    async (tone, color) => {
      const fixture = await createFixture(ToneSurfaceTest, (instance) => {
        instance.tone = tone;
      });

      const surface = fixture.nativeElement.querySelector(
        '[nbSurface]'
      ) as HTMLElement;

      expect(surface.style.getPropertyValue('background')).toBe(color);
    }
  );

  it('writes actual background from the tone capability', async () => {
    const fixture = await createFixture(ToneSurfaceTest, (instance) => {
      instance.tone = 'mint';
    });
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.style.getPropertyValue('background')).toBe('var(--nb-mint)');
    expect(surface.style.getPropertyValue('--nb-surface-bg')).toBe('');
    expect(surface.style.cssText).not.toContain('--nb-resolved');
  });

  it('supports strong stacked surfaces for compact card shells', async () => {
    const fixture = await createFixture(FlightCardSurfaceTest);
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-layout')).toBe('stack');
    expect(surface.style.getPropertyValue('border-width')).toBe('3px');
    expect(surface.style.getPropertyValue('box-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(surface.style.getPropertyValue('border-radius')).toBe('0.75rem');
    expect(surface.getAttribute('data-layout')).toBe('stack');
    expect(surface.getAttribute('data-clip')).toBe('');
    expect(surface.className).toBe('');
  });

  it('supports row header bands with padding and a bottom edge', async () => {
    const fixture = await createFixture(HeaderBandSurfaceTest);
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-edge')).toBe('bottom');
    expect(surface.getAttribute('data-layout')).toBe('row');
    expect(surface.style.getPropertyValue('padding')).toBe('1rem');
    expect(surface.style.getPropertyValue('border-width')).toBe('0px');
    expect(surface.style.getPropertyValue('box-shadow')).toBe('none');
    expect(surface.className).toBe('');
  });
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
