import { styled } from 'styled-components'

export const GameCardContainer = styled.div`
  position: relative;

  width: 365px;
  height: 206px;
  aspect-ratio: 16/9;
  overflow: hidden;

  border-radius: 8px;

  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
  }

  > div {
    width: 100%;
    height: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    background-image: linear-gradient(
      to top,
      rgba(10, 10, 10, 0.8) 30%,
      transparent
    );

    color: ${({ theme }) => theme.colors.white};
  }
`

export const GameName = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
`
export const GameDesc = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
`
