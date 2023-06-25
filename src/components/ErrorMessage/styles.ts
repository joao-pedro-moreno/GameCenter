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
  gap: 0.5rem;

  > h2 {
    font-size: 5rem;
    color: ${({ theme }) => theme.colors.error};

    > svg {
      font-size: 5rem;
    }
  }

  > p {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
  }
`
