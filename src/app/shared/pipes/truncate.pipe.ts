import { Pipe, PipeTransform } from '@angular/core';

/**
 * GENERIC pipe, so it lives in shared/. It knows nothing about products.
 *
 *   {{ 'Angular in Practice' | truncate: 10 }}  ->  'Angular in...'
 */
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, max = 20): string {
    if (!value) return '';
    return value.length > max ? value.slice(0, max).trimEnd() + '...' : value;
  }
}
