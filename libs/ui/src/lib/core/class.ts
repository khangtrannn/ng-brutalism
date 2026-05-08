import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind conflict resolution.
 * Publicly exported for consumers extending library components.
 *
 * @example
 * nbClass('px-2 px-4')              // -> 'px-4'
 * nbClass('flex', condition && 'w-full') // -> 'flex w-full' or 'flex'
 */
export function nbClass(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}
