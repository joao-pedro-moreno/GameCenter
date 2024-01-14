import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginContainer, LoginFormContainer, RedirectLink } from './styles'
import { ConnectInput } from '../../../components/ConnectInput'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

const loginAccountSchema = zod.object({
  email: zod.string().email('Insira um endereço de e-mail válido'),
  password: zod.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export type LoginData = zod.infer<typeof loginAccountSchema>

type LoginAccountData = LoginData

export function LoginPage() {
  const [error, setError] = useState('')

  const { loginUser, isUserAuthenticated } = useAuth()
  const navigate = useNavigate()

  const loginAccountForm = useForm<LoginAccountData>({
    resolver: zodResolver(loginAccountSchema),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = loginAccountForm

  async function handleLoginAccount(data: LoginData) {
    try {
      await loginUser({
        email: data.email,
        password: data.password,
      })

      navigate('/')
    } catch (err) {
      setError('Algo inesperado ocorreu, tente novamente mais tarde')
    }
  }

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate('/')
    }
  }, [isUserAuthenticated])

  return (
    <LoginContainer>
      <h1>Acesse sua conta</h1>

      <p>
        Faça login ou registre-se para começar a navegar para lista de jogos.
      </p>

      <LoginFormContainer onSubmit={handleSubmit(handleLoginAccount)}>
        <ConnectInput.Root>
          <ConnectInput.Label htmlFor="gamecenter-email" label="E-mail" />
          <ConnectInput.Text
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email')}
            id="gamecenter-email"
          />

          {errors.email?.message && (
            <ConnectInput.Error errorMessage={errors.email?.message!} />
          )}
        </ConnectInput.Root>

        <ConnectInput.Root>
          <ConnectInput.Label htmlFor="gamecenter-password" label="Senha" />
          <ConnectInput.Password
            placeholder="Digite sua senha"
            {...register('password')}
            id="gamecenter-password"
          />

          {errors.password?.message && (
            <ConnectInput.Error errorMessage={errors.password?.message!} />
          )}

          {error && <ConnectInput.Error errorMessage={error} />}

          <ConnectInput.Checkbox label="Manter sessão ativa por 7 dias" />
        </ConnectInput.Root>

        <button type="submit">Entrar</button>

        <p>
          Ainda não tem uma conta?{' '}
          <RedirectLink to="/auth/register">Inscreva-se</RedirectLink>
        </p>
      </LoginFormContainer>
    </LoginContainer>
  )
}
