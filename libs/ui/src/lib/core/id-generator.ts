import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NbIdGenerator {
  private counter = 0;

  next(): number {
    return this.counter++;
  }
}
