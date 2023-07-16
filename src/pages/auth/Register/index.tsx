import { useEffect, useState } from 'react'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  RedirectLink,
  RegisterContainer,
  RegisterFormContainer,
} from './styles'
import { ConnectInput } from '../../../components/ConnectInput'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

const registerAccountSchema = zod.object({
  email: zod.string().email('Insira um endereço de e-mail válido'),
  password: zod.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  repeatPassword: zod
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export type RegisterData = zod.infer<typeof registerAccountSchema>

type RegisterAccountData = RegisterData

export function RegisterPage() {
  const [error, setError] = useState('')

  const { registerUser, isUserAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [areThePasswordsTheSame, setAreThePasswordsTheSame] = useState<
    boolean | null
  >(null)

  const registerAccountForm = useForm<RegisterAccountData>({
    resolver: zodResolver(registerAccountSchema),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = registerAccountForm

  async function handleRegisterAccount(data: RegisterData) {
    if (data.password !== data.repeatPassword) {
      return setAreThePasswordsTheSame(false)
    }

    try {
      await registerUser({
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
    <RegisterContainer>
      <h1>Crie sua conta</h1>

      <p>
        Faça login ou registre-se para começar a navegar para lista de jogos.
      </p>

      <RegisterFormContainer onSubmit={handleSubmit(handleRegisterAccount)}>
        <ConnectInput.Root>
          <ConnectInput.Label htmlFor="gamecenter-email" label="E-mail" />
          <ConnectInput.Text
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email')}
            id="gamecenter-email"
          />
          {errors.email && (
            <ConnectInput.Error errorMessage={errors.email.message!} />
          )}
        </ConnectInput.Root>

        <ConnectInput.Root>
          <ConnectInput.Label htmlFor="gamecenter-password" label="Senha" />
          <ConnectInput.Password
            placeholder="Digite sua senha"
            {...register('password')}
            id="gamecenter-password"
          />
          {errors.password ? (
            <ConnectInput.Error errorMessage={errors.password.message!} />
          ) : (
            areThePasswordsTheSame && (
              <ConnectInput.Error errorMessage="As senhas informadas são diferentes" />
            )
          )}
        </ConnectInput.Root>

        <ConnectInput.Root>
          <ConnectInput.Label
            htmlFor="gamecenter-repeat-password"
            label="Repitir senha"
          />
          <ConnectInput.Password
            placeholder="Digite a senha inserida acima"
            {...register('repeatPassword')}
            id="gamecenter-repeat-password"
          />
          {errors.repeatPassword ? (
            <ConnectInput.Error errorMessage={errors.repeatPassword.message!} />
          ) : (
            areThePasswordsTheSame && (
              <ConnectInput.Error errorMessage="As senhas informadas são diferentes" />
            )
          )}

          {error && <ConnectInput.Error errorMessage={error} />}
        </ConnectInput.Root>

        <button type="submit">Criar conta</button>

        <p>
          Já tem uma conta? <RedirectLink to="/auth/login">Login</RedirectLink>
        </p>
      </RegisterFormContainer>
    </RegisterContainer>
  )
}
