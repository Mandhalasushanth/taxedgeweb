import type { ApplicationStatus } from '@shared/types'

export type StatTone = 'success' | 'warning' | 'danger' | 'info'

export interface DashboardStat {
  id: string
  label: string
  value: string
  tone: StatTone
  icon: string
  hint?: string
  /** Short urgent flag rendered ahead of the hint, e.g. "Action needed". */
  hintFlag?: string
}

export interface QuickService {
  id: string
  label: string
  description: string
  to: string
  icon: string
}

export interface DashboardActivity {
  id: string
  title: string
  module: string
  status: ApplicationStatus
  updatedAt: string
}

export interface DashboardBrief {
  dateLabel: string
  message: string
  activeApplications: number
  paymentDue: string
}

export interface DashboardDeadline {
  id: string
  title: string
  meta: string
  daysLeft: number
  ctaLabel: string
  ctaTo: string
}

export interface DashboardSummary {
  brief: DashboardBrief
  deadline: DashboardDeadline | null
  stats: DashboardStat[]
  recentActivity: DashboardActivity[]
  upcomingDeadlines: Array<{ id: string; label: string; dueOn: string }>
}
