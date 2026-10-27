# Session 1 of 4 — Application Architecture

| Session | Project | Builds |
|---------|---------|--------|
| **1** | **session-1-architecture** (this one) | folder structure, layout, environments, shared UI |
| 2 | session-2-auth-http | login, protected routes, interceptors, dashboard from the API |
| 3 | session-3-performance-testing | search and filters, OnPush, unit tests, production build |
| 4 | session-4-final-project | create / edit / delete with reactive forms |

This project is the **finished state of Session 1**. Each project adds to the one before it.

## Run it

```bash
npm install
npm start
```

Open http://localhost:4200. There is no backend yet: product data lives in a service.

---

**Duration:** 2 hours
**Goal:** students can open any Angular project and decide where a new file belongs, and why.

## Topics

1. Feature-based application architecture
2. Core, Shared and Feature areas
3. Smart vs presentational components
4. Reusable components, services and pipes
5. Environment configuration

## Agenda

| Time | Part |
|------|------|
| 0:00 – 0:10 | Opening: why structure matters |
| 0:10 – 0:30 | 1 + 2. Feature-based architecture: core / shared / features |
| 0:30 – 0:50 | 3. Smart vs presentational components |
| 0:50 – 1:10 | 4. Reusable components, services and pipes |
| 1:10 – 1:20 | 5. Environment configuration |
| 1:20 – 1:30 | Break |
| 1:30 – 1:55 | **Lab:** build this project from `ng new` |
| 1:55 – 2:00 | Takeaways + homework |

---

## Opening: why structure matters (10 min)

**Ask:** "You join a team. A bug says 'the product table is broken'. Where do you look?"

- **By file type** (`components/`, `services/`, `models/` with 80 files each): you search everywhere.
- **By feature** (`features/products/`): everything about products is in one folder.

---

## 1 + 2. Feature-based architecture: core, shared, features (20 min)

```
src/app/
├── core/                        created ONCE, used app-wide
│   ├── layout/shell.ts          header + nav + <router-outlet>
│   ├── notifications/           toast messages
│   └── config.ts                API_URL token (read from the environment)
├── shared/                      reusable, NO business logic
│   ├── ui/                      page header, loading / error / empty states
│   └── pipes/                   generic pipes (truncate)
└── features/                    one folder per business area, lazy loaded
    ├── dashboard/
    ├── pipes-demo/              teaching page for pipes
    └── products/
        ├── data/                model + ProductService
        ├── pipes/               product pipes (stockLabel)
        ├── pages/               SMART: product-list.page.ts
        ├── components/          PRESENTATIONAL: product-table.ts
        └── products.routes.ts
```

| Area | Put here | Never put here |
|------|----------|----------------|
| `core/` | layout, notifications, later: auth, interceptors | feature pages |
| `shared/` | generic UI: page header, states, pipes | data access, business rules |
| `features/x/` | everything for area x | things the whole app needs |

**Dependency rule:** features use core and shared. Shared never imports from features.

**Show:**
1. Open `features/products/`. Data, pages and components are all in one place.
2. `features/dashboard/dashboard.page.ts` reuses `ProductService` from products. Using another feature's **service** is OK, but its **pages** are not.
3. `shared/ui/page-header.ts` is used by both pages.

**Ask:** "Where would a `ConfirmDialog` go?" (`shared/ui/`) "An `OrdersService`?" (`features/orders/data/`) "The login logic?" (`core/auth/`, Session 2)

---

## 3. Smart vs presentational components (20 min)

| | Smart (page / container) | Presentational (UI) |
|---|---|---|
| Here | `ProductListPage` | `ProductTable` |
| Knows about | services, router, toasts | only its `input()`s |
| Communicates | `inject()` | `input()` in, `output()` out |
| Reusable / testable | rarely / harder | yes / easy |

**Show:** open `pages/product-list.page.ts` and `components/product-table.ts` side by side.
- The table only emits `select` when you click **Details**.
- The page decides what that means: here, a toast. In Session 4 it will open the edit form.

