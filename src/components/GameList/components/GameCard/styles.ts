import { styled } from 'styled-components'

export const GameCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  width: 365px;

  border-radius: 8px;
  box-shadow: 0px 4px 16px 0px #2b80c340;

  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;

  > img {
    border-radius: 4px;
    max-width: calc(365px - 2rem);
    aspect-ratio: 16/9;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  > a {
    color: ${({ theme }) => theme.colors.link};
  }
`

export const GameTitle = styled.strong`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-size: 1.25rem;
`

export const GamePublisher = styled.p`
  margin-top: -5px;
  color: ${({ theme }) => theme.colors['gray-400']};

  margin-bottom: 1rem;
`

export const GameDescription = styled.p`
  margin-top: -10px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors['gray-600']};
`

export const GameUserInfos = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  color: ${({ theme }) => theme.colors['gray-500']};
  font-size: 1.125rem;
  white-space: nowrap;

  .star {
    color: ${({ theme }) => theme.colors['yellow-200']};
  }
`

export const LikeHeartButton = styled.div`
  max-width: fit-content;
  max-height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  > label {
    max-height: 18px;

    display: flex;

    color: ${({ theme }) => theme.colors['red-200']};
    font-size: 1.125rem;

    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors['red-100']};
    }
  }

  > input:checked + label {
    color: ${({ theme }) => theme.colors['red-200']};

    animation: favorite 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors['red-300']};
    }
  }

  > input {
    visibility: hidden;
    appearance: none;
  }
`
