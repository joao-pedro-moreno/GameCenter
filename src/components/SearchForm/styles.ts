import { styled } from 'styled-components'

export const SearchFormContainer = styled.form`
  position: relative;

  > input {
    width: 100%;

    padding: 0.5rem;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors['main-background']};
    background-color: ${({ theme }) => theme.colors.input};

    color: ${({ theme }) => theme.colors.white};

    &::placeholder {
      color: ${({ theme }) => theme.colors.description};
    }

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.border};
    }
  }

  > button {
    position: absolute;
    right: 10px;
    top: 8px;

    background-color: transparent;
    color: ${({ theme }) => theme.colors.logo};
    border: none;

    transition: all 0.2s ease;

    &:hover {
      top: 9px;
      transform: scale(1.1);
    }
  }
`
