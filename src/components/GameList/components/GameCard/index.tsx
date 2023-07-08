import { GameCardContainer, GameDesc, GameName } from './styles'

interface GameCardProps {
  backgroundImg: string
  gameTitle: string
  gameDesc: string
  gamePublisher: string
}

export function GameCard({
  backgroundImg,
  gameTitle,
  gameDesc,
  gamePublisher,
}: GameCardProps) {
  const shortDescription = gameDesc.substring(0, 115).concat('...')

  return (
    // <GameCardContainer>
    //   <div>
    //     <GameName>{gameTitle}</GameName>
    //     <GameDesc>
    //       {gameDesc.length >= 115 ? shortDescription : gameDesc}
    //     </GameDesc>
    //   </div>
    //   <img src={backgroundImg} alt="" />
    // </GameCardContainer>
    <GameCardContainer>
      <img src={backgroundImg} alt="" />

      <div>
        <strong>{gameTitle}</strong>
        <p>{gamePublisher}</p>
      </div>

      <p>{shortDescription}</p>
    </GameCardContainer>
  )
}
