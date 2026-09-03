# TaxEdge Web

Web application for TaxEdge — GST, income tax, loans, insurance, payments and
documents for Indian businesses.

## Stack

React 19 · TypeScript · Vite · React Router · Zustand · Axios · Zod · plain CSS

## Getting started

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173 with `VITE_ENABLE_MOCKS=true`, so every
screen works without a backend. Any password signs you in; the demo OTP is
`123456`.

**Demo sign-ins** — the mobile number decides the role:

| Mobile | Signs in as | Lands on |
|---|---|---|
| `9000000001` | Super admin | `/staff/dashboard` |
| `9000000002` | Admin | `/staff/dashboard` |
| `9000000003` | Manager | `/staff/dashboard` |
| `9000000004` | GST agent | `/staff/dashboard` |
| `9000000005` | ITR agent | `/staff/dashboard` |
| any other valid mobile | Customer | `/dashboard` |

Roles change what the staff sidebar shows and which actions appear — an agent
can claim work but not assign it or manage staff.

Point it at a real API by editing `.env.development`:

```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_MOCKS=false
```

## Scripts

| Command             | What it does                     |
|---------------------|----------------------------------|
| `npm run dev`       | Dev server with HMR              |
| `npm run build`     | Type-check and build to `dist/`  |
| `npm run preview`   | Serve the production build       |
| `npm run typecheck` | `tsc -b`                         |
| `npm run lint`      | `oxlint`                         |

## Structure

```
src/
├── app/       routing, guards, providers, layouts (customer + staff)
├── core/      api client, auth, permissions, config, errors, storage
├── modules/   one folder per business domain, plus staff/
├── shared/    UI kit, hooks, utils, types, theme
├── store/     global Zustand slices
└── styles/    reset, global, utilities
```

The customer app and the staff app live in the same project, behind different
guards and layouts, over the same data.

`src/modules/gst` is the reference module — copy its shape.
See [ARCHITECTURE.md](./ARCHITECTURE.md) for the layer rules.

## Status

| Module | State |
|---|---|
| authentication | login, register, OTP, passcode, create profile |
| dashboard | stats, quick services, activity, deadlines |
| gst | list, filters, registration form, returns table, detail + timeline |
| itr, loans, insurance, payments, documents, applications, profile, chat, support | scaffolded (types, api, service, hook, page, route) |
| **staff** / dashboard | role-aware metrics, revenue by service, pipeline, needs-attention list |
| **staff** / applications | list with the spec columns and filters, detail with workflow, assignment history, queries, notes |
| **staff** / staff-management | staff CRUD, roles, activate/deactivate, permission matrix |
| **staff** / customers, assignments, documents, reports, services, pricing, notifications, settings | scaffolded with routes and permission gates |
