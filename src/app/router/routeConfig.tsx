import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { AuthLayout } from '../layouts/AuthLayout'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { NotFound } from '../pages/NotFound'

import { applicationsRoutes } from '@modules/applications'
import { authenticationRoutes } from '@modules/authentication'
import { chatRoutes } from '@modules/chat'
import { dashboardRoutes } from '@modules/dashboard'
import { documentsRoutes } from '@modules/documents'
import { gstRoutes } from '@modules/gst'
import { insuranceRoutes } from '@modules/insurance'
import { itrRoutes } from '@modules/itr'
import { loansRoutes } from '@modules/loans'
import { paymentsRoutes } from '@modules/payments'
import { profileRoutes, CreateProfilePage } from '@modules/profile'
import { supportRoutes } from '@modules/support'

import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { routePaths } from '@core/config'

const authLayoutRoutes = authenticationRoutes.filter(
  (r) => r.path !== routePaths.auth.createProfile && r.path !== routePaths.auth.register,
)

/**
 * Modules own their own routes and export them from their barrel;
 * this file only decides which layout and guard wraps each group.
 */
export const routeConfig: RouteObject[] = [
  {
    path: routePaths.root,
    element: <CreateProfilePage />,
  },
  {
    path: routePaths.registration,
    element: <CreateProfilePage />,
  },
  {
    path: routePaths.auth.register,
    element: <CreateProfilePage />,
  },
  {
    path: routePaths.auth.createProfile,
    element: <CreateProfilePage />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: authLayoutRoutes,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to={routePaths.dashboard} replace /> },
          ...dashboardRoutes,
          ...gstRoutes,
          ...itrRoutes,
          ...loansRoutes,
          ...insuranceRoutes,
          ...paymentsRoutes,
          ...documentsRoutes,
          ...applicationsRoutes,
          ...profileRoutes,
          ...chatRoutes,
          ...supportRoutes,
        ],
      },
    ],
  },
  { path: routePaths.notFound, element: <NotFound /> },
]
