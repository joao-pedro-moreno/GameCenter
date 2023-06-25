import { ReactNode, createContext, useEffect, useState } from 'react'

import { api } from '../lib/api'

interface GameListItem {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

interface GameListContextType {
  gameList: GameListItem[]
  fullGameList: GameListItem[]
  currentPageData: GameListItem[]
  currentPage: number
  statusCode: number
  hasErrors: boolean
  isLoading: boolean
  errorMessage: string
  genreSelected: string
  changeToNextPage: () => void
  changeToPreviusPage: () => void
  searchGameByTitle: (searchTitle: string) => void
  searchGameByGenre: (genre: string) => void
  resetGameList: () => void
}

interface GameListContextProviderProps {
  children: ReactNode
}

export const GameListContext = createContext({} as GameListContextType)

export function GameListContextProvider({
  children,
}: GameListContextProviderProps) {
  const [gameList, setGameList] = useState<GameListItem[]>([])
  const [fullGameList, setFullGameList] = useState<GameListItem[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [statusCode, setStatusCode] = useState(0)
  const [hasErrors, setHasErrors] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [titleSearched, setTitleSearched] = useState('')
  const [genreSelected, setGenreSelected] = useState('')

  const itemsPerPage = 15
  const offset = currentPage * itemsPerPage
  const currentPageData = gameList.slice(offset, offset + itemsPerPage)

  function changeToNextPage() {
    if (offset < gameList.length && offset < gameList.length - itemsPerPage) {
      setCurrentPage((prevState) => prevState + 1)
    }
  }

  function changeToPreviusPage() {
    if (currentPage > 0) {
      setCurrentPage((prevState) => prevState - 1)
    }
  }

  function searchGameByTitle(searchTitle: string) {
    setTitleSearched(searchTitle)

    if (searchTitle) {
      const gameListFilteredByTitle = fullGameList.filter((game) => {
        if (genreSelected) {
          return (
            game.title.toLowerCase().startsWith(searchTitle.toLowerCase()) &&
            game.genre === genreSelected
          )
        }

        return game.title.toLowerCase().startsWith(searchTitle.toLowerCase())
      })

      setGameList(gameListFilteredByTitle)
    } else {
      resetGameList()
    }
  }

  function searchGameByGenre(genre: string) {
    if (genreSelected === genre) {
      setGenreSelected('')

      if (titleSearched) {
        const gameListFilteredByTitle = fullGameList.filter((game) =>
          game.title.toLowerCase().startsWith(titleSearched.toLowerCase()),
        )

        setGameList(gameListFilteredByTitle)
      } else {
        setGameList(fullGameList)
      }
    } else {
      setGenreSelected(genre)

      const gameListFilteredByGenre = fullGameList.filter((game) => {
        if (titleSearched) {
          return (
            game.genre === genre &&
            game.title.toLowerCase().startsWith(titleSearched.toLowerCase())
          )
        }

        return game.genre === genre
      })

      setGameList(gameListFilteredByGenre)
    }
  }

  function resetGameList() {
    setCurrentPage(0)
    setTitleSearched('')

    if (genreSelected) {
      const gameListFilteredByGenre = fullGameList.filter(
        (game) => game.genre === genreSelected,
      )

      setGameList(gameListFilteredByGenre)
    } else {
      setGameList(fullGameList)
    }
  }

  useEffect(() => {
    setCurrentPage(0)
  }, [gameList])

  useEffect(() => {
    api
      .get('/data', {
        headers: {
          'dev-email-address': 'devmoreno2003@gmail.com',
        },
        timeout: 5000,
      })
      .then((response) => {
        setFullGameList(response.data)
        setGameList(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        if (error.code === 'ERR_BAD_RESPONSE') {
          const errorStatusCode = error.response.status
          const expectedErrorStatusCodes = [500, 502, 503, 504, 507, 508, 509]

          if (expectedErrorStatusCodes.includes(errorStatusCode)) {
            setStatusCode(errorStatusCode)
            setErrorMessage(
              'O servidor falhou em responder, tente recarregar a página',
            )
          } else {
            setErrorMessage(
              'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde',
            )
          }
        } else {
          setErrorMessage('O servidor demorou para responder, tente mais tarde')
        }
        setHasErrors(true)
        setIsLoading(false)
      })
  }, [])

  return (
    <GameListContext.Provider
      value={{
        gameList,
        fullGameList,
        currentPageData,
        currentPage,
        statusCode,
        hasErrors,
        isLoading,
        errorMessage,
        genreSelected,
        changeToNextPage,
        changeToPreviusPage,
        searchGameByTitle,
        searchGameByGenre,
        resetGameList,
      }}
    >
      {children}
    </GameListContext.Provider>
  )
}
