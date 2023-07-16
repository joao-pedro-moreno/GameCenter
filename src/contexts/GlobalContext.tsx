import { ReactNode, createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

import { db } from '../services/firebase'
import { api } from '../lib/api'
import { useAuth } from '../hooks/useAuth'

export interface GameListItem {
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

interface GamesApiResponseError {
  statusCode?: number
  errorMessage: string
}

interface UserFirebaseFavoritesGamesResponse {
  collectionId: string
  email: string
  favoritesGames: number[]
}

interface RenderGameListProps {
  page: 'home' | 'favorites' | 'rated'
}

interface FilterGameListProps {
  type: 'title' | 'genre'
  filter: string
}

interface OnRateGameProps {
  gameId: number
  rateNote: number
}

interface GameRateNotes {
  email: string
  gameId: number
  rateNote: number
}

interface GameAverageRate {
  gameId: number
  averageRate: number
}

interface GlobalContextType {
  originalGamesList: GameListItem[]
  gameListToShow: GameListItem[]
  filteredGameList: GameListItem[]
  currentPageData: GameListItem[]
  isPageLoading: boolean
  errorResponse: GamesApiResponseError
  userFavoritesGamesIds: number[]
  currentPage: number
  genreFilter: string
  wayToSortGameListByRatings: string
  gamesRateNotes: GameRateNotes[]

  renderGameList: ({ page }: RenderGameListProps) => void
  onFavoriteGame: (gameId: number) => void
  verifyIfGameIsAlreadyFavorited: (gameId: number) => boolean
  onRateGame: ({ gameId, rateNote }: OnRateGameProps) => void
  verifyIfGameIsAlreadyRatedByUser: (gameId: number) => number
  getGameInfos: (gameId: number) => GameListItem
  changePage: (moveTo: 'previous' | 'next') => void
  filterGamesListByTitleOrGenre: ({ type, filter }: FilterGameListProps) => void
  sortGameListByRateNote: () => void
  getGameAverageRateNote: (gameId: number) => number
}

interface GlobalContextProviderProps {
  children: ReactNode
}

export const GlobalContext = createContext({} as GlobalContextType)

export function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  const [originalGamesList, setOriginalGamesList] = useState<GameListItem[]>([])
  const [gameListToShow, setGameListToShow] = useState<GameListItem[]>([])
  const [filteredGameList, setFilteredGameList] = useState<GameListItem[]>([])

  const [userFavoritesGamesCollectionId, setUserFavoritesGamesCollectionId] =
    useState('')
  const [userFavoritesGamesIds, setUserFavoritesGamesIds] = useState<number[]>(
    [],
  )

  const [gamesRateNotes, setGamesRateNotes] = useState<GameRateNotes[]>([])
  const [wayToSortGameListByRatings, setWayToSortGameListByRatings] = useState<
    'ascending' | 'descending'
  >('ascending')
  const [averageRateNotes, setAverageRateNotes] = useState<GameAverageRate[]>(
    [],
  )

  const [currentPage, setCurrentPage] = useState(0)

  const [isPageLoading, setIsPageLoading] = useState(true)
  const [errorResponse, setErrorResponse] = useState<GamesApiResponseError>({
    errorMessage: '',
  })

  const [titleFilter, setTitleFilter] = useState('')
  const [genreFilter, setGenreFilter] = useState('')

  const { isUserAuthenticated, authenticatedUserEmail } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  const itemsPerPage = 15
  const offset = currentPage * itemsPerPage
  const currentPageData = filteredGameList.slice(offset, offset + itemsPerPage)

  function getGamesData() {
    setErrorResponse({ errorMessage: '' })

    api
      .get('/data', {
        headers: {
          'dev-email-address': 'devmoreno2003@gmail.com',
        },
        timeout: 5000,
      })
      .then((response) => {
        const gamesData = response.data

        setOriginalGamesList(gamesData)
        setIsPageLoading(false)
      })
      .catch((error) => {
        const errorCode = error.code

        if (errorCode === 'ERR_BAD_RESPONSE') {
          const expectedErrorsStatusCode = [500, 502, 503, 504, 507, 508, 509]

          const statusCode = error.response.status

          const isErrorExpected = expectedErrorsStatusCode.includes(statusCode)

          if (isErrorExpected) {
            setErrorResponse({
              statusCode,
              errorMessage:
                'O servidor falhou em responder, tente recarregar a página',
            })
          } else {
            setErrorResponse({
              errorMessage:
                'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde',
            })
          }
        } else {
          setErrorResponse({
            errorMessage: 'O servidor demorou para responder, tente mais tarde',
          })
        }

        setIsPageLoading(false)
      })
  }

  function renderGameList({ page }: RenderGameListProps) {
    if (isUserAuthenticated) {
      switch (page) {
        case 'home': {
          setGameListToShow(originalGamesList)
          setFilteredGameList(originalGamesList)
          setCurrentPage(0)
          break
        }
        case 'favorites': {
          if (!isUserAuthenticated) {
            navigate('/')
          }

          const favoritesGameList = originalGamesList.filter((game) => {
            return userFavoritesGamesIds.includes(game.id)
          })

          setGameListToShow(favoritesGameList)
          setFilteredGameList(favoritesGameList)
          setCurrentPage(0)
          break
        }
        case 'rated': {
          const userRatedGamesIds: number[] = []

          gamesRateNotes.forEach((game) => {
            if (game.rateNote > 0) {
              userRatedGamesIds.push(game.gameId)
            }
          })

          const userRatedGames = originalGamesList.filter((game) => {
            return userRatedGamesIds.includes(game.id)
          })

          setGameListToShow(userRatedGames)
          setFilteredGameList(userRatedGames)
          setCurrentPage(0)
          break
        }
        default: {
          setGameListToShow(originalGamesList)
          setFilteredGameList(originalGamesList)
          setCurrentPage(0)
          break
        }
      }
    } else {
      setGenreFilter('')
      setTitleFilter('')
      setGameListToShow(originalGamesList)
      setFilteredGameList(originalGamesList)
      setCurrentPage(0)
    }
  }

  async function getUserFavoritesGamesIds() {
    if (isUserAuthenticated) {
      const dbCollection = collection(db, 'favoritesGames')

      const userFavoritesGamesQuery = query(
        dbCollection,
        where('email', '==', authenticatedUserEmail),
      )

      const queryResponse = await getDocs(userFavoritesGamesQuery)

      if (queryResponse.docs.length > 0) {
        const userFavoritesGamesResponse: UserFirebaseFavoritesGamesResponse = {
          collectionId: '',
          email: '',
          favoritesGames: [],
        }

        queryResponse.forEach((doc) => {
          userFavoritesGamesResponse.collectionId = doc.id
          userFavoritesGamesResponse.email = doc.data().email
          userFavoritesGamesResponse.favoritesGames = doc.data().favoritesGames
        })

        const userFavoritesGamesIdsList =
          userFavoritesGamesResponse.favoritesGames

        const collectionId = userFavoritesGamesResponse.collectionId

        setUserFavoritesGamesCollectionId(collectionId)
        setUserFavoritesGamesIds(userFavoritesGamesIdsList)
      }
    }
  }

  async function getGamesRateNotes() {
    const dbCollection = collection(db, 'gamesRateNotes')

    const gamesRateNotesQuery = query(dbCollection)

    const queryResponse = await getDocs(gamesRateNotesQuery)

    const updatedGamesRateNotes: GameRateNotes[] = []

    queryResponse.docs.forEach((doc) => {
      updatedGamesRateNotes.push({
        email: doc.data().email,
        gameId: doc.data().gameId,
        rateNote: doc.data().rateNote,
      })
    })

    setGamesRateNotes(updatedGamesRateNotes)
  }

  function onFavoriteGame(gameId: number) {
    if (isUserAuthenticated) {
      if (userFavoritesGamesIds.length > 0) {
        const documentRef = doc(
          db,
          'favoritesGames',
          userFavoritesGamesCollectionId,
        )

        if (userFavoritesGamesIds.includes(gameId)) {
          const updatedFavoritesGamesIds = userFavoritesGamesIds.filter(
            (game) => {
              return game !== gameId
            },
          )

          const updatedCollection = {
            email: authenticatedUserEmail,
            favoritesGames: updatedFavoritesGamesIds,
          }

          updateDoc(documentRef, updatedCollection)
            .then(() => {
              setUserFavoritesGamesIds(updatedFavoritesGamesIds)
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          const updatedFavoritesGamesIds = userFavoritesGamesIds
          updatedFavoritesGamesIds.push(gameId)

          const updatedCollection = {
            email: authenticatedUserEmail,
            favoritesGames: updatedFavoritesGamesIds,
          }

          updateDoc(documentRef, updatedCollection)
            .then(() => {
              setUserFavoritesGamesIds(updatedFavoritesGamesIds)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      } else {
        addDoc(collection(db, 'favoritesGames'), {
          email: authenticatedUserEmail,
          favoritesGames: [gameId],
        }).then(() => {
          setUserFavoritesGamesIds([gameId])
        })
      }

      getUserFavoritesGamesIds()
    } else {
      navigate('/auth/login')
    }
  }

  function verifyIfGameIsAlreadyFavorited(gameId: number) {
    if (userFavoritesGamesIds.includes(gameId)) {
      return true
    }

    return false
  }

  async function onRateGame({ gameId, rateNote }: OnRateGameProps) {
    if (isUserAuthenticated) {
      const dbCollection = collection(db, 'gamesRateNotes')

      const gameRateNotesQuery = query(
        dbCollection,
        where('email', '==', authenticatedUserEmail),
        where('gameId', '==', gameId),
      )

      const queryResponse = await getDocs(gameRateNotesQuery)

      if (queryResponse.docs.length > 0) {
        const userGameRateNoteCollectionId: string = queryResponse.docs[0].id

        const documentRef = doc(
          db,
          'gamesRateNotes',
          userGameRateNoteCollectionId,
        )

        const updatedCollection = {
          email: authenticatedUserEmail,
          gameId,
          rateNote,
        }

        const updatedGamesRateNotes = gamesRateNotes

        const rateNoteIndex = updatedGamesRateNotes.findIndex(
          (gameRateNote) =>
            gameRateNote.email === authenticatedUserEmail &&
            gameRateNote.gameId === gameId,
        )

        updatedGamesRateNotes[rateNoteIndex].rateNote = rateNote

        updateDoc(documentRef, updatedCollection)
          .then(() => {
            setGamesRateNotes(updatedGamesRateNotes)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        addDoc(collection(db, 'gamesRateNotes'), {
          email: authenticatedUserEmail,
          gameId,
          rateNote,
        }).then(() => {
          const updatedGamesRateNote = gamesRateNotes
          const newGameRateNote = {
            email: authenticatedUserEmail,
            gameId,
            rateNote,
          }

          updatedGamesRateNote.push(newGameRateNote)

          setGamesRateNotes(updatedGamesRateNote)
        })
      }
    } else {
      navigate('/auth/login')
    }
  }

  function verifyIfGameIsAlreadyRatedByUser(gameId: number) {
    const userGameRateNote = gamesRateNotes.filter((gameRateNote) => {
      return (
        gameRateNote.email === authenticatedUserEmail &&
        gameRateNote.gameId === gameId
      )
    })

    if (userGameRateNote.length > 0) {
      return userGameRateNote[0].rateNote
    }

    return 0
  }

  function getGameInfos(gameId: number) {
    const selectedGameIndex = originalGamesList.findIndex(
      (game) => game.id === gameId,
    )

    return originalGamesList[selectedGameIndex]
  }

  function changePage(moveTo: 'previous' | 'next') {
    switch (moveTo) {
      case 'previous': {
        if (currentPage > 0) {
          setCurrentPage((previousState) => previousState - 1)
        }
        break
      }
      case 'next': {
        if (
          offset < gameListToShow.length &&
          offset < gameListToShow.length - itemsPerPage
        ) {
          setCurrentPage((previousState) => previousState + 1)
        }
      }
    }
  }

  function filterGamesListByTitleOrGenre({
    type,
    filter,
  }: FilterGameListProps) {
    switch (type) {
      case 'title': {
        setTitleFilter(filter)

        if (filter) {
          const updatedFilterGameList = gameListToShow.filter((game) => {
            if (genreFilter) {
              return (
                game.title.toLowerCase().startsWith(filter.toLowerCase()) &&
                game.genre === genreFilter
              )
            }

            return game.title.toLowerCase().startsWith(filter.toLowerCase())
          })

          setFilteredGameList(updatedFilterGameList)
        } else {
          if (genreFilter) {
            const updatedFilterGameList = gameListToShow.filter((game) => {
              return game.genre === filter
            })

            setFilteredGameList(updatedFilterGameList)
          } else {
            setFilteredGameList(gameListToShow)
          }
        }

        break
      }
      case 'genre': {
        if (genreFilter === filter) {
          setFilteredGameList(gameListToShow)
          setGenreFilter('')

          if (titleFilter) {
            const updatedFilterGameList = gameListToShow.filter((game) => {
              return game.title
                .toLowerCase()
                .startsWith(titleFilter.toLowerCase())
            })

            setFilteredGameList(updatedFilterGameList)
          } else {
            setFilteredGameList(gameListToShow)
          }
        } else {
          setGenreFilter(filter)

          const updatedFilterGameList = gameListToShow.filter((game) => {
            if (titleFilter) {
              return (
                game.genre === filter &&
                game.title.toLowerCase().startsWith(titleFilter.toLowerCase())
              )
            }

            return game.genre === filter
          })

          setFilteredGameList(updatedFilterGameList)
        }
        break
      }
    }
  }

  function sortGameListByRateNote() {
    switch (wayToSortGameListByRatings) {
      case 'ascending': {
        setWayToSortGameListByRatings('descending')

        let sortedRateNotes

        if (location.pathname === '/user/rates') {
          const userRateNotes = gamesRateNotes.filter((game) => {
            return game.email === authenticatedUserEmail
          })

          sortedRateNotes = userRateNotes.sort(
            (a, b) => b.rateNote - a.rateNote,
          )
        } else {
          sortedRateNotes = averageRateNotes.sort(
            (a, b) => b.averageRate - a.averageRate,
          )
        }

        const sortedGameList = sortedRateNotes
          .map((rateNote) =>
            gameListToShow.find((game) => game.id === rateNote.gameId),
          )
          .filter((game) => game !== undefined) as GameListItem[]

        const gamesWithouRate: GameListItem[] = []

        filteredGameList.forEach((game) => {
          const hasDuplicate = sortedGameList.some(
            (ratedGame) => ratedGame.id === game.id,
          )
          if (!hasDuplicate) {
            gamesWithouRate.push(game)
          }
        })

        const fullGameListSorted = sortedGameList.concat(gamesWithouRate)

        setGameListToShow(fullGameListSorted)
        setFilteredGameList(fullGameListSorted)

        break
      }
      case 'descending': {
        setWayToSortGameListByRatings('ascending')

        let sortedRateNotes

        if (location.pathname === '/user/rates') {
          const userRateNotes = gamesRateNotes.filter((game) => {
            return game.email === authenticatedUserEmail
          })

          sortedRateNotes = userRateNotes.sort(
            (a, b) => a.rateNote - b.rateNote,
          )
        } else {
          sortedRateNotes = averageRateNotes.sort(
            (a, b) => a.averageRate - b.averageRate,
          )
        }

        const sortedGameList = sortedRateNotes
          .map((rateNote) =>
            gameListToShow.find((game) => game.id === rateNote.gameId),
          )
          .filter((game) => game !== undefined) as GameListItem[]

        const gamesWithouRate: GameListItem[] = []

        filteredGameList.forEach((game) => {
          const hasDuplicate = sortedGameList.some(
            (ratedGame) => ratedGame.id === game.id,
          )
          if (!hasDuplicate) {
            gamesWithouRate.push(game)
          }
        })

        const fullGameListSorted = sortedGameList.concat(gamesWithouRate)

        setGameListToShow(fullGameListSorted)
        setFilteredGameList(fullGameListSorted)

        break
      }
    }
  }

  function getAverageRateNotes() {
    const gameMap: Map<number, number[]> = new Map()

    gamesRateNotes.forEach((rateNote) => {
      const { gameId, rateNote: note } = rateNote

      if (gameMap.has(gameId)) {
        const notes = gameMap.get(gameId)
        if (notes) {
          notes.push(note)
        }
      } else {
        gameMap.set(gameId, [note])
      }
    })

    const gameAverageRates: GameAverageRate[] = []

    gameMap.forEach((notes, gameId) => {
      const sum = notes.reduce((total, note) => total + note, 0)
      const average = sum / notes.length

      gameAverageRates.push({
        gameId,
        averageRate: average,
      })
    })

    setAverageRateNotes(gameAverageRates)
  }

  function getGameAverageRateNote(gameId: number) {
    const gameRateNote = averageRateNotes.filter((game) => {
      return game.gameId === gameId
    })

    if (gameRateNote.length > 0) {
      return gameRateNote[0].averageRate
    }

    return 0
  }

  useEffect(() => {
    getGamesData()
    getGamesRateNotes()
  }, [])

  useEffect(() => {
    getAverageRateNotes()
  }, [gamesRateNotes])

  useEffect(() => {
    if (location.pathname === '/user/favorites') {
      renderGameList({ page: 'favorites' })
    }
  }, [userFavoritesGamesIds])

  useEffect(() => {
    if (isUserAuthenticated) {
      getUserFavoritesGamesIds()
    }
  }, [isUserAuthenticated])

  useEffect(() => {
    if (!isUserAuthenticated) {
      setUserFavoritesGamesCollectionId('')
      setUserFavoritesGamesIds([])
      setGamesRateNotes([])
      getGamesRateNotes()
    }
  }, [isUserAuthenticated])

  useEffect(() => {
    setFilteredGameList(gameListToShow)
  }, [gameListToShow])

  return (
    <GlobalContext.Provider
      value={{
        originalGamesList,
        gameListToShow,
        filteredGameList,
        currentPageData,
        isPageLoading,
        errorResponse,
        userFavoritesGamesIds,
        currentPage,
        genreFilter,
        wayToSortGameListByRatings,
        gamesRateNotes,

        renderGameList,
        onFavoriteGame,
        verifyIfGameIsAlreadyFavorited,
        onRateGame,
        verifyIfGameIsAlreadyRatedByUser,
        getGameInfos,
        changePage,
        filterGamesListByTitleOrGenre,
        sortGameListByRateNote,
        getGameAverageRateNote,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
