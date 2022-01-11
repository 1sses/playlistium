import React, { useContext } from 'react'
import { Alert, AlertTitle, Box, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { AlertContext } from '../../context/alert'

const AlertComponent = () => {
  const alert = useContext(AlertContext)
  return (
    <Box sx={{ position: 'fixed', bottom: 10, left: 10, width: 300 }}>
      <Collapse in={alert.visible}>
        <Alert
          severity={alert.type}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={alert.close}
            >
              <CloseIcon />
            </IconButton>}
          sx={{ mb: 1 }}
        >
          <AlertTitle>{alert.header}</AlertTitle>
          {alert.message}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default AlertComponent
