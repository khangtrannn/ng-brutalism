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

    // Resolved tokens are reflected as data-* by the composed capabilities.
    expect(surface.getAttribute('data-nb-surface')).toBe('');
    expect(surface.getAttribute('data-tone')).toBe('default');
    expect(surface.getAttribute('data-radius')).toBe('md');
    expect(surface.getAttribute('data-border')).toBe('default');
    expect(surface.getAttribute('data-shadow')).toBe('default');
    expect(surface.getAttribute('data-padding')).toBe('none');
    expect(surface.getAttribute('data-edge')).toBe('none');

    // Consumption-only classes — the variables come from the capabilities.
    expect(surface.className).toContain('relative');
    expect(surface.className).toContain('bg-(--nb-surface-bg)');
    expect(surface.className).toContain('text-(--nb-surface-fg)');
    expect(surface.className).toContain('border-[length:var(--nb-surface-border-width,var(--nb-surface-border-width-default))]');
    expect(surface.className).toContain('border-(--nb-surface-border-color)');
    expect(surface.className).toContain('rounded-[var(--nb-surface-radius,var(--nb-surface-radius-default))]');
    expect(surface.className).toContain('shadow-[var(--nb-surface-shadow,var(--nb-surface-shadow-default))]');
    expect(surface.className).toContain('p-[var(--nb-surface-padding)]');
    expect(surface.className).not.toContain('overflow-hidden');

    // Component-specific CSS variables written by the capabilities.
    const style = surface.style;
    expect(style.getPropertyValue('--nb-surface-bg')).toBe('var(--nb-surface)');
    expect(style.getPropertyValue('--nb-surface-fg')).toBe(
      'var(--nb-surface-foreground)'
    );
    expect(style.getPropertyValue('--nb-surface-border-color')).toBe(
      'var(--nb-border)'
    );
    expect(style.getPropertyValue('--nb-surface-radius-default')).toBe(
      'var(--nb-radius)'
    );
    expect(style.getPropertyValue('--nb-surface-border-width-default')).toBe(
      'var(--nb-border-width)'
    );
    expect(style.getPropertyValue('--nb-surface-padding')).toBe('0px');
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
    expect(surface.getAttribute('data-size')).toBe('lg');
    expect(surface.getAttribute('data-layout')).toBe('center');

    expect(surface.style.getPropertyValue('--nb-surface-bg')).toBe(
      'var(--nb-cream)'
    );
    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe('1.5rem');
    expect(surface.style.getPropertyValue('--nb-surface-border-width')).toBe('4px');
    expect(surface.style.getPropertyValue('--nb-surface-shadow')).toBe(
      '10px 10px 0 0 var(--nb-shadow)'
    );
    expect(surface.className).toContain('size-11');
    expect(surface.className).toContain('shrink-0');
    expect(surface.className).toContain('inline-flex');
    expect(surface.className).toContain('items-center');
    expect(surface.className).toContain('justify-center');
    expect(surface.className).toContain('overflow-hidden');
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

      expect(surface.getAttribute('data-tone')).toBe(tone);
      expect(surface.style.getPropertyValue('--nb-surface-bg')).toBe(color);
    }
  );

  it('writes the namespaced --nb-surface-bg from the tone capability', async () => {
    const fixture = await createFixture(ToneSurfaceTest, (instance) => {
      instance.tone = 'mint';
    });
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    // Tone owns the surface-namespaced background variable directly.
    expect(surface.style.getPropertyValue('--nb-surface-bg')).toBe(
      'var(--nb-mint)'
    );
  });

  it('supports strong stacked surfaces for compact card shells', async () => {
    const fixture = await createFixture(FlightCardSurfaceTest);
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-border')).toBe('strong');
    expect(surface.getAttribute('data-layout')).toBe('stack');
    expect(surface.getAttribute('data-radius')).toBe('lg');
    expect(surface.getAttribute('data-shadow')).toBe('hard');
    expect(surface.style.getPropertyValue('--nb-surface-border-width')).toBe('3px');
    expect(surface.style.getPropertyValue('--nb-surface-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe('1rem');
    expect(surface.className).toContain('flex');
    expect(surface.className).toContain('flex-col');
    expect(surface.className).toContain('overflow-hidden');
  });

  it('supports row header bands with padding and a bottom edge', async () => {
    const fixture = await createFixture(HeaderBandSurfaceTest);
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(surface.getAttribute('data-border')).toBe('none');
    expect(surface.getAttribute('data-edge')).toBe('bottom');
    expect(surface.getAttribute('data-layout')).toBe('row');
    expect(surface.getAttribute('data-padding')).toBe('md');
    expect(surface.getAttribute('data-radius')).toBe('none');
    expect(surface.getAttribute('data-shadow')).toBe('none');
    expect(surface.className).toContain('flex');
    expect(surface.className).toContain('items-center');
    expect(surface.className).toContain('p-[var(--nb-surface-padding)]');
    expect(surface.style.getPropertyValue('--nb-surface-padding')).toBe('1rem');
    expect(surface.style.getPropertyValue('--nb-surface-border-width')).toBe('0px');
    expect(surface.style.getPropertyValue('--nb-surface-shadow')).toBe('none');
    expect(surface.className).toContain('border-b-(length:--nb-surface-edge-width)');
    expect(surface.className).toContain('border-b-(--nb-surface-edge-color)');
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
