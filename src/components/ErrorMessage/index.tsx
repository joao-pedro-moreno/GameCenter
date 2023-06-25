import { LinkBreak } from '@phosphor-icons/react'

import { ErrorContainer } from './styles'

import { useGameList } from '../../hooks/useGameList'

export function ErrorMessage() {
  const { statusCode, errorMessage } = useGameList()

  const expectedErrorStatusCodes = [500, 502, 503, 504, 507, 508, 509]

  return (
    <ErrorContainer>
      {expectedErrorStatusCodes.includes(statusCode) ? (
        <h2>{statusCode}</h2>
      ) : (
        <h2>
          <LinkBreak />
        </h2>
      )}
      <p>
        {errorMessage ||
          'Um erro inesperado ocorreu, atualize a página para tentar novamente'}
      </p>
    </ErrorContainer>
  )
}
