import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from '@phosphor-icons/react'

import { SearchFormContainer } from './styles'

import { useGameList } from '../../hooks/useGameList'

const searchGameByTitleSchema = zod.object({
  title: zod.string(),
})

export type SearchData = zod.infer<typeof searchGameByTitleSchema>

type SearchGameFormData = SearchData

export function SearchForm() {
  const { searchGameByTitle, resetGameList } = useGameList()

  const searchGameForm = useForm<SearchGameFormData>({
    resolver: zodResolver(searchGameByTitleSchema),
  })

  const { handleSubmit, register } = searchGameForm

  function handleSearchGame(data: SearchData) {
    if (data.title === '') {
      resetGameList()
    }
    searchGameByTitle(data.title)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchGame)}>
      <input
        type="text"
        placeholder="Pesquise os jogos pelo nome..."
        spellCheck={false}
        {...register('title')}
      />
      <button type="submit">
        <MagnifyingGlass size={20} />
      </button>
    </SearchFormContainer>
  )
}
