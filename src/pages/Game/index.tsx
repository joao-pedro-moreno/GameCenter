import { useNavigate, useParams } from 'react-router-dom'
import { Heart, Star } from '@phosphor-icons/react'
import { useGlobal } from '../../hooks/useGlobal'
import {
  AsideInfoContainer,
  ErrorContainer,
  GameHeaderContainer,
  GameInfo,
  GameInfoContainer,
  GamePageContainer,
  LikeButtonContainer,
} from './styles'
import { Rating } from '../../components/Rating'

export function GamePage() {
  const {
    getGameInfos,
    onFavoriteGame,
    verifyIfGameIsAlreadyFavorited,
    getGameAverageRateNote,
  } = useGlobal()
  const { id } = useParams()
  const navigate = useNavigate()

  const gameId = Number(id)

  const gameInfo = getGameInfos(gameId)

  const isGameFavorited = verifyIfGameIsAlreadyFavorited(gameId)

  const gameRateNote = getGameAverageRateNote(gameId)

  function handleError() {
    navigate('/')
  }

  return (
    <div className="container">
      {gameInfo ? (
        <GamePageContainer>
          <GameHeaderContainer>
            <h2>
              {gameInfo.title} <span>({gameInfo.genre})</span>
            </h2>

            <span>
              <Star color="#FFA724" weight="fill" /> {gameRateNote.toFixed(1)}
            </span>
          </GameHeaderContainer>

          <GameInfoContainer>
            <div>
              <img src={gameInfo.thumbnail} alt="" />
            </div>

            <AsideInfoContainer>
              <h3>Descrição</h3>
              <p>{gameInfo.short_description}</p>

              <GameInfo>
                Plataforma: <span>{gameInfo.platform}</span>
              </GameInfo>

              <GameInfo>
                Desenvolvedora: <span>{gameInfo.developer}</span>
              </GameInfo>

              <GameInfo>
                Distribuidora: <span>{gameInfo.publisher}</span>
              </GameInfo>

              <GameInfo>
                Data de lançamento:{' '}
                <span>
                  {gameInfo.release_date.split('-').reverse().join('/')}
                </span>
              </GameInfo>

              <h3>Avaliação</h3>
              <Rating gameId={gameId} size="lg" />

              <LikeButtonContainer>
                <input
                  type="checkbox"
                  name="likeButton"
                  id="likeButton"
                  checked={isGameFavorited}
                  onChange={() => onFavoriteGame(gameId)}
                />
                <label htmlFor="likeButton">
                  {isGameFavorited ? 'Favoritado' : 'Favoritar'}{' '}
                  <Heart weight="fill" />
                </label>
              </LikeButtonContainer>
            </AsideInfoContainer>
          </GameInfoContainer>
        </GamePageContainer>
      ) : (
        <ErrorContainer>
          <h2>404</h2>

          <p>Jogo não encontrado</p>

          <button onClick={handleError}>Voltar à página inicial</button>
        </ErrorContainer>
      )}
    </div>
  )
}
