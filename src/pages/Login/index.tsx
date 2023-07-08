import { LoginContainer, LoginFormContainer, RedirectLink } from './styles'
import { ConnectInput } from '../../components/ConnectInput'

export function LoginPage() {
  return (
    <LoginContainer>
      <h1>Acesse sua conta</h1>

      <p>
        Faça login ou registre-se para começar a navegar para lista de jogos.
      </p>

      <LoginFormContainer>
        <ConnectInput.Root>
          <ConnectInput.Label htmlFor="gamecenter-email" label="E-mail" />
          <ConnectInput.Text
            type="email"
            placeholder="Digite seu e-mail"
            name="gamecenter-email"
            id="gamecenter-email"
          />
        </ConnectInput.Root>

        <ConnectInput.Root>
          <ConnectInput.Label htmlFor="gamecenter-password" label="Senha" />
          <ConnectInput.Password
            placeholder="Digite sua senha"
            name="gamecenter-password"
            id="gamecenter-password"
          />
        </ConnectInput.Root>

        <button type="submit">Entrar</button>

        <p>
          Ainda não tem uma conta?{' '}
          <RedirectLink to="/connect/register">Inscreva-se</RedirectLink>
        </p>
      </LoginFormContainer>
    </LoginContainer>
  )
}
