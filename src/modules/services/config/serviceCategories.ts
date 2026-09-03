import type { CategoryTab, ServiceCategoryConfig, ServiceCategoryKey } from '../types/service.types'

export const SERVICE_CATEGORIES: CategoryTab[] = [
  { id: 'all', label: 'All' },
  { id: 'gst', label: 'GST' },
  { id: 'itr-tds', label: 'ITR & TDS' },
  { id: 'loans', label: 'Loans' },
  { id: 'business-commercial', label: 'Business & Commercial' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'compliance', label: 'Compliance' },
]

export const CATEGORY_METADATA: Record<Exclude<ServiceCategoryKey, 'all'>, ServiceCategoryConfig> = {
  gst: {
    id: 'gst',
    title: 'GST Services',
    description: 'Registration, monthly/quarterly filings, reconciliation & department compliance.',
    badgeText: 'GST',
  },
  'itr-tds': {
    id: 'itr-tds',
    title: 'ITR & TDS',
    description: 'Income tax returns, tax planning, TDS deductions & Form 16 support.',
    badgeText: 'Tax',
  },
  loans: {
    id: 'loans',
    title: 'Loans & Financing',
    description: 'Personal, business, mortgage & asset-backed loans with fast approval.',
    badgeText: 'Finance',
  },
  'business-commercial': {
    id: 'business-commercial',
    title: 'Business & Commercial',
    description: 'Entity registration, MSME Udyam, partnerships & regulatory paperwork.',
    badgeText: 'Corporate',
  },
  insurance: {
    id: 'insurance',
    title: 'Insurance',
    description: 'Comprehensive health, life, commercial & auto protection plans.',
    badgeText: 'Protection',
  },
  compliance: {
    id: 'compliance',
    title: 'Corporate Compliance',
    description: 'Annual ROC filings, secretarial audits, trademark & statutory governance.',
    badgeText: 'Governance',
  },
}
