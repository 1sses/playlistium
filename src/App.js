import React from 'react'
import {
  createTheme,
  ThemeProvider
} from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import useCreateAlert, { AlertContext } from './context/alert'
import Main from './Main'
import useCreateLanguage, { LanguageContext } from './context/language'

const theme = createTheme({ palette: { mode: 'dark' } })

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LanguageContext.Provider value={useCreateLanguage()}>
          <AlertContext.Provider value={useCreateAlert()}>
            <Main />
          </AlertContext.Provider>
        </LanguageContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
