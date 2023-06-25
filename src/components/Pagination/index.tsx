import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import { PaginationContainer } from './styles'

import { useGameList } from '../../hooks/useGameList'

export function Pagination() {
  const { currentPage, changeToNextPage, changeToPreviusPage } = useGameList()

  return (
    <PaginationContainer>
      <button onClick={changeToPreviusPage}>
        <CaretLeft weight="fill" />
      </button>
      <p>{currentPage + 1}</p>
      <button onClick={changeToNextPage}>
        <CaretRight weight="fill" />
      </button>
    </PaginationContainer>
  )
}
