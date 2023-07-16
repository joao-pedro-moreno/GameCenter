import { styled } from 'styled-components'

import bgImage from '../../assets/bg.svg'
import { LogoContainer } from '../../components/Logo/styles'

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

export const ContentContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors['gray-100']};
  padding: 2rem 3rem;
`

export const Logo = styled(LogoContainer)`
  position: absolute;
  top: 2rem;
  left: 3rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 2rem;
  color: ${({ theme }) => theme.colors['gray-900']};

  > svg {
    color: ${({ theme }) => theme.colors.logo};
  }
`

export const BgImageContainer = styled.div`
  height: 100vh;

  background-image: url(${bgImage});
  background-size: cover;

  @media (max-width: 768px) {
    display: none;
  }
`
