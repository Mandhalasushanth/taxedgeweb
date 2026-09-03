import { env } from '@core/config'

import { supportApi } from '../api/supportApi'
import type { SupportFilters, SupportItem } from '../types/support.types'

/* Development mock - delete once the API is live. */
const mockItems: SupportItem[] = [
  {
    id: 'support_001',
    reference: 'TE-Support-0001',
    title: 'Sample ticket',
    status: 'MANAGER_REVIEW',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const supportService = {
  async list(filters?: SupportFilters): Promise<SupportItem[]> {
    if (env.enableMocks) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockItems
    }
    const response = await supportApi.list(filters)
    return response.data
  },
}
