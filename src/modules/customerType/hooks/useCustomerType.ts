import { useState } from 'react'
import type { CustomerTypeId } from '../types/customerType.types'

export const useCustomerType = (defaultId: CustomerTypeId = 'proprietorship') => {
  const [selectedId, setSelectedId] = useState<CustomerTypeId>(defaultId)

  return {
    selectedId,
    setSelectedId,
  }
}
