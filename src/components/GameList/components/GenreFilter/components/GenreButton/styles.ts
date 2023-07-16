import { styled } from 'styled-components'

export const GenreButtonContainer = styled.div`
  > input {
    visibility: hidden;
    appearance: none;
  }

  > label {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;

    padding: 0.5rem;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.colors['blue-100']};
    color: #5498ff;

    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #5699ff50;
    }
  }

  > input:checked + label {
    background-color: #5498ff;
    color: ${({ theme }) => theme.colors['blue-100']};
  }
`
