import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import { PaginationContainer } from './styles'

import { useGlobal } from '../../../../hooks/useGlobal'

export function Pagination() {
  const { currentPage, changePage } = useGlobal()

  return (
    <PaginationContainer>
      <button onClick={() => changePage('previous')}>
        <CaretLeft weight="fill" />
      </button>
      <p>{currentPage + 1}</p>
      <button onClick={() => changePage('next')}>
        <CaretRight weight="fill" />
      </button>
    </PaginationContainer>
  )
}
