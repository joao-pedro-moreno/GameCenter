import { LinkBreak } from '@phosphor-icons/react'

import { ErrorContainer } from './styles'

import { useGlobal } from '../../hooks/useGlobal'

export function ErrorMessage() {
  const { errorResponse } = useGlobal()

  function handleReload() {
    window.location.reload()
  }

  return (
    <ErrorContainer>
      {errorResponse.statusCode ? (
        <h2>{errorResponse.statusCode}</h2>
      ) : (
        <h2>
          <LinkBreak />
        </h2>
      )}

      <p>
        {errorResponse.errorMessage ||
          'Um erro inesperado ocorreu, atualize a página para tentar novamente'}
      </p>

      <button onClick={handleReload}>Tentar Novamente</button>
    </ErrorContainer>
  )
}
