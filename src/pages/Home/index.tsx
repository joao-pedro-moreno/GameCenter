import { ErrorMessage } from '../../components/ErrorMessage'
import { GameList } from '../../components/GameList'
import { Loading } from '../../components/Loading'
import { useGlobal } from '../../hooks/useGlobal'
import { HomeContainer } from './styles'

export function HomePage() {
  const { errorResponse, isPageLoading } = useGlobal()

  return (
    <HomeContainer className="container">
      {isPageLoading ? (
        <Loading />
      ) : (
        <div>
          {errorResponse.errorMessage ? (
            <ErrorMessage />
          ) : (
            <GameList variant="home" />
          )}
        </div>
      )}
    </HomeContainer>
  )
}
