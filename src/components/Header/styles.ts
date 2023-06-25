import styled from 'styled-components'

export const HeaderContainer = styled.header`
  height: 6.5rem;

  display: flex;
  align-items: center;

  padding: 0 1.5rem;

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
