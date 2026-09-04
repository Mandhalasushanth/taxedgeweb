import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { routePaths } from '@core/config'

const GSTDashboard = lazy(() => import('./pages/GSTDashboard/GSTDashboard'))
const GSTRegistration = lazy(() => import('./pages/GSTRegistration/GSTRegistration'))
const GSTReturn = lazy(() => import('./pages/GSTReturn/GSTReturn'))
const GSTDetails = lazy(() => import('./pages/GSTDetails/GSTDetails'))
const GSTTrack = lazy(() => import('./pages/GSTTrack/GSTTrack'))

export const gstRoutes: RouteObject[] = [
  { path: routePaths.gst.root, element: <GSTDashboard /> },
  { path: routePaths.gst.registration, element: <GSTRegistration /> },
  { path: routePaths.gst.returns, element: <GSTReturn /> },
  { path: routePaths.gst.detail(), element: <GSTDetails /> },
  { path: routePaths.gst.track(), element: <GSTTrack /> },
]
