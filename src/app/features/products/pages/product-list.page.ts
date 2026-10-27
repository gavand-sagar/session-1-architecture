import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PageHeader } from '../../../shared/ui/page-header';
import { EmptyState } from '../../../shared/ui/states';
import { ProductTable } from '../components/product-table';
import { ProductService } from '../data/product.service';
import { Product } from '../data/product.model';

/**
 * SMART (container) page:
 *   - injects services (ProductService, NotificationService)
 *   - passes plain data DOWN to the presentational table
 *   - decides what happens when the table emits an event
 */
@Component({
  selector: 'app-product-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeader, ProductTable, EmptyState],
  template: `
    <app-page-header title="Products">
      <span class="muted">{{ products.products().length }} products</span>
    </app-page-header>

    @if (products.products().length) {
      <app-product-table [products]="products.products()" (select)="showDetails($event)" />
    } @else {
      <app-empty message="No products yet" />
    }
  `,
})
export class ProductListPage {
  products = inject(ProductService);
  private notify = inject(NotificationService);

  showDetails(p: Product) {
    this.notify.success(`${p.name}: ${p.stock} in stock`);
  }
}
