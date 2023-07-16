import {
  FunnelSimple,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

import {
  ButtonsContainer,
  GameListContainer,
  GamesContainer,
  NotFoundContainer,
  SearchContainer,
} from './styles'
import { SearchForm } from './components/SearchForm'
import { GenreFilter } from './components/GenreFilter'
import { GameCard } from './components/GameCard'
import { Pagination } from './components/Pagination'

import { useGlobal } from '../../hooks/useGlobal'

import searchImg from '../../assets/search.svg'

interface GameListProps {
  variant: 'home' | 'favorites' | 'rated'
}

export function GameList({ variant = 'home' }: GameListProps) {
  const {
    currentPageData,
    wayToSortGameListByRatings,
    renderGameList,
    sortGameListByRateNote,
  } = useGlobal()

  const [isGenreFilterVisible, setIsGenreFilterVisible] = useState(false)

  function handleChangeGenreFilterVisibility() {
    isGenreFilterVisible
      ? setIsGenreFilterVisible(false)
      : setIsGenreFilterVisible(true)
  }

  useEffect(() => {
    renderGameList({ page: variant })
  }, [])

  return (
    <GameListContainer>
      <SearchContainer>
        <SearchForm />
        <ButtonsContainer>
          <button onClick={handleChangeGenreFilterVisibility}>
            <FunnelSimple size={24} /> Filtrar
          </button>
          <button onClick={sortGameListByRateNote}>
            {wayToSortGameListByRatings === 'ascending' ? (
              <SortAscending size={24} />
            ) : (
              <SortDescending size={24} />
            )}{' '}
            Ordenar
          </button>
        </ButtonsContainer>
      </SearchContainer>
      <GenreFilter isVisible={isGenreFilterVisible} />

      <GamesContainer>
        {currentPageData.length > 0 ? (
          currentPageData.map((game) => (
            <GameCard
              key={game.id}
              backgroundImg={game.thumbnail}
              gameId={game.id}
              gameTitle={game.title}
              gameDesc={game.short_description}
              gamePublisher={game.publisher}
            />
          ))
        ) : (
          <NotFoundContainer>
            <img src={searchImg} alt="" />
            <p>Nenhum item correspondente a pesquisa encontrado</p>
          </NotFoundContainer>
        )}
      </GamesContainer>
      <Pagination />
    </GameListContainer>
  )
}
