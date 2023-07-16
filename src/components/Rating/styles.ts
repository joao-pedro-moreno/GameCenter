import { css, styled } from 'styled-components'

interface RatingButtonProps {
  $selected: boolean
  $size: 'sm' | 'lg'
  $hover: boolean
}

export const RatingButton = styled.button<RatingButtonProps>`
  margin-top: -10px;

  background-color: transparent;
  border: none;

  > svg {
    ${({ $selected, theme }) =>
      $selected
        ? css`
            color: ${theme.colors['yellow-200']};
          `
        : css`
            color: ${theme.colors['yellow-100']};
          `}

    ${({ $size }) =>
      $size === 'lg'
        ? css`
            font-size: 1.75rem;
          `
        : css`
            font-size: 1rem;
          `}

    ${({ $hover, theme }) =>
      $hover &&
      css`
        color: ${theme.colors['yellow-200']};
      `}
  }
`
