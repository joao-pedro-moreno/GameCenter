import { ReactNode } from 'react'
import { ConnectInputRootContainer } from './styles'

interface ConnectInputRootProps {
  children: ReactNode
}

export function ConnectInputRoot({ children }: ConnectInputRootProps) {
  return <ConnectInputRootContainer>{children}</ConnectInputRootContainer>
}
