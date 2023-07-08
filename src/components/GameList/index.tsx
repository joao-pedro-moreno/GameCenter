import { GameListContainer, GamesContainer } from './styles'

import { SearchForm } from '../SearchForm'
import { GenreFilter } from '../GenreFilter'
import { GameCard } from './components/GameCard'
import { Pagination } from '../Pagination'

import { useGameList } from '../../hooks/useGameList'

export function GameList() {
  const { currentPageData } = useGameList()

  return (
    <GameListContainer>
      <SearchForm />
      <GenreFilter />

      <GamesContainer>
        {currentPageData.map((game) => (
          <GameCard
            key={game.id}
            backgroundImg={game.thumbnail}
            gameTitle={game.title}
            gameDesc={game.short_description}
            gamePublisher={game.publisher}
          />
        ))}
      </GamesContainer>
      <Pagination />
    </GameListContainer>
  )
}
