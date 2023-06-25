import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import { Header } from './components/Header'
import { Main } from './components/Main'

import { GameListContextProvider } from './contexts/GameListContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GameListContextProvider>
        <Header />
        <Main />
      </GameListContextProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
