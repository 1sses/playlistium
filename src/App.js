import React from 'react'
import {
  createTheme,
  ThemeProvider
} from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import useCreateAlert, { AlertContext } from './context/alert'
import Main from './Main'

const theme = createTheme({ palette: { mode: 'dark' } })

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AlertContext.Provider value={useCreateAlert()}>
          <Main />
        </AlertContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
