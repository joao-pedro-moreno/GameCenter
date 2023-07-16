import { GenreButtonContainer } from './styles'

import { useGlobal } from '../../../../../../hooks/useGlobal'

interface GenreButtonProps {
  genre: string
  searchFunction: (genre: string) => void
}

export function GenreButton({ genre, searchFunction }: GenreButtonProps) {
  const { genreFilter } = useGlobal()

  function handleGenreSelect() {
    searchFunction(genre)
  }

  return (
    <GenreButtonContainer>
      <input
        type="checkbox"
        name="gameGenre"
        id={genre}
        checked={genreFilter === genre}
        onChange={handleGenreSelect}
      />
      <label htmlFor={genre}>{genre}</label>
    </GenreButtonContainer>
  )
}
