import { useState } from 'react'
import { Checkbox, CheckboxContainer } from './styles'
import { CheckFat } from '@phosphor-icons/react'
import { useAuth } from '../../../../hooks/useAuth'

interface ConnectInputCheckboxProps {
  label: string
  checked?: boolean
}

export function ConnectInputCheckbox({
  label,
  checked,
}: ConnectInputCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked ?? false)

  const { setRememberAccount } = useAuth()

  function handleChangeCheckbox() {
    if (isChecked) {
      setIsChecked(false)
      setRememberAccount(false)
    } else {
      setIsChecked(true)
      setRememberAccount(true)
    }
  }

  return (
    <>
      <CheckboxContainer>
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={handleChangeCheckbox}
        />

        <Checkbox $isChecked={isChecked} onClick={handleChangeCheckbox}>
          {isChecked && <CheckFat size={12} weight="fill" color="#ffffff" />}
        </Checkbox>

        <label htmlFor="checkbox">{label}</label>
      </CheckboxContainer>
    </>
  )
}
