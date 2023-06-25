import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background-color: ${({ theme }) => theme.colors['main-background']};
  }

  body, input, textarea, button {
    font-family: ${({ theme }) => theme.fonts.poppins};
    font-weight: 400;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased
  }

  .container {
    /* width: 70rem; */
    max-width: 1120px;
    margin: 0 auto;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 0.4rem;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors['secondary-background']}
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background: ${({ theme }) => theme.colors.button}
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  @media (max-width: 768px) {
    html {
        font-size: 87.5%;
    }
  }

  @media (max-width: 1120px) {
    .container {
      padding: 0 1rem;
    }
  }
`
