import { Link } from 'react-router-dom'

import { routePaths } from '@core/config'
import { Badge, Card, EmptyState, Loader } from '@shared/components'
import { STATUS_LABELS, STATUS_TONES } from '@shared/constants'
import { formatDate, relativeTime } from '@shared/utils'
import { useAuthStore } from '@store/index'

import { DashboardHero } from '../../components/DashboardHero/DashboardHero'
import { DashboardStats } from '../../components/DashboardStats/DashboardStats'
import { DeadlineBanner } from '../../components/DeadlineBanner/DeadlineBanner'
import { QuickServices } from '../../components/QuickServices/QuickServices'
import { useDashboardSummary } from '../../hooks/useDashboardSummary'
import { quickServices } from '../../services/dashboardService'
import './CustomerDashboard.css'

export const CustomerDashboard = () => {
  const user = useAuthStore((state) => state.user)
  const { data, isLoading, error } = useDashboardSummary()

  if (isLoading) return <Loader fullPage label="Loading your dashboard" />
  if (error || !data) {
    return <EmptyState title="We could not load your dashboard" description={error ?? undefined} />
  }

  return (
    <div className="dashboard">
      <DashboardHero userName={user?.fullName ?? 'there'} brief={data.brief} />

      {data.deadline && <DeadlineBanner deadline={data.deadline} />}

      <DashboardStats stats={data.stats} />

      <QuickServices services={quickServices} />

      <div className="dashboard__columns">
        <Card
          title="Recent activity"
          actions={
            <Link className="dashboard__link" to={routePaths.applications}>
              View all
            </Link>
          }
        >
          <ul className="dashboard__activity">
            {data.recentActivity.map((item) => (
              <li className="activity" key={item.id}>
                <div>
                  <p className="activity__title">{item.title}</p>
                  <p className="activity__meta">
                    {item.module} · {relativeTime(item.updatedAt)}
                  </p>
                </div>
                <Badge tone={STATUS_TONES[item.status]}>{STATUS_LABELS[item.status]}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Upcoming deadlines" subtitle="Filing dates in the next few weeks">
          <ul className="dashboard__deadlines">
            {data.upcomingDeadlines.map((deadline) => (
              <li className="deadline" key={deadline.id}>
                <span>{deadline.label}</span>
                <span className="deadline__date">{formatDate(deadline.dueOn)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default CustomerDashboard
