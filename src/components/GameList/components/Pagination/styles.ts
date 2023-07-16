import { styled } from 'styled-components'

export const PaginationContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  gap: 1.5rem;

  margin-top: 1rem;
  margin-bottom: 2rem;

  > button {
    background-color: transparent;
    border: none;

    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.button};

    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.hover};
    }
  }

  > p {
    position: absolute;
    bottom: 3px;

    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors['gray-800']};
  }
`
