import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../data/product.model';

/**
 * PRESENTATIONAL component:
 *   - gets data only through input()
 *   - reports clicks only through output()
 *   - no services, no router, no HTTP → easy to reuse and to test
 */
@Component({
  selector: 'app-product-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <table class="table">
      <thead>
        <tr><th>Name</th><th>Category</th><th class="num">Price</th><th class="num">Stock</th><th></th></tr>
      </thead>
      <tbody>
        @for (p of products(); track p.id) {
          <tr>
            <td>{{ p.name }}</td>
            <td><span class="tag">{{ p.category }}</span></td>
            <td class="num">{{ p.price | currency: 'INR' : 'symbol' : '1.0-0' }}</td>
            <td class="num" [class.low]="p.stock < 5">{{ p.stock }}</td>
            <td class="row-actions"><button (click)="select.emit(p)">Details</button></td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class ProductTable {
  products = input.required<Product[]>();
  select = output<Product>();
}
