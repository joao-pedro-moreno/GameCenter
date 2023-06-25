import { MainContainer } from './styles'

import { Loading } from '../Loading'
import { ErrorMessage } from '../ErrorMessage'
import { GameList } from '../GameList'

import { useGameList } from '../../hooks/useGameList'

export function Main() {
  const { hasErrors, isLoading } = useGameList()

  return (
    <MainContainer className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {hasErrors && <ErrorMessage />}
          {!hasErrors && <GameList />}
        </div>
      )}
    </MainContainer>
  )
}
