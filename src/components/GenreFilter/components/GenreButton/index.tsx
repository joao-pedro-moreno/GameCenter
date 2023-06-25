import { GenreButtonContainer } from './styles'

import { useGameList } from '../../../../hooks/useGameList'

interface GenreButtonProps {
  genre: string
  searchFunction: (genre: string) => void
}

export function GenreButton({ genre, searchFunction }: GenreButtonProps) {
  const { genreSelected } = useGameList()

  function handleGenreSelect() {
    searchFunction(genre)
  }

  return (
    <GenreButtonContainer>
      <input
        type="checkbox"
        name="gameGenre"
        id={genre}
        checked={genreSelected === genre}
        onChange={handleGenreSelect}
      />
      <label htmlFor={genre}>{genre}</label>
    </GenreButtonContainer>
  )
}
