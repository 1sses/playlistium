import React, { useContext } from 'react'
import { Stack, Typography } from '@mui/material'
import convertTime from '../../utils/convertTime'
import { LanguageContext } from '../../context/language'
import languages from '../../language'

const Statistics = ({ videos, selected }) => {
  const language = useContext(LanguageContext)

  const getTotalDuration = () => {
    const total = selected.reduce((acc, videoId) =>
      acc + videos[videoId - 1].duration, 0)
    return convertTime(total, language.current)
  }

  return (
    <Stack mt={3}>
      <Typography variant="h5">{languages[language.current].statistics.totalDuration} {getTotalDuration()}</Typography>
    </Stack>
  )
}

export default Statistics
