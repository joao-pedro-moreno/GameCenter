import { styled } from 'styled-components'

export const ConnectInputPasswordContainer = styled.div`
  width: 100%;
  position: relative;

  > input {
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
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    border: none;

    color: ${({ theme }) => theme.colors['gray-400']};

    position: absolute;
    top: 1rem;
    right: 0.75rem;
  }
`
