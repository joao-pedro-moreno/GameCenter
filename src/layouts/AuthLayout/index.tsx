import { Outlet } from 'react-router-dom'
import { GameController } from '@phosphor-icons/react'

import {
  BgImageContainer,
  ContentContainer,
  LayoutContainer,
  Logo,
} from './styles'

export function AuthLayout() {
  return (
    <LayoutContainer>
      <ContentContainer>
        <Logo to="/">
          <GameController /> GameCenter
        </Logo>

        <Outlet />
      </ContentContainer>

      <BgImageContainer />
    </LayoutContainer>
  )
}
