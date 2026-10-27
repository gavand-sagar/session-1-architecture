import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';

/** CORE layout: the frame around every page (header, navigation, page outlet). Used once. */
@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <b>{{ appName }}</b>
      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/products" routerLinkActive="active">Products</a>
        <a routerLink="/pipes" routerLinkActive="active">Pipes</a>
      </nav>
      <span class="spacer"></span>
      <span class="muted">{{ production ? 'production build' : 'development build' }}</span>
    </header>

    <main class="page">
      <router-outlet />
    </main>
  `,
})
export class Shell {
  appName = environment.appName;
  production = environment.production;
}
