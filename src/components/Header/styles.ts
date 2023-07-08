import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  height: 6.5rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.colors['gray-300']};

  padding: 0 1.5rem;
  margin-bottom: 1rem;

  > h1 {
    font-size: 2.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.logo};

    display: flex;
    align-items: center;
    gap: 0.5rem;

    > svg {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  @media (max-width: 768px) {
    > h1 {
      font-size: 2rem;
    }
  }
`

export const LoginButton = styled(NavLink)`
  font-weight: 700;

  background-color: transparent;
  padding: 0.5rem 1rem;

  color: ${({ theme }) => theme.colors.button};
  border: 1px solid ${({ theme }) => theme.colors.button};
  border-radius: 6px;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.white};
  }
`
