import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles'
import Main from './Main'
import { AlertContextProvider } from './context/alert'
import { LanguageContextProvider } from './context/language'
import { ThemeContextProvider } from './context/theme'

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeContextProvider>
        <LanguageContextProvider>
          <AlertContextProvider>
            <Main />
          </AlertContextProvider>
        </LanguageContextProvider>
      </ThemeContextProvider>
    </StyledEngineProvider>
  )
}

export default App
