import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from '@phosphor-icons/react'

import { SearchFormContainer } from './styles'

import { useGlobal } from '../../../../hooks/useGlobal'
import { useEffect } from 'react'

const searchGamesByTextSchema = zod.object({
  text: zod.string(),
})

export type SearchData = zod.infer<typeof searchGamesByTextSchema>

type SearchGameFormData = SearchData

export function SearchForm() {
  const { filterGamesListByTitleOrGenre } = useGlobal()

  const searchGameForm = useForm<SearchGameFormData>({
    resolver: zodResolver(searchGamesByTextSchema),
  })

  const { handleSubmit, register, watch } = searchGameForm

  function handleSearchGame(data: SearchData) {
    filterGamesListByTitleOrGenre({ type: 'title', filter: data.text })
  }

  const typedText = watch('text')

  useEffect(() => {
    filterGamesListByTitleOrGenre({ type: 'title', filter: typedText })
  }, [typedText])

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchGame)}>
      <input
        type="text"
        placeholder="Pesquise os jogos pelo nome..."
        spellCheck={false}
        {...register('text')}
      />
      <button type="submit">
        <MagnifyingGlass size={20} />
      </button>
    </SearchFormContainer>
  )
}
