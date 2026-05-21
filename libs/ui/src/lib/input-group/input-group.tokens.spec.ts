import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbInput } from '../input/nb-input';
import { NbInputGroup } from './nb-input-group';
import { NbInputPrefix } from './nb-input-group-prefix';
import { NbInputSuffix } from './nb-input-group-suffix';

@Component({
  standalone: true,
  imports: [NbInput, NbInputGroup, NbInputPrefix, NbInputSuffix],
  template: `
    <nb-input-group>
      <span nbInputPrefix>&#64;</span>
      <input nbInput placeholder="username" />
      <span nbInputSuffix>USD</span>
    </nb-input-group>
  `,
})
class InputGroupTokenTestComponent {}

describe('NbInputGroup token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const group = findGroup(fixture);
    const cls = group.className;

    expect(cls).toContain(
      '[--nb-input-group-bg:var(--nb-input-bg,var(--nb-field-bg))]'
    );
    expect(cls).toContain('[--nb-input-group-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-input-group-radius:var(--nb-radius)]');
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const group = findGroup(fixture);
    const cls = group.className;

    expect(cls).toContain('bg-(--nb-input-group-bg)');
    expect(cls).toContain('border-(--nb-input-group-border)');
    expect(cls).toContain('rounded-(--nb-input-group-radius)');
    expect(cls).not.toContain('bg-(--nb-surface)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
  });

  it('does not regress the default input group class shape', async () => {
    const fixture = await createFixture();
    const group = findGroup(fixture);
    const cls = group.className;

    expect(cls).toContain('relative');
    expect(cls).toContain('inline-flex');
    expect(cls).toContain('w-full');
    expect(cls).toContain('rounded-(--nb-input-group-radius)');
    expect(cls).toContain('border-2');
    expect(cls).toContain('border-(--nb-input-group-border)');
    expect(cls).toContain('shadow-nb');
    expect(cls).toContain('focus-within:outline-none');
    expect(cls).toContain('focus-within:ring-2');
    expect(cls).toContain('focus-within:ring-offset-2');
    expect(cls).toContain('focus-within:ring-(--nb-input-group-border)');
    expect(cls).toContain('focus-within:shadow-none');
  });

  it('uses input-group addon tokens for prefix and suffix backgrounds', async () => {
    const fixture = await createFixture();
    const prefix = findPrefix(fixture);
    const suffix = findSuffix(fixture);

    expect(prefix.className).toContain('[--nb-input-group-addon-bg:#ffd24a]');
    expect(prefix.className).toContain(
      '[--nb-input-group-prefix-bg:var(--nb-input-group-addon-bg)]'
    );
    expect(prefix.className).toContain('bg-(--nb-input-group-prefix-bg)');
    expect(prefix.className).not.toContain('--nb-input-prefix-bg');

    expect(suffix.className).toContain('[--nb-input-group-addon-bg:#ffd24a]');
    expect(suffix.className).toContain(
      '[--nb-input-group-suffix-bg:var(--nb-input-group-addon-bg)]'
    );
    expect(suffix.className).toContain('bg-(--nb-input-group-suffix-bg)');
    expect(suffix.className).not.toContain('--nb-input-addon-bg');
  });
});

async function createFixture(): Promise<
  ComponentFixture<InputGroupTokenTestComponent>
> {
  await TestBed.configureTestingModule({
    imports: [InputGroupTokenTestComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(InputGroupTokenTestComponent);
  fixture.detectChanges();

  return fixture;
}

function findGroup(
  fixture: ComponentFixture<InputGroupTokenTestComponent>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-input-group') as HTMLElement;
}

function findPrefix(
  fixture: ComponentFixture<InputGroupTokenTestComponent>
): HTMLElement {
  return fixture.nativeElement.querySelector('[nbInputPrefix]') as HTMLElement;
}

function findSuffix(
  fixture: ComponentFixture<InputGroupTokenTestComponent>
): HTMLElement {
  return fixture.nativeElement.querySelector('[nbInputSuffix]') as HTMLElement;
}
