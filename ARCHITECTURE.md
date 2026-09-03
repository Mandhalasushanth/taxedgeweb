# TaxEdge Web — Architecture

A **modular monolith**: one deployable React app, split into self-contained
business modules. Each module owns its pages, components, API calls, hooks,
services, types, validation and CSS.

## Layers

```
                app        (routing, providers, layouts — thin)
                 |
                 v
             modules       (business domains — where features live)
                 |
        +--------+--------+
        v                 v
      core             shared
 (infrastructure)   (design system + generic helpers)
```

| Layer     | Owns                                                              | May import        |
|-----------|-------------------------------------------------------------------|-------------------|
| `app/`    | Router, guards, providers, layouts, 404                            | everything        |
| `modules/`| One folder per business domain, plus `staff/`                      | `core`, `shared`, `store` |
| `core/`   | HTTP client, endpoints, auth session, permissions, config, errors, storage | nothing internal  |
| `shared/` | UI kit, generic hooks, utils, common types, theme                  | `core/config` only |
| `store/`  | Global Zustand slices (auth mirror, theme, toasts, preferences)    | `core`            |

### The rules that matter

1. **A module never reaches into another module's internals.**
   `modules/gst/...` may import `@modules/itr` (its `index.ts` barrel) but never
   `@modules/itr/services/itrService`. If two modules need the same thing, it
   belongs in `shared/` or `core/`.
2. **`core/` and `shared/` never import from `modules/`.** Dependencies point
   inward only.
3. **Modules own their routes.** Each module exports `<name>Routes` from its
   barrel; `app/router/routeConfig.tsx` only decides which layout and guard
   wraps each group.
4. **URLs live in `core/config/routePaths.ts`.** Never hard-code a path.
   (It sits in `core`, not `app`, so modules can link to each other without
   depending on the app layer.)
5. **Pages call services, services call the api layer.** `api/` is a thin
   transport layer — one function per endpoint, no business rules. `services/`
   is where the rules, mocks and orchestration live.
6. **CSS lives beside the component it styles**, imported by that component.
   Global tokens are in `shared/theme/`; global resets and utilities in `styles/`.

## Anatomy of a module

`src/modules/gst/` is the reference implementation — copy it when adding a domain.

```
modules/gst/
├── pages/
│   └── GSTDashboard/
│       ├── GSTDashboard.tsx      # default export (lazy-loaded) + named export
│       └── GSTDashboard.css
├── components/
│   └── GSTCard/
│       ├── GSTCard.tsx
│       └── GSTCard.css
├── api/gstApi.ts                 # endpoints only
├── services/gstService.ts        # business rules + dev mocks
├── hooks/useGstApplications.ts   # what pages actually call
├── types/gst.types.ts
├── validation/gstSchema.ts       # zod
├── routes.tsx                    # exports gstRoutes
└── index.ts                      # the module's public surface
```

## Adding a new module

1. `src/modules/<name>/` with the folders above.
2. Add its paths to `core/config/routePaths.ts` and its endpoints to
   `core/api/apiEndpoints.ts`.
3. Export `<name>Routes` from `routes.tsx` and re-export it from `index.ts`.
4. Register it in `app/router/routeConfig.tsx` and, if it needs a nav entry,
   in `app/layouts/navigation.ts`.

## Path aliases

`@app`, `@core`, `@modules`, `@shared`, `@store`, `@styles` — declared in both
`tsconfig.app.json` and `vite.config.ts`. Keep the two in sync.

## Mock mode

`VITE_ENABLE_MOCKS=true` (the default in `.env.development`) makes every service
return canned data, so the UI runs with no backend. In demo mode the OTP is
`123456`. Each mock block is fenced with a
`/* Development mock - delete once the API is live. */` comment.

## State

- **Server state** — `useAsync` in `shared/hooks`, wrapped by a per-module hook.
  Swap it for TanStack Query later without touching call sites.
- **Session** — `core/auth` owns tokens and persistence; `store/auth` is the
  reactive mirror React renders from.
- **UI state** — `store/app` (theme, sidebar, toasts).

## Testing

`tests/unit`, `tests/integration`, `tests/e2e` are scaffolded but no runner is
installed yet. Vitest + Testing Library is the natural fit.


## Customer and staff

Both applications live in this one project, over the same data. What separates
them is the guard and the layout the router wraps a route group in:

```
PublicRoute   → AuthLayout       → modules/authentication
StaffRoute    → StaffLayout      → modules/staff
CustomerRoute → DashboardLayout  → the customer modules
```

- `app/router/StaffRoute` decides staff versus customer.
- `modules/staff/components/PermissionRoute` decides which staff areas a role
  may open. It lives in the module so the module does not depend on `app`.
- `core/auth/permissions.ts` holds the role-to-permission map. It drives the
  sidebar, the guards and which buttons render — for navigation and UX only.
  **The backend enforces authorization independently.**

### Standardized enums

Roles and statuses use the backend's exact enum values; the frontend only maps
them to display labels (`shared/constants/common.constants.ts`).

```
Roles      CUSTOMER · SUPER_ADMIN · ADMIN · MANAGER ·
           GST_AGENT · ITR_AGENT · LOAN_AGENT · INSURANCE_AGENT ·
           REGISTRATION_AGENT · ACCOUNTS_AGENT

Statuses   DRAFT · SUBMITTED · MANAGER_REVIEW · QUERY_RAISED · QUERY_RESOLVED ·
           READY_FOR_ASSIGNMENT · ASSIGNED · IN_PROGRESS · COMPLETED ·
           REJECTED · CANCELLED
```

Never introduce a variant such as `manager`, `ROLE_MANAGER` or `Manager`.

### The application workflow

```
SUBMITTED → MANAGER_REVIEW ─┬─ QUERY_RAISED → QUERY_RESOLVED ─┐
                            └─ READY_FOR_ASSIGNMENT ───────────┴→ agent bucket
                                                                      ↓
                                              assigned by a manager, or claimed
                                                                      ↓
                                            ASSIGNED → IN_PROGRESS → COMPLETED
```

`modules/staff/constants/staff.constants.ts` encodes this: `STAGE_OF_STATUS`
maps a status to its pipeline stage, and `NEXT_STATUSES` decides which
transitions a screen may offer. Assignment history is appended to, never
overwritten, so a reassignment keeps the earlier record.

### The staff module

```
modules/staff/
├── components/          shared across staff areas (DataTable, RoleBadge, …)
├── constants/           stage map, allowed transitions, filter labels
├── types/               staff models
├── services/mockData.ts one dev dataset the area services read from
├── dashboard/           built
├── applications/        built
├── staff-management/    built
└── customers/ assignments/ documents/ reports/
    services-management/ pricing/ notifications/ settings/   scaffolded
```

Each area keeps the same seven folders as any other module and exports its
routes; `modules/staff/routes.tsx` groups them by the permission each needs.
