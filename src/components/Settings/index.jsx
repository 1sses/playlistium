import React, { useContext, useEffect, useState } from 'react'
import { Dialog, DialogTitle, Fab, Link, Stack, TextField, useMediaQuery } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { AlertContext } from '../../context/alert'

const Settings = ({ apiKey, setApiKey }) => {
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
        'Предупреждение',
        'Отсутствует API-ключ! Введите его в настройках, чтобы пользоваться приложением!'
      )
    }
  }, [])

  const modalWidth = useMediaQuery('(max-width:600px)') ? 280 : 500

  return (
    <>
      <Dialog onClose={handleDialogClose} open={open} aria-labelledby="simple-dialog-title">
        <DialogTitle>Настройки</DialogTitle>
        <Stack sx={{ padding: 2, width: modalWidth }}>
          <TextField
            fullWidth
            label="Ключ API"
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
            Как получить ключ?
          </Link>
        </Stack>
      </Dialog>
      <Fab
        onClick={() => handleDialogOpen(null)}
        color="primary"
        size="medium"
        aria-label="Настройки"
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <SettingsIcon />
      </Fab>
    </>
  )
}

export default Settings
