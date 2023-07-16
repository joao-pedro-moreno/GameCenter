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
    padding: 0 0.5rem;

    > h1 {
      font-size: 2rem;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      flex-direction: column;
    }
  }
`

export const LoginButton = styled(NavLink)`
  color: ${({ theme }) => theme.colors.button};
  font-weight: 700;
  white-space: nowrap;

  background-color: transparent;
  padding: 0.5rem 1rem;

  border: 1px solid ${({ theme }) => theme.colors.button};
  border-radius: 6px;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    border: 1px solid ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.white};
  }
`

export const RedirectButton = styled(NavLink)`
  margin-right: 1rem;

  color: ${({ theme }) => theme.colors.button};
  transition: all 0.2s ease;

  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.button};
    transform-origin: bottom left;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom right;
  }
`

export const DisconnectButton = styled.button`
  font-weight: 700;

  background-color: transparent;
  padding: 0.5rem 1rem;

  color: ${({ theme }) => theme.colors['red-400']};
  border: 1px solid ${({ theme }) => theme.colors['red-400']};
  border-radius: 6px;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors['red-200']};
    border: 1px solid ${({ theme }) => theme.colors['red-200']};
    color: ${({ theme }) => theme.colors.white};
  }

  @media (max-width: 768px) {
    padding: 0;
    border: none;
  }
`
