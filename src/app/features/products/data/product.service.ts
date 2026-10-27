import { Injectable, computed, signal } from '@angular/core';
import { Product } from './product.model';

/**
 * REUSABLE SERVICE: the only place that owns product data in Session 1.
 * Pages read from it; they never keep their own copy.
 * In Session 2 this data comes from the REST API instead (ProductApi).
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _products = signal<Product[]>([
    { id: 1, name: 'Keyboard', category: 'electronics', price: 1500, stock: 25 },
    { id: 2, name: 'Mouse', category: 'electronics', price: 700, stock: 4 },
    { id: 3, name: 'Monitor', category: 'electronics', price: 9000, stock: 8 },
    { id: 4, name: 'Angular in Practice', category: 'books', price: 650, stock: 40 },
    { id: 5, name: 'RxJS Handbook', category: 'books', price: 550, stock: 2 },
    { id: 6, name: 'Building Blocks', category: 'toys', price: 1200, stock: 15 },
    { id: 7, name: 'Desk Lamp', category: 'home', price: 900, stock: 0 },
  ]);

  readonly products = this._products.asReadonly();
  readonly lowStock = computed(() => this._products().filter((p) => p.stock < 5));
  readonly stockValue = computed(() => this._products().reduce((sum, p) => sum + p.price * p.stock, 0));
}
