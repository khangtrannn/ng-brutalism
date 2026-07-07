import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbDialog } from './nb-dialog';

@Component({
  imports: [NbDialog],
  template: `<nb-dialog (closed)="onClosed()" />`,
})
class DialogClosedTest {
  closedCount = 0;

  onClosed(): void {
    this.closedCount++;
  }
}

describe('NbDialog', () => {
  it('emits closed whenever the native dialog fires its close event', async () => {
    const fixture = await createFixture();
    const dialogEl = findDialogEl(fixture);

    dialogEl.dispatchEvent(new Event('close'));

    expect(fixture.componentInstance.closedCount).toBe(1);
  });
});

async function createFixture(): Promise<ComponentFixture<DialogClosedTest>> {
  await TestBed.configureTestingModule({
    imports: [DialogClosedTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(DialogClosedTest);
  fixture.detectChanges();

  return fixture;
}

function findDialogEl(
  fixture: ComponentFixture<DialogClosedTest>
): HTMLDialogElement {
  return fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
}
