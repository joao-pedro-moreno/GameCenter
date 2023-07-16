import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background-color: ${({ theme }) => theme.colors['gray-100']};
  }

  body, input, textarea, button {
    font-family: ${({ theme }) => theme.fonts.poppins};
    font-weight: 400;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased
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
    background: ${({ theme }) => theme.colors['gray-300']}
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background: ${({ theme }) => theme.colors['gray-500']}
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  @keyframes favorite {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    html {
        font-size: 85%;
    }
  }

  @media (max-width: 1120px) {
    .container {
      padding: 0 1rem;
    }
  }
`
