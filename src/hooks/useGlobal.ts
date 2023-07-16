import { useContext } from 'react'

import { GlobalContext } from '../contexts/GlobalContext'

export function useGlobal() {
  const context = useContext(GlobalContext)
  return context
}
