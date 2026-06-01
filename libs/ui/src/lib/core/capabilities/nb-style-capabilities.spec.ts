import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbButton } from '../../button';
import { NbMediaFrame } from '../../media-frame';
import { NbStack } from '../../stack';
import { NbSurface } from '../../surface';

function mount<T>(type: new () => T): HTMLElement {
  const fixture: ComponentFixture<T> = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

@Component({
  imports: [NbSurface],
  template: `<div nbSurface tone="mint" radius="xl">Loud</div>`,
})
class SurfaceExplicitTest {}

@Component({
  imports: [NbSurface],
  template: `<div nbSurface>Defaults</div>`,
})
class SurfaceDefaultsTest {}

@Component({
  imports: [NbButton],
  template: `<button nbButton tone="lavender">Listen</button>`,
})
class ButtonToneTest {}

@Component({
  imports: [NbMediaFrame],
  template: `<div nbMediaFrame shadow="hard"></div>`,
})
class MediaFrameTest {}

@Component({
  imports: [NbStack],
  template: `<div nbStack gap="lg"></div>`,
})
class StackTest {}

describe('style capabilities', () => {
  it('nbSurface writes namespaced radius + tone variables from explicit inputs', () => {
    const el = mount(SurfaceExplicitTest);
    const surface = el.querySelector<HTMLElement>('[nbSurface]')!;

    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe('1.5rem');
    expect(surface.style.getPropertyValue('--nb-surface-bg')).toBe(
      'var(--nb-mint)'
    );
    expect(surface.style.getPropertyValue('--nb-surface-fg')).toBe('#000000');
    expect(surface.style.getPropertyValue('--nb-surface-border-color')).toBe(
      'var(--nb-border)'
    );
  });

  it('nbSurface applies primitive defaults when inputs are omitted', () => {
    const el = mount(SurfaceDefaultsTest);
    const surface = el.querySelector<HTMLElement>('[nbSurface]')!;

    // default radius 'md' -> var(--nb-radius); default border 'default' -> var(--nb-border-width)
    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe(
      'var(--nb-radius)'
    );
    expect(surface.style.getPropertyValue('--nb-surface-border-width')).toBe(
      'var(--nb-border-width)'
    );
  });

  it('nbButton tone writes --nb-button-bg, not --nb-surface-bg', () => {
    const el = mount(ButtonToneTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    expect(button.style.getPropertyValue('--nb-button-bg')).toBe(
      'var(--nb-lavender)'
    );
    expect(button.style.getPropertyValue('--nb-surface-bg')).toBe('');
  });

  it('nbMediaFrame shadow writes namespaced --nb-media-frame-shadow', () => {
    const el = mount(MediaFrameTest);
    const frame = el.querySelector<HTMLElement>('[nbMediaFrame]')!;

    expect(frame.style.getPropertyValue('--nb-media-frame-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
  });

  it('nbStack gap writes --nb-stack-gap', () => {
    const el = mount(StackTest);
    const stack = el.querySelector<HTMLElement>('[nbStack]')!;

    expect(stack.style.getPropertyValue('--nb-stack-gap')).toBe('1rem');
  });
});
