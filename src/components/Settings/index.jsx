import React, { useContext, useEffect, useState } from 'react'
import { Box, Dialog, DialogTitle, Fab, IconButton, Link, Stack, TextField } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { AlertContext } from '../../context/alert'
import { LanguageContext } from '../../context/language'
import languages from '../../language'
import LanguageSwitcher from '../LanguageSwitcher'
import Tutorial from '../Tutorial'
import { ThemeContext } from '../../context/theme'

const Settings = ({ apiKey, setApiKey }) => {
  const language = useContext(LanguageContext)
  const theme = useContext(ThemeContext)
  const [open, setOpen] = useState(false)
  const alert = useContext(AlertContext)

  const handleDialogOpen = () => {
    setOpen(true)
  }
  const handleDialogClose = () => {
    setOpen(false)
  }

  const handleKey = (e) => {
    setApiKey(e.target.value)
    localStorage.setItem('apikey', e.target.value)
  }

  useEffect(() => {
    if (!localStorage.getItem('apikey')) {
      alert.show(
        'warning',
        languages[language.current].alert.warning,
        languages[language.current].alert.missingAPIkeyWarn
      )
    }
  }, [])

  return (
    <>
      <Dialog onClose={handleDialogClose} open={open} maxWidth="xs" fullWidth>
        <DialogTitle>{languages[language.current].settings.title}</DialogTitle>
        <Stack sx={{ padding: 2 }}>
          <TextField
            label={languages[language.current].settings.apiKeyField}
            variant="outlined"
            margin="normal"
            value={apiKey}
            onChange={handleKey}
          />
          <Link
            href="https://zen.yandex.ru/media/id/5e6006ec2273ad143e3931c1/kak-poluchit-rabochii-kliuch-google-api-key-ot-youtube-600878679444cb7e98fa0d38"
            target="_blank"
            underline="hover"
          >
            {languages[language.current].settings.howToGetAPIkey}
          </Link>
          <LanguageSwitcher />
          <Box sx={{ position: 'absolute', top: 13, right: 16 }}>
            <IconButton onClick={theme.toggle}>
              {theme.current === 'light'
                ? <LightModeIcon />
                : <DarkModeIcon />}
            </IconButton>
            <Tutorial />
          </Box>
        </Stack>
      </Dialog>
      <Fab
        onClick={() => handleDialogOpen(null)}
        color="primary"
        size="medium"
        aria-label="Settings"
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <SettingsIcon />
      </Fab>
    </>
  )
}

export default Settings
