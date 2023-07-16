import { css, styled } from 'styled-components'

interface GenreFilterContainerProps {
  $isVisible: boolean
}

export const GenreFilterContainer = styled.form<GenreFilterContainerProps>`
  display: none;

  opacity: 0;
  max-height: 0;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      opacity: 1;
      max-height: inherit;
      margin-top: 1rem;
    `}

  ${({ $isVisible }) => $isVisible && css``}

  @media (max-width: 1120px) {
    justify-content: center;
    gap: 0.5rem;
  }
`
