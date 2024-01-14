import styled, { css } from 'styled-components'

interface CheckBoxProps {
  $isChecked: boolean
}

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  > input {
    visibility: hidden;
    appearance: none;
    position: absolute;
  }

  > label {
    color: ${({ theme }) => theme.colors['gray-800']};
  }
`

export const Checkbox = styled.div<CheckBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 17px;
  height: 17px;
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};
  border-radius: 4px;

  cursor: pointer;

  ${({ $isChecked }) =>
    $isChecked
      ? css`
          background-color: ${({ theme }) => theme.colors.button};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.white};
        `}
`
