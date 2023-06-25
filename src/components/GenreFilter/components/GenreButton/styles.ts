import { styled } from 'styled-components'

export const GenreButtonContainer = styled.div`
  > input {
    visibility: hidden;
    appearance: none;
  }

  > label {
    display: inline-block;
    font-size: 0.75rem;

    padding: 0.5rem;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.colors.input};
    color: ${({ theme }) => theme.colors.white};

    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  > input:checked + label {
    background-color: ${({ theme }) => theme.colors.button};
  }
`
