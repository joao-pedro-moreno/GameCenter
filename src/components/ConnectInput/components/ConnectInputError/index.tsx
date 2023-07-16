import { WarningCircle } from '@phosphor-icons/react'
import { ErrorMessageContainer } from './styles'

interface ConnectInputErrorProps {
  errorMessage: string
}

export function ConnectInputError({ errorMessage }: ConnectInputErrorProps) {
  return (
    <ErrorMessageContainer>
      <WarningCircle /> {errorMessage}
    </ErrorMessageContainer>
  )
}
