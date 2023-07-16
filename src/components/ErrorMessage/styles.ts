import { styled } from 'styled-components'

export const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h2 {
    font-size: 5rem;
    color: ${({ theme }) => theme.colors['red-400']};

    > svg {
      font-size: 5rem;
    }
  }

  > p {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors['gray-800']};
    text-align: center;
  }

  > button {
    margin-top: 1rem;

    padding: 0.75rem 1rem;
    background-color: ${({ theme }) => theme.colors['red-400']};
    border: none;
    border-radius: 4px;

    color: ${({ theme }) => theme.colors.white};
    font-size: 1.125rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors['red-200']};
    }
  }
`
