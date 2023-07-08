import {
  RedirectLink,
  RegisterContainer,
  RegisterFormContainer,
} from './styles'
import { ConnectInput } from '../../components/ConnectInput'

export function RegisterPage() {
  return (
    <RegisterContainer>
      <h1>Crie sua conta</h1>

      <p>
        Faça login ou registre-se para começar a navegar para lista de jogos.
      </p>

      <RegisterFormContainer>
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

        <ConnectInput.Root>
          <ConnectInput.Label
            htmlFor="gamecenter-repeat-password"
            label="Repitir senha"
          />
          <ConnectInput.Password
            placeholder="Digite a senha inserida acima"
            name="gamecenter-repeat-password"
            id="gamecenter-repeat-password"
          />
        </ConnectInput.Root>

        <button type="submit">Criar conta</button>

        <p>
          Já tem uma conta?{' '}
          <RedirectLink to="/connect/login">Login</RedirectLink>
        </p>
      </RegisterFormContainer>
    </RegisterContainer>
  )
}
