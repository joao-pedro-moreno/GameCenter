import {
  DisconnectButton,
  HeaderContainer,
  LoginButton,
  RedirectButton,
} from './styles'
import { Logo } from '../Logo'
import { useAuth } from '../../hooks/useAuth'

export function Header() {
  const { isUserAuthenticated, userLogOut } = useAuth()

  return (
    <HeaderContainer>
      <Logo />

      {isUserAuthenticated ? (
        <div>
          <RedirectButton to={'/user/rates'}>Avaliados</RedirectButton>
          <RedirectButton to={'/user/favorites'}>Favoritos</RedirectButton>
          <DisconnectButton onClick={userLogOut}>Desconectar</DisconnectButton>
        </div>
      ) : (
        <LoginButton to="/auth/login">Fazer Login</LoginButton>
      )}
    </HeaderContainer>
  )
}
