import { GameController } from '@phosphor-icons/react'

import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer className="container">
      <h1>
        GameCenter <GameController />
      </h1>
    </HeaderContainer>
  )
}
