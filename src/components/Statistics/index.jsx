import React from 'react'
import { Stack, Typography } from '@mui/material'
import convertTime from '../../utils/convertTime'

const Statistics = ({ videos, selected }) => {
  const getTotalDuration = () => {
    const total = selected.reduce((acc, videoId) =>
      acc + videos[videoId - 1].duration, 0)
    return convertTime(total)
  }
  return (
    <Stack>
      <Typography variant="h5">Общая продолжительность видео: {getTotalDuration()}</Typography>
    </Stack>
  )
}

export default Statistics
