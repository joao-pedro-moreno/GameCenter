import { InputHTMLAttributes } from 'react'
import { ConnectInputTextContainer } from './styles'

interface ConnectInputTextProps extends InputHTMLAttributes<HTMLInputElement> {}

export function ConnectInputText({ ...props }: ConnectInputTextProps) {
  return <ConnectInputTextContainer {...props} />
}
