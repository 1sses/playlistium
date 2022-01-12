import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles'
import useCreateAlert, { AlertContext } from './context/alert'
import Main from './Main'
import useCreateLanguage, { LanguageContext } from './context/language'
import { ThemeContextProvider } from './context/theme'

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeContextProvider>
        <LanguageContext.Provider value={useCreateLanguage()}>
          <AlertContext.Provider value={useCreateAlert()}>
            <Main />
          </AlertContext.Provider>
        </LanguageContext.Provider>
      </ThemeContextProvider>
    </StyledEngineProvider>
  )
}

export default App
