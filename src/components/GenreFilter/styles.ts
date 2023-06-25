import { styled } from 'styled-components'

export const GenreFilterContainer = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 1120px) {
    justify-content: center;
    gap: 0.5rem;
  }
`
