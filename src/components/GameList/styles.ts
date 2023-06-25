import { styled } from 'styled-components'

export const GameListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.775rem;

  border-top: 1px solid ${({ theme }) => theme.colors.label};
  padding-top: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.label};
  padding-bottom: 1rem;

  @media (max-width: 1120px) {
    justify-content: center;
  }
`
