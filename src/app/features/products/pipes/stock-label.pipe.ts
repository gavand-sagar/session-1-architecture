import { Pipe, PipeTransform } from '@angular/core';

/**
 * PRODUCT pipe, so it lives inside the products feature, not in shared/.
 * The "low stock" limit is a business rule of this feature.
 *
 *   {{ 0 | stockLabel }}   ->  'Out of stock'
 *   {{ 3 | stockLabel }}   ->  'Low stock'
 *   {{ 25 | stockLabel }}  ->  'In stock'
 */
export const LOW_STOCK_LIMIT = 5;

@Pipe({ name: 'stockLabel' })
export class StockLabelPipe implements PipeTransform {
  transform(stock: number): string {
    if (stock <= 0) return 'Out of stock';
    if (stock < LOW_STOCK_LIMIT) return 'Low stock';
    return 'In stock';
  }
}
