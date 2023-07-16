import { Heart } from '@phosphor-icons/react'

import { NavLink } from 'react-router-dom'
import {
  GameCardContainer,
  GameDescription,
  GamePublisher,
  GameTitle,
  GameUserInfos,
  LikeHeartButton,
} from './styles'

import { useGlobal } from '../../../../hooks/useGlobal'
import { Rating } from '../../../Rating'
import { useEffect, useState } from 'react'

interface GameCardProps {
  backgroundImg: string
  gameId: number
  gameTitle: string
  gameDesc: string
  gamePublisher: string
}

export function GameCard({
  backgroundImg,
  gameId,
  gameTitle,
  gameDesc,
  gamePublisher,
}: GameCardProps) {
  const [isGameLiked, setIsGameLiked] = useState(false)

  const {
    userFavoritesGamesIds,
    onFavoriteGame,
    verifyIfGameIsAlreadyFavorited,
  } = useGlobal()

  const shortDescription = gameDesc.substring(0, 115).concat('...')

  useEffect(() => {
    setIsGameLiked(verifyIfGameIsAlreadyFavorited(gameId))
  }, [userFavoritesGamesIds])

  return (
    <GameCardContainer>
      <img src={backgroundImg} alt="" />

      <div>
        <div>
          <GameTitle>{gameTitle}</GameTitle>
          <GamePublisher>{gamePublisher}</GamePublisher>
        </div>

        <div>
          <GameUserInfos>
            <Rating gameId={gameId} size="sm" />|
            <LikeHeartButton>
              <input
                type="checkbox"
                name={`likeHeart${gameId}`}
                id={`likeHeart${gameId}`}
                checked={isGameLiked}
                onChange={() => onFavoriteGame(gameId)}
              />

              <label htmlFor={`likeHeart${gameId}`}>
                <Heart weight={isGameLiked ? 'fill' : 'regular'} />
              </label>
            </LikeHeartButton>
          </GameUserInfos>
        </div>
      </div>

      <GameDescription>
        {gameDesc.length > 115 ? shortDescription : gameDesc}
      </GameDescription>

      <NavLink to={`/game/${gameId}`}>Saiba Mais...</NavLink>
    </GameCardContainer>
  )
}
