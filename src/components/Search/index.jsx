import React, { useContext } from 'react'
import {
  Button, FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  useMediaQuery
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
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
  const clearLink = () => setLink('')

  const marginTop = useMediaQuery('(max-width:1300px)') ? 8 : 0

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mt: marginTop }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="link">{languages[language.current].search.field}</InputLabel>
          <OutlinedInput
            id="link"
            label={languages[language.current].search.field}
            value={link}
            onChange={handleLink}
            onKeyDown={enterClick}
            endAdornment={
              <InputAdornment position="end">
                {link && <IconButton onClick={clearLink}>
                  <ClearIcon/>
                </IconButton>}
              </InputAdornment>
            }
          />
        </FormControl>
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
