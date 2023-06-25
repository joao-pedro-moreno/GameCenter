import { styled } from 'styled-components'

export const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;
`

export const OutsideLoader = styled.div`
  width: 80px;
  height: 80px;

  border-radius: 999px;

  border-top: 3px solid ${({ theme }) => theme.colors.button};
  border-right: 3px solid ${({ theme }) => theme.colors.button};
  border-bottom: 3px solid ${({ theme }) => theme.colors.button};
  border-left: 3px solid ${({ theme }) => theme.colors['main-background']};

  display: flex;
  align-items: center;
  justify-content: center;

  animation: rotation 4s infinite linear;
`

export const InsideLoader = styled.div`
  width: calc(80px - 1.5rem);
  height: calc(80px - 1.5rem);

  border-radius: 999px;

  border-top: 3px solid ${({ theme }) => theme.colors.button};
  border-right: 3px solid ${({ theme }) => theme.colors['main-background']};
  border-bottom: 3px solid ${({ theme }) => theme.colors.button};
  border-left: 3px solid ${({ theme }) => theme.colors.button};

  animation: rotation 2s infinite linear;
`
