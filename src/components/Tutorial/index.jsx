import React, { useContext, useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography
} from '@mui/material'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import CheckIcon from '@mui/icons-material/Check'
import { LanguageContext } from '../../context/language'
import parse from 'html-react-parser'
import languages from '../../language'

const Tutorial = () => {
  const language = useContext(LanguageContext)
  const [open, setOpen] = useState(false)

  const handleDialogOpen = () => {
    setOpen(true)
  }
  const handleDialogClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog onClose={handleDialogClose} open={open} maxWidth="md">
        <DialogTitle sx={{ fontSize: 22 }}>{languages[language.current].tutorial.title}</DialogTitle>
        <Stack sx={{ padding: 2 }}>
          <Typography variant="body1" width="100%">
            {languages[language.current].tutorial.text.split('\n').map(
              (line, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  gutterBottom
                  sx={{ textIndent: 20 }}
                >
                  {parse(line)}
                </Typography>
              )
            )}
            <Button
              startIcon={<CheckIcon />}
              variant="outlined"
              onClick={handleDialogClose}
            >
              {languages[language.current].tutorial.gotItButton}
            </Button>
            <Typography variant="h6" component="h3" mt={3}>by 1sses</Typography>
            <Typography>
              Email: <Link href="mailto:vladzholon@gmail.com">vladzholon@gmail.com</Link>
            </Typography>
            <Typography>
              Telegram <Link href="https://t.me/one_sses" target="_blank">{languages[language.current].tutorial.here}</Link>
            </Typography>
            <Typography>
              VK <Link href="https://vk.com/1sses" target="_blank">{languages[language.current].tutorial.here}</Link>
            </Typography>
          </Typography>
        </Stack>
      </Dialog>
      <IconButton color="primary" sx={{ position: 'absolute', top: 10, right: 3 }}>
        <QuestionMarkIcon onClick={handleDialogOpen} />
      </IconButton>
    </>
  )
}

export default Tutorial
