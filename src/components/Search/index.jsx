import React, { useContext } from 'react'
import { Button, Stack, TextField, useMediaQuery } from '@mui/material'
import languages from '../../language'
import { LanguageContext } from '../../context/language'

const Search = ({ link, setLink, apiKey, searchPlaylist }) => {
  const language = useContext(LanguageContext)

  const handleLink = (e) => {
    setLink(e.target.value)
  }
  const enterClick = (e) => {
    if (e.keyCode === 13) {
      searchPlaylist(link, apiKey)
    }
  }

  const marginTop = useMediaQuery('(max-width:1300px)') ? 8 : 0

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mt: marginTop }}>
        <TextField
          fullWidth
          label={languages[language.current].search.field}
          variant="outlined"
          value={link}
          onChange={handleLink}
          onKeyDown={enterClick}
        />
        <Button
          variant="contained"
          onClick={() => searchPlaylist(link, apiKey)}
        >
          {languages[language.current].search.button}
        </Button>
      </Stack>
    </>
  )
}

export default Search
