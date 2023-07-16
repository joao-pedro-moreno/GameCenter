import { styled } from 'styled-components'

export const GamePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h2 {
    font-size: 2rem;
    font-weight: 400;

    color: ${({ theme }) => theme.colors['gray-800']};

    > span {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors['gray-400']};
    }
  }

  @media (max-width: 768px) {
    align-items: center;
  }
`

export const GameHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h2 {
    font-size: 2rem;
    font-weight: 400;

    color: ${({ theme }) => theme.colors['gray-800']};

    > span {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors['gray-400']};
    }
  }

  > span {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    > h2 {
      display: flex;
      justify-content: center;
      align-items: center;

      > span {
        margin-right: 1rem;
      }
    }

    > span {
      font-size: 1.25rem;
      white-space: nowrap;
    }
  }
`

export const GameInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  > div {
    flex: 1;

    > img {
      width: 100%;
      border-radius: 8px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const AsideInfoContainer = styled.aside`
  max-width: 360px;
  padding: 1rem;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: ${({ theme }) => theme.colors.white};

  > h3 {
    font-size: 1.25rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.button};
  }

  > p {
    margin-top: -10px;
    line-height: 20px;
  }
`

export const GameInfo = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors['gray-800']};

  > span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors['gray-600']};
  }
`

export const LikeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    text-align: center;

    width: 100%;

    background-color: ${({ theme }) => theme.colors['gray-300']};
    padding: 0.75rem;
    border-radius: 4px;

    color: ${({ theme }) => theme.colors.white};
    font-size: 1.125rem;

    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors['red-100']};
    }
  }

  > input:checked + label {
    background-color: ${({ theme }) => theme.colors['red-200']};

    &:hover {
      background-color: ${({ theme }) => theme.colors['red-300']};
    }
  }

  > input {
    visibility: hidden;
    appearance: none;
  }
`
