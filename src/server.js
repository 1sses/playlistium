require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const axios = require('axios')

async function errorMiddleware (ctx, next) {
  try {
    await next()
  } catch (error) {
    console.log(error.response.data.error)
    ctx.body = { error: checkError(error.response.data.error) }
  }
}

// дописать случай для видео длительности больше суток
const converter = (time) => {
  if (time.includes('PT')) {
    let hours = 0; let minutes = 0; let seconds = 0
    const formatted = time.replace('PT', '')
    // проверка часов
    if (formatted.includes('H')) {
      hours = +formatted.split('H')[0]
    }
    // проверка минут
    if (formatted.includes('M')) {
      const buffer = formatted.split('M')[0]
      if (buffer.includes('H')) {
        minutes = +buffer.split('H')[1]
      } else {
        minutes = +buffer
      }
    }
    // проверка секунд
    if (formatted.includes('S')) {
      const buffer = formatted.split('S')[0]
      if (buffer.includes('M')) {
        seconds = +buffer.split('M')[1]
      } else if (buffer.includes('H')) {
        seconds = +buffer.split('H')[1]
      } else {
        seconds = +buffer
      }
    }
    return hours * 3600 + minutes * 60 + seconds
  }
}

function checkError (data) {
  switch (data.errors[0].reason) {
    case 'playlistNotFound':
      return 'Плейлист не найден!'
    case 'badRequest':
      return 'Недействительный API-ключ!'
    default:
      return 'Что-то пошло не так...'
  }
}

async function getPlaylist (ctx) {
  const { link, key } = ctx.request.body
  const playlistId = link.split('=')[1]
  const videos = []
  let currentIndex = 1
  let pageToken = ''
  do {
    const playlistResponse = await axios.get(
      'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50' +
      `&playlistId=${playlistId}` +
      `&key=${key}` +
      `&pageToken=${pageToken}`)
    pageToken = playlistResponse.data.nextPageToken ?? ''
    const videoIds = playlistResponse.data.items.map(item => item.snippet.resourceId.videoId)
    const videosResponse = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails' +
      `&id=${videoIds.join(',')}` +
      `&key=${key}`)
    videosResponse.data.items.forEach(item => {
      videos.push({
        id: currentIndex++,
        title: item.snippet.title,
        duration: converter(item.contentDetails.duration)
      })
    })
  } while (pageToken)
  ctx.body = { videos }
}

const router = new Router()
router.post('/get-playlist', getPlaylist)

const app = new Koa()
app.use(bodyParser())
app.use(errorMiddleware)
app.use(cors({ credentials: true, exposeHeaders: '*' }))
app.use(router.routes())

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}`))
