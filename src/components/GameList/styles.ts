import { styled } from 'styled-components'

export const GameListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const GamesContainer = styled.div`
  margin-top: 1rem;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.775rem;

  border-top: 1px solid ${({ theme }) => theme.colors['gray-300']};
  padding-top: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors['gray-300']};
  padding-bottom: 1rem;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    padding: 0.75rem 2rem;
    border-radius: 4px;
    border: none;

    background-color: ${({ theme }) => theme.colors.button};

    color: ${({ theme }) => theme.colors.white};
    font-size: 0.875rem;

    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }
  }
`

export const NotFoundContainer = styled.div`
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > p {
    min-width: 60%;

    font-size: 1.125rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors['gray-800']};
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > p {
      text-align: center;
    }
  }
`
