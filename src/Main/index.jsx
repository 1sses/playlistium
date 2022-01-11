import React, { useContext, useState } from 'react'
import { Box, Container, LinearProgress, Paper, Typography } from '@mui/material'
import Search from '../components/Search'
import Videos from '../components/Videos'
import Settings from '../components/Settings'
import Statistics from '../components/Statistics'
import AlertComponent from '../components/Alert'
import { AlertContext } from '../context/alert'
import { getPlaylist } from '../api/get-playlist'

const Main = () => {
  const [link, setLink] = useState('')
  const [apiKey, setApiKey] = useState(localStorage.getItem('apikey') || '')
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])
  const [selected, setSelected] = useState([])
  const alert = useContext(AlertContext)
  const switchLoading = (value) => setLoading(value)

  const searchPlaylist = async (link, key) => {
    if (!link) {
      alert.show(
        'error',
        'Ошибка',
        'Введите ссылку на плейлист!'
      )
      return
    }
    if (!key) {
      alert.show(
        'error',
        'Ошибка',
        'Отсутствует API-ключ! Введите его в настройках.'
      )
      return
    }
    switchLoading(true)
    setVideos([])
    setSelected([])
    const res = await getPlaylist(link, key)
    if (res.error) {
      alert.show(
        'error',
        'Ошибка',
        res.error
      )
      switchLoading(false)
      return
    }
    setVideos(res.videos)
    switchLoading(false)
  }

  return (
    <Paper square sx={{ minHeight: '100vh', height: 'auto' }}>
      <Container>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h1" sx={{ fontSize: 32, position: 'absolute', left: 20 }}>Playlistium</Typography>
          <Search link={link} setLink={setLink} apiKey={apiKey} searchPlaylist={searchPlaylist}/>
          {loading && <LinearProgress sx={{ mt: 4 }} />}
          {!loading && videos.length !== 0 && <Videos videos={videos} selected={selected} setSelected={setSelected} />}
          <Settings apiKey={apiKey} setApiKey={setApiKey} />
          {videos.length !== 0 && <Statistics videos={videos} selected={selected} />}
          <AlertComponent />
        </Box>
      </Container>
    </Paper>
  )
}

export default Main
