import { ErrorMessage } from '../../components/ErrorMessage'
import { GameList } from '../../components/GameList'
import { Loading } from '../../components/Loading'
import { useGameList } from '../../hooks/useGameList'
import { HomeContainer } from './styles'

export function HomePage() {
  const { hasErrors, isLoading } = useGameList()

  return (
    <HomeContainer className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div>{hasErrors ? <ErrorMessage /> : <GameList />}</div>
      )}
    </HomeContainer>
  )
}
