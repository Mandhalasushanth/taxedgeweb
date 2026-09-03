import { env, routePaths } from '@core/config'
import { formatCurrency } from '@shared/utils'

import { dashboardApi } from '../api/dashboardApi'
import type { DashboardSummary, QuickService } from '../types/dashboard.types'

/* Development mock - delete once the API is live. */
const mockSummary: DashboardSummary = {
  brief: {
    dateLabel: new Intl.DateTimeFormat('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date()),
    message:
      'Your GSTR-3B for August is due in 18 days and two documents are still pending on your ITR. Everything else is moving.',
    activeApplications: 3,
    paymentDue: formatCurrency(3000),
  },
  deadline: {
    id: 'gstr3b-aug',
    title: 'GSTR-3B · August 2026',
    meta: 'Due 20 September 2026 · GSTIN 27AXTPD4419K1ZP',
    daysLeft: 18,
    ctaLabel: 'Start filing',
    ctaTo: routePaths.gst.returns,
  },
  stats: [
    { id: 'active', label: 'Active applications', value: '3', hint: '2 GST · 1 loan', tone: 'success', icon: '🗎' },
    {
      id: 'pending-docs',
      label: 'Pending documents',
      value: '2',
      hint: 'on ITR-2026-00074',
      hintFlag: 'Action needed',
      tone: 'warning',
      icon: '⚠',
    },
    {
      id: 'payment-due',
      label: 'Payment due',
      value: formatCurrency(3000),
      hint: 'ITR filing fee · not yet paid',
      tone: 'danger',
      icon: '₹',
    },
    { id: 'completed', label: 'Completed services', value: '2', hint: 'Since Jan 2024', tone: 'info', icon: '✓' },
  ],
  recentActivity: [
    { id: 'a1', title: 'GSTR-3B — August', module: 'GST', status: 'MANAGER_REVIEW', updatedAt: new Date().toISOString() },
    { id: 'a2', title: 'ITR-4 filing FY 2025-26', module: 'Income tax', status: 'QUERY_RAISED', updatedAt: new Date(Date.now() - 864e5).toISOString() },
    { id: 'a3', title: 'Business loan — HDFC', module: 'Loans', status: 'SUBMITTED', updatedAt: new Date(Date.now() - 3 * 864e5).toISOString() },
    { id: 'a4', title: 'GST registration — Telangana', module: 'GST', status: 'COMPLETED', updatedAt: new Date(Date.now() - 9 * 864e5).toISOString() },
  ],
  upcomingDeadlines: [
    { id: 'd1', label: 'GSTR-1 for September', dueOn: '2026-10-11' },
    { id: 'd2', label: 'GSTR-3B for September', dueOn: '2026-10-20' },
    { id: 'd3', label: 'Advance tax — Q2 instalment', dueOn: '2026-09-15' },
  ],
}

export const quickServices: QuickService[] = [
  { id: 'gst-reg', label: 'GST registration', description: 'New GSTIN in 3-7 days', to: routePaths.gst.registration, icon: '%' },
  { id: 'gst-return', label: 'File GST return', description: 'GSTR-1 and GSTR-3B', to: routePaths.gst.returns, icon: '⇪' },
  { id: 'itr', label: 'File income tax', description: 'ITR-1 to ITR-4', to: routePaths.itr, icon: '₹' },
  { id: 'loan', label: 'Apply for a loan', description: 'Business and personal', to: routePaths.loans, icon: '◈' },
  { id: 'insurance', label: 'Get insured', description: 'Health, term and motor', to: routePaths.insurance, icon: '☂' },
  { id: 'documents', label: 'Upload documents', description: 'Store once, reuse everywhere', to: routePaths.documents, icon: '🗎' },
]

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    if (env.enableMocks) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return mockSummary
    }
    return dashboardApi.getSummary()
  },
}
