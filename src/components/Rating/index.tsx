import { Star } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { RatingButton } from './styles'
import { useGlobal } from '../../hooks/useGlobal'

interface RatingProps {
  gameId: number
  size: 'lg' | 'sm'
}

export function Rating({ gameId, size }: RatingProps) {
  const { gamesRateNotes, onRateGame, verifyIfGameIsAlreadyRatedByUser } =
    useGlobal()

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  function handleRateGame(rateIndex: number) {
    if (rateIndex + 1 === rating) {
      onRateGame({
        gameId,
        rateNote: 0,
      })
      setRating(0)
      return 0
    }

    const rateNote = rateIndex + 1

    onRateGame({
      gameId,
      rateNote,
    })
    setRating(rateNote)
  }

  useEffect(() => {
    const userRateNote = verifyIfGameIsAlreadyRatedByUser(gameId)
    setRating(userRateNote)
  }, [gamesRateNotes])

  return (
    <div>
      {[...Array(4)].map((_, index) => {
        return (
          <RatingButton
            key={index}
            onClick={() => handleRateGame(index)}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(0)}
            $selected={index < rating}
            $size={size}
            $hover={index < hover}
          >
            <Star weight="fill" />
          </RatingButton>
        )
      })}
    </div>
  )
}