**Rule of thumb:** pages are smart, and almost everything inside a page is presentational.

---

## 4. Reusable components, services and pipes (20 min)

| Piece | File | Used by |
|-------|------|---------|
| `<app-page-header>` with `<ng-content />` | `shared/ui/page-header.ts` | both pages |
| `<app-loading>`, `<app-error>`, `<app-empty>` | `shared/ui/states.ts` | products page (more in Session 2) |
| `ProductService` (signals + `computed`) | `features/products/data/product.service.ts` | products page, dashboard |
| `NotificationService` | `core/notifications/` | products page |

**Teach:** reusable means no hidden dependencies. Data comes in through inputs or method parameters, and results go out through outputs or return values.

**Show:** click **Details** on a product. The toast comes from a core service the page injected.

### Pipes (open the Pipes page)

A pipe formats a value in the template. The data itself doesn't change.

```html
{{ price | currency: 'INR' }}           built in, with an argument
{{ name | slice: 0 : 3 | uppercase }}   chained
{{ title | truncate: 15 }}              custom
```

```ts
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, max = 20) { ... }
}
```

| Pipe | Folder | Why |
|------|--------|-----|
| `date`, `currency`, `uppercase`... | built in | import from `@angular/common` |
| `truncate` | `shared/pipes/` | generic, knows nothing about products |
| `stockLabel` | `features/products/pipes/` | has a products rule: low stock means under 5 |

**Show:**
1. On the Pipes page, move the sliders. The output changes, but the original value doesn't.
2. Open Products: the **Availability** column uses the same `stockLabel` pipe, so the rule lives in one place.
3. Every pipe must be listed in the component's `imports`.

**Ask:** "Where would an `initials` pipe go (`Arjun Mehta` to `AM`)?" (`shared/pipes/`) "And an `orderStatus` pipe?" (`features/orders/pipes/`)

---

## 5. Environment configuration (10 min)

```
src/environments/environment.ts              → production  (npm run build)
src/environments/environment.development.ts  → development (npm start)
```

`angular.json` swaps the file in the development build (`fileReplacements`).

**Show:**
- With `npm start`, the header says "Product Manager (DEV)" and "development build".
- With `npm run build`, the bundle contains "Product Manager".
- `core/config.ts` exposes `apiUrl` as an `API_URL` token, ready for Session 2.

**Warn:** never put secrets in environment files. Everything in them ends up in the browser.

---

## Lab: build this project from `ng new` (25 min)

```bash
ng new my-product-manager --style=scss --ssr=false
```

1. Create the folders: `core/layout`, `core/notifications`, `shared/ui`, `features/dashboard`, `features/products/{data,pages,components}`.
2. Run `ng g environments`, then add `appName` and `apiUrl` to both files.
3. `core/layout/shell.ts`: a header with the app name from the environment, nav links and `<router-outlet />`.
4. `shared/ui/page-header.ts`: an `input()` title plus `<ng-content />`.
5. `features/products/data/product.service.ts`: a private `signal` with products, a public read-only signal, and a `lowStock` computed.
6. `components/product-table.ts` (presentational): `input()` products, `output()` select.
7. `pages/product-list.page.ts` (smart): inject the service, pass data to the table, handle `select`.
8. `features/products/pipes/stock-label.pipe.ts`, used in a new Availability column in the table.
9. Routes: Shell with lazy `dashboard` and `products` children.

**Done when:** your app looks and behaves like this project.

---

## Takeaways

1. Organise **by feature**: core = once, shared = generic, features = business areas.
2. Pages are **smart**, and the pieces inside them are **presentational**.
3. Reusable means no hidden dependencies: inputs in, outputs out.
4. Pipes format values in templates. Generic ones go in `shared/`, rule-based ones stay in their feature.
5. Environment files hold config, never secrets.

## Homework

- Read `interview-prep/05-architecture-performance-testing.md` (Architecture part) and `03-services-di-and-state.md`. They're in **session-4-final-project**.
- Draw the folder tree of a project you know and mark what you would move.
