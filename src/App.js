import React, { useState } from 'react'
import { Box, Container, createTheme, LinearProgress, Paper, ThemeProvider, Typography } from '@mui/material'
import Search from './components/Search'
import Videos from './components/Videos'
import { getPlaylist } from './api/get-playlist'
import Settings from './components/Settings'
import Statistics from './components/Statistics'

const theme = createTheme({ palette: { mode: 'dark' } })

const App = () => {
  const [link, setLink] = useState('')
  const [apiKey, setApiKey] = useState(localStorage.getItem('apikey') || '')
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])
  const [selected, setSelected] = useState([])
  const switchLoading = (value) => setLoading(value)

  const searchPlaylist = async (link, key) => {
    switchLoading(true)
    const res = await getPlaylist(link, key)
    setVideos(res.videos.map(video => ({
      ...video,
      isSelected: false
    })))
    switchLoading(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper square sx={{ minHeight: '100vh', height: 'auto' }}>
        <Container>
          <Box sx={{ padding: 4 }}>
            <Typography variant="h1" sx={{ fontSize: 32, position: 'absolute', left: 20 }}>Playlistium</Typography>
            <Search link={link} setLink={setLink} apiKey={apiKey} searchPlaylist={searchPlaylist}/>
            {loading && <LinearProgress sx={{ mt: 4 }} />}
            {!loading && videos.length !== 0 && <Videos videos={videos} selected={selected} setSelected={setSelected} />}
            <Settings apiKey={apiKey} setApiKey={setApiKey} />
            {videos.length !== 0 && <Statistics videos={videos} selected={selected} />}
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  )
}

export default App
