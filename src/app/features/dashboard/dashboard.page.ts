import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PageHeader } from '../../shared/ui/page-header';
import { ProductService } from '../products/data/product.service';

/**
 * A second feature REUSING the products feature's data service.
 * Allowed: using another feature's service. Not allowed: using another feature's pages.
 * (In Session 2 these numbers come from GET /api/stats.)
 */
@Component({
  selector: 'app-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, PageHeader],
  template: `
    <app-page-header title="Dashboard" />

    <div class="cards">
      <div class="card stat"><span>Products</span><b>{{ products.products().length }}</b></div>
      <div class="card stat"><span>Stock value</span><b>{{ products.stockValue() | currency: 'INR' : 'symbol' : '1.0-0' }}</b></div>
      <div class="card stat"><span>Low stock</span><b class="low">{{ products.lowStock().length }}</b></div>
    </div>

    <div class="card">
      <h3>Low stock (under 5)</h3>
      @for (p of products.lowStock(); track p.id) {
        <div class="line"><span>{{ p.name }}</span><span class="low">{{ p.stock }} left</span></div>
      }
    </div>
  `,
})
export default class DashboardPage {
  products = inject(ProductService);
}
