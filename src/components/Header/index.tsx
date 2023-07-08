import { HeaderContainer, LoginButton } from './styles'
import { Logo } from '../Logo'

export function Header() {
  return (
    <HeaderContainer>
      <Logo />

      <LoginButton to="/connect/login">Fazer Login</LoginButton>
    </HeaderContainer>
  )
}
