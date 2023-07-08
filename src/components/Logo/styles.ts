import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'

export const LogoContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 2rem;
  color: ${({ theme }) => theme.colors['gray-900']};

  > svg {
    color: ${({ theme }) => theme.colors.logo};
  }
`
