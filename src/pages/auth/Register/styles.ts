import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h1 {
    color: ${({ theme }) => theme.colors['gray-800']};
  }

  > p {
    width: 400px;
    color: ${({ theme }) => theme.colors['gray-600']};
  }

  @media (max-width: 768px) {
    width: calc(100vw - 6rem);
    margin-top: 5rem;

    > p {
      width: 100%;
    }
  }
`

export const RegisterFormContainer = styled.form`
  > button[type='submit'] {
    width: 100%;
    padding: 1rem 1.5rem;

    background-color: ${({ theme }) => theme.colors.button};
    border: none;
    border-radius: 4px;

    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;

    margin: 1rem 0 2rem;

    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }
  }

  > p {
    color: ${({ theme }) => theme.colors['gray-600']};
  }
`

export const RedirectLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.logo};
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`
