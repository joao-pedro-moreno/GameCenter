import { GenreFilterContainer } from './styles'

import { GenreButton } from './components/GenreButton'

import { useGameList } from '../../hooks/useGameList'

export function GenreFilter() {
  const { fullGameList, searchGameByGenre } = useGameList()

  const allGameGenres: string[] = []

  for (let i = 0; i < fullGameList.length; i++) {
    if ('genre' in fullGameList[i]) {
      const gameGenre = fullGameList[i].genre

      if (!allGameGenres.includes(gameGenre)) {
        allGameGenres.push(gameGenre)
      }
    }
  }

  function handleSearchGenre(genre: string) {
    searchGameByGenre(genre)
  }

  return (
    <GenreFilterContainer>
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
