import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { PageHeader } from '../../shared/ui/page-header';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { StockLabelPipe } from '../products/pipes/stock-label.pipe';

/**
 * Pipes = formatting in the template. The data stays as it is, only the display changes.
 * Every pipe you use must be in the component's `imports`.
 */
@Component({
  selector: 'app-pipes-demo-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageHeader,
    DatePipe, CurrencyPipe, DecimalPipe, PercentPipe, UpperCasePipe, TitleCasePipe, SlicePipe, JsonPipe,
    TruncatePipe, StockLabelPipe,
  ],
  template: `
    <app-page-header title="Pipes" />

    <div class="card">
      <h3>1. Built-in pipes</h3>
      <table class="table">
        <thead><tr><th>In the template</th><th>Shows</th></tr></thead>
        <tbody>
          <tr><td><code>{{ '{{' }} today | date {{ '}}' }}</code></td><td>{{ today | date  }}</td></tr>
          <tr><td><code>{{ '{{' }} today | date: 'dd MMM yyyy, HH:mm' {{ '}}' }}</code></td><td>{{ today | date: 'MMMM 27, yy' }}</td></tr>
          <tr><td><code>{{ '{{' }} price | currency: 'INR' {{ '}}' }}</code></td><td>{{ price | currency: 'USD' }}</td></tr>
          <tr><td><code>{{ '{{' }} price | currency: 'INR' : 'symbol' : '1.0-0' {{ '}}' }}</code></td><td>{{ price | currency: 'INR' : 'symbol' : '1.0-0' }}</td></tr>
          <tr><td><code>{{ '{{' }} rating | number: '1.1-1' {{ '}}' }}</code></td><td>{{ rating | number: '1.1-1' }}</td></tr>
          <tr><td><code>{{ '{{' }} discount | percent {{ '}}' }}</code></td><td>{{ discount | percent }}</td></tr>
          <tr><td><code>{{ '{{' }} name | uppercase {{ '}}' }}</code></td><td>{{ name | uppercase }}</td></tr>
          <tr><td><code>{{ '{{' }} 'angular in practice' | titlecase {{ '}}' }}</code></td><td>{{ 'angular in practice' | titlecase }}</td></tr>
          <tr><td><code>{{ '{{' }} tags | slice: 0 : 2 {{ '}}' }}</code></td><td>{{ tags | slice: 0 : 2 }}</td></tr>
          <tr><td><code>{{ '{{' }} product | json {{ '}}' }}</code></td><td><code>{{ product | json }}</code></td></tr>
        </tbody>
      </table>
      <p class="muted">The value after <code>:</code> is an argument. Pipes can be chained: <code>{{ '{{' }} name | slice: 0 : 3 | uppercase {{ '}}' }}</code> shows {{ name | slice: 0 : 3 | uppercase }}.</p>
    </div>

    <div class="card">
      <h3>2. Custom pipe in shared/: truncate</h3>
      <p class="muted">Generic, no business knowledge, so any feature can use it. File: <code>shared/pipes/truncate.pipe.ts</code></p>
      <label>Text <input [value]="text()" (input)="text.set($any($event.target).value)" /></label>
      <label>Max length: {{ max() }} <input type="range" min="3" max="40" [value]="max()" (input)="max.set(+$any($event.target).value)" /></label>
      <p><code>{{ '{{' }} text | truncate: {{ max() }} {{ '}}' }}</code> shows <b>{{ text() | truncate: max() }}</b></p>
    </div>

    <div class="card">
      <h3>3. Custom pipe in a feature: stockLabel</h3>
      <p class="muted">Contains a products business rule (low stock is under 5), so it stays in <code>features/products/pipes/</code>.</p>
      <label>Stock: {{ stock() }} <input type="range" min="0" max="30" [value]="stock()" (input)="stock.set(+$any($event.target).value)" /></label>
      <p><code>{{ '{{' }} {{ stock() }} | stockLabel {{ '}}' }}</code> shows <b>{{ stock() | stockLabel }}</b></p>
      <p class="muted">The same pipe is used in the Products table, so the rule lives in one place.</p>
    </div>

    <div class="card">
      <h3>Where does a pipe go?</h3>
      <table class="table">
        <thead><tr><th>Pipe</th><th>Folder</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>date, currency, uppercase...</td><td>built in (<code>&#64;angular/common</code>)</td><td>just import it</td></tr>
          <tr><td>truncate, initials, fileSize</td><td><code>shared/pipes/</code></td><td>generic, any feature can use it</td></tr>
          <tr><td>stockLabel, orderStatus</td><td><code>features/&lt;area&gt;/pipes/</code></td><td>knows business rules of that area</td></tr>
        </tbody>
      </table>
    </div>
  `,
})
export default class PipesDemoPage {
  today = new Date();
  price = 1499.5;
  rating = 4.267;
  discount = 0.15;
  name = 'keyboard';
  tags = ['electronics', 'usb', 'wireless'];
  product = { id: 1, name: 'Keyboard', price: 1500 };

  text = signal('Angular in Practice: a complete guide');
  max = signal(15);
  stock = signal(3);
}
