import { Link } from 'react-router-dom'

import { routePaths } from '@core/config'
import { Button, EmptyState, Input, Loader } from '@shared/components'
import { STATUS_LABELS } from '@shared/constants'
import { APPLICATION_STATUSES } from '@shared/types'
import type { ApplicationStatus } from '@shared/types'


import { GSTStats } from '../../components/GSTStats/GSTStats'
import { GSTServices } from '../../components/GSTServices/GSTServices'
import { GSTApplicationList } from '../../components/GSTApplicationList/GSTApplicationList'
import { useGstDashboardData } from '../../hooks/useGstDashboardData'
import { useGstApplications } from '../../hooks/useGstApplications'
import './GSTDashboard.css'

export const GSTDashboard = () => {
  const { data, isLoading, error, search, setSearch, status, setStatus } = useGstApplications()
  const dashboardData = useGstDashboardData()

  return (
    <div className="gst-dashboard">
      <header className="gst-dashboard__header">
        <div>
          <h1 className="gst-dashboard__title">GST</h1>
          <p className="gst-dashboard__subtitle">Registrations and returns in one place.</p>
        </div>
        <div className="gst-dashboard__actions">
          <Link to={routePaths.gst.returns}>
            <Button variant="secondary">File a return</Button>
          </Link>
          <Link to={routePaths.gst.registration}>
            <Button>New registration</Button>
          </Link>
        </div>
      </header>

      <div className="gst-dashboard__filters">
        <Input
          name="search"
          placeholder="Search by name, reference or GSTIN"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="field">
          <div className="field__control">
            <select
              className="field__input"
              aria-label="Filter by status"
              value={status}
              onChange={(event) => setStatus(event.target.value as ApplicationStatus | 'all')}
            >
              <option value="all">All statuses</option>
              {APPLICATION_STATUSES.map((value) => (
                <option key={value} value={value}>
                  {STATUS_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!dashboardData.isLoading && (
        <div className="gst-dashboard__overview" style={{ marginTop: '24px' }}>
          <GSTStats stats={dashboardData.stats} />
          <GSTServices services={dashboardData.services} />
          <GSTApplicationList applications={dashboardData.applications} />
        </div>
      )}

    </div>
  )
}

export default GSTDashboard
