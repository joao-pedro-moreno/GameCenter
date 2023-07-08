import { useState, InputHTMLAttributes } from 'react'
import { Eye, EyeSlash } from '@phosphor-icons/react'

import { ConnectInputPasswordContainer } from './styles'

interface ConnectInputPasswordProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export function ConnectInputPassword({ ...props }: ConnectInputPasswordProps) {
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
      <input type={isPasswordVisible ? 'text' : 'password'} {...props} />

      <button onClick={HandleToggleInputVisibility} type="button">
        {isPasswordVisible ? <Eye size={20} /> : <EyeSlash size={20} />}
      </button>
    </ConnectInputPasswordContainer>
  )
}
