import { useState, InputHTMLAttributes, forwardRef } from 'react'
import { Eye, EyeSlash } from '@phosphor-icons/react'

import { ConnectInputPasswordContainer } from './styles'

type ConnectInputPasswordProps = InputHTMLAttributes<HTMLInputElement> & {}

export const ConnectInputPassword = forwardRef<
  HTMLInputElement,
  ConnectInputPasswordProps
>(({ ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function HandleToggleInputVisibility() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false)
    } else {
      setIsPasswordVisible(true)
    }
  }

  return (
    <ConnectInputPasswordContainer>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        {...props}
        ref={ref}
      />

      <button onClick={HandleToggleInputVisibility} type="button">
        {isPasswordVisible ? <Eye size={20} /> : <EyeSlash size={20} />}
      </button>
    </ConnectInputPasswordContainer>
  )
})

ConnectInputPassword.displayName = 'ConnectInputPassword'
