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
    // No style inputs set — CSS fallback owns the visual defaults.
    expect(surface.getAttribute('data-nb-tone')).toBeNull();
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
    expect(style.getPropertyValue('box-shadow')).toBe('');
    expect(style.getPropertyValue('padding')).toBe('');
    expect(style.getPropertyValue('--nb-surface-radius')).toBe('');
    expect(style.getPropertyValue('--nb-surface-shadow')).toBe('');
    expect(style.getPropertyValue('--nb-surface-border-width')).toBe('');
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
    expect(surface.getAttribute('data-nb-tone')).toBe('cream');

    expect(surface.style.getPropertyValue('background')).toBe('');
    expect(surface.style.getPropertyValue('border-radius')).toBe('');
    expect(surface.style.getPropertyValue('border-width')).toBe('');
    expect(surface.style.getPropertyValue('box-shadow')).toBe('');
    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe(
      'var(--nb-radius-xl, 1rem)'
    );
    expect(surface.style.getPropertyValue('--nb-surface-border-width')).toBe(
      'var(--nb-border-width-thick, 4px)'
    );
    expect(surface.style.getPropertyValue('--nb-surface-shadow')).toBe(
      'var(--nb-shadow-heavy, calc(var(--nb-shadow-offset-x) * 2.5) calc(var(--nb-shadow-offset-y) * 2.5) 0 0 var(--nb-shadow))'
    );
    expect(surface.style.cssText).not.toContain('--nb-resolved');
    expect(surface.getAttribute('data-clip')).toBe('');
    expect(surface.className).toBe('');
  });

  it.each([
    ['surface'],
    ['pink'],
    ['mint'],
    ['lavender'],
    ['blue'],
  ] satisfies readonly [NbSurfaceTone][])(
    'reflects %s as semantic tone state without writing final colors',
    async (tone) => {
      const fixture = await createFixture(ToneSurfaceTest, (instance) => {
        instance.tone = tone;
      });

      const surface = fixture.nativeElement.querySelector(
        '[nbSurface]'
      ) as HTMLElement;

      expect(surface.getAttribute('data-nb-tone')).toBe(tone);
      expect(surface.style.getPropertyValue('background')).toBe('');
      expect(surface.style.getPropertyValue('color')).toBe('');
      expect(surface.style.getPropertyValue('border-color')).toBe('');
    }
  );

  it('leaves component-specific public CSS variables open for tone overrides', async () => {
    const fixture = await createFixture(ToneSurfaceTest, (instance) => {
      instance.tone = 'mint';
    });
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-nb-tone')).toBe('mint');
    expect(surface.style.getPropertyValue('background')).toBe('');
    expect(surface.style.getPropertyValue('--nb-surface-bg')).toBe('');
    expect(surface.style.cssText).not.toContain('--nb-resolved');
  });

  it('supports strong stacked surfaces for compact card shells', async () => {
    const fixture = await createFixture(FlightCardSurfaceTest);
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-layout')).toBe('stack');
    expect(surface.style.getPropertyValue('border-width')).toBe('');
    expect(surface.style.getPropertyValue('box-shadow')).toBe('');
    expect(surface.style.getPropertyValue('border-radius')).toBe('');
    expect(surface.style.getPropertyValue('--nb-surface-border-width')).toBe(
      'var(--nb-border-width-strong, 3px)'
    );
    expect(surface.style.getPropertyValue('--nb-surface-shadow')).toBe(
      'var(--nb-shadow-hard, calc(var(--nb-shadow-offset-x) * 1.5) calc(var(--nb-shadow-offset-y) * 1.5) 0 0 var(--nb-shadow))'
    );
    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe(
      'var(--nb-radius-lg, 0.75rem)'
    );
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
    expect(surface.style.getPropertyValue('padding')).toBe('');
    expect(surface.style.getPropertyValue('border-width')).toBe('');
    expect(surface.style.getPropertyValue('box-shadow')).toBe('');
    expect(surface.style.getPropertyValue('--nb-surface-padding')).toBe('var(--nb-padding-md, 1rem)');
    expect(surface.style.getPropertyValue('--nb-surface-border-width')).toBe(
      '0px'
    );
    expect(surface.style.getPropertyValue('--nb-surface-shadow')).toBe('none');
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
