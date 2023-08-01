import { styled } from 'styled-components'

import bgImage from '../../assets/bg.svg'
import { LogoContainer } from '../../components/Logo/styles'

export const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;

  > div {
    flex: 1 1 0%;
  }
`

export const ContentContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  background-color: ${({ theme }) => theme.colors['gray-100']};
  padding: 2rem 3rem;

  overflow-y: auto;
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
  background-image: url(${bgImage});
  background-size: cover;

  @media (max-width: 960px) {
    display: none;
  }
`
