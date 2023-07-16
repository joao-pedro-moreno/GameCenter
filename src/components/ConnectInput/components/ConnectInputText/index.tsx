import { InputHTMLAttributes, forwardRef } from 'react'
import { ConnectInputTextContainer } from './styles'

type ConnectInputTextProps = InputHTMLAttributes<HTMLInputElement> & {}

export const ConnectInputText = forwardRef<
  HTMLInputElement,
  ConnectInputTextProps
>(({ ...props }, ref) => {
  return <ConnectInputTextContainer {...props} ref={ref} />
})

ConnectInputText.displayName = 'ConnectInputText'
