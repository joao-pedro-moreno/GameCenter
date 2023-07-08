import { styled } from 'styled-components'

export const ConnectInputTextContainer = styled.input`
  width: 100%;
  padding: 1rem 0.75rem;
  margin-bottom: 1rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};
  border-radius: 4px;

  color: ${({ theme }) => theme.colors['gray-800']};
  font-size: 0.875rem;

  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-400']};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
`
