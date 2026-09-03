import { routePaths } from '@core/config'

export interface NavItem {
  label: string
  to: string
  icon: string
  /** Optional key into the badge map DashboardLayout builds from live data. */
  badgeKey?: 'applications'
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', to: routePaths.dashboard, icon: '⌂' },
      { label: 'All Services', to: `${routePaths.dashboard}#quick-services`, icon: '▦' },
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'GST', to: routePaths.gst.root, icon: '%' },
      { label: 'ITR & TDS', to: routePaths.itr, icon: '₹' },
      { label: 'Loans', to: routePaths.loans, icon: '◈' },
      { label: 'Insurance', to: routePaths.insurance, icon: '☂' },
    ],
  },
  {
    title: 'My account',
    items: [
      { label: 'Applications', to: routePaths.applications, icon: '☰', badgeKey: 'applications' },
      { label: 'Document Vault', to: routePaths.documents, icon: '🗎' },
      { label: 'Payments', to: routePaths.payments, icon: '⇄' },
      { label: 'Profile', to: routePaths.profile, icon: '☺' },
      { label: 'Chat', to: routePaths.chat, icon: '✉' },
      { label: 'Support', to: routePaths.support, icon: '?' },
    ],
  },
]
