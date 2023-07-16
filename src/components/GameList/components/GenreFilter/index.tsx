import { GenreFilterContainer } from './styles'

import { GenreButton } from './components/GenreButton'

import { useGlobal } from '../../../../hooks/useGlobal'

interface GenreFilterProps {
  isVisible: boolean
}

export function GenreFilter({ isVisible }: GenreFilterProps) {
  const { originalGamesList, filterGamesListByTitleOrGenre } = useGlobal()

  const allGameGenres: string[] = []

  for (let i = 0; i < originalGamesList.length; i++) {
    if ('genre' in originalGamesList[i]) {
      const gameGenre = originalGamesList[i].genre

      if (!allGameGenres.includes(gameGenre)) {
        allGameGenres.push(gameGenre)
      }
    }
  }

  function handleSearchGenre(genre: string) {
    filterGamesListByTitleOrGenre({ type: 'genre', filter: genre })
  }

  return (
    <GenreFilterContainer $isVisible={isVisible}>
      {allGameGenres.map((genre) => (
        <GenreButton
          key={genre}
          genre={genre}
          searchFunction={handleSearchGenre}
        />
      ))}
    </GenreFilterContainer>
  )
}
