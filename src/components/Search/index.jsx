import React from 'react'
import { Button, Stack, TextField, useMediaQuery } from '@mui/material'

const Search = ({ link, setLink, apiKey, searchPlaylist }) => {
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
          label="Ссылка на плейлист"
          variant="outlined"
          value={link}
          onChange={handleLink}
          onKeyDown={enterClick}
        />
        <Button
          variant="contained"
          onClick={() => searchPlaylist(link, apiKey)}
        >
          Поиск
        </Button>
      </Stack>
    </>
  )
}

export default Search
