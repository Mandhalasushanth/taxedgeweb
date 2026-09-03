# TaxEdge Web — working notes

React 19 + TypeScript + Vite. Modular monolith; read `ARCHITECTURE.md` before
adding anything. Sister project: the TaxEdge Expo app in `../Taxedge/mobile-app`.

## Non-negotiables

- **TypeScript everywhere.** No `.js` / `.jsx` files. `strict` is on; keep it on.
- **External CSS only.** A `.css` file beside each component/page, imported by
  it. No inline style objects, no CSS-in-JS, no utility-class frameworks.
- **Use the design tokens** in `shared/theme/variables.css` — never a raw hex
  value in a component stylesheet.
- **Never import across module internals.** Go through the module's `index.ts`,
  or move the shared thing into `shared/` or `core/`.
- **No hard-coded URLs or endpoints.** `core/config/routePaths.ts` and
  `core/api/apiEndpoints.ts`.
- **Use the standardized enums.** Roles (`CUSTOMER`, `SUPER_ADMIN`, `ADMIN`,
  `MANAGER`, `*_AGENT`) and statuses (`DRAFT` … `CANCELLED`) are the backend's
  values. Map them to labels; never invent a variant.
- **Staff code lives in `modules/staff/`**, customer code never does, and
  neither reaches into the other's internals.
- **Permissions gate navigation and UX only.** Assume the backend re-checks
  everything.
- **HTTP only through `apiClient`** (`core/api`) so auth headers, token refresh
  and `AppError` normalisation apply everywhere.

## Conventions

- Pages export both a named and a default export (the default is what
  `routes.tsx` lazy-loads).
- CSS class names are BEM-ish and prefixed by their block: `.gst-card__name`.
- Forms use `useZodForm` + a schema in the module's `validation/` folder.
- Async data uses `useAsync` behind a module hook returning
  `{ data, isLoading, error, refetch }`.

## Commands

```bash
npm run dev        # vite dev server on :5173
npm run build      # tsc -b && vite build
npm run typecheck  # tsc -b
npm run lint       # oxlint
```
