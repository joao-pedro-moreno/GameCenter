import { useContext } from 'react'

import { GameListContext } from '../contexts/GameListContext'

export function useGameList() {
  const context = useContext(GameListContext)
  return context
}
