import { styled } from 'styled-components'

export const ErrorMessageContainer = styled.span`
  margin-top: -1.25rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors['red-400']};
`
