const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const axios = require('axios')

async function errorMiddleware (ctx, next) {
  try {
    await next()
  } catch (error) {
    console.log(error?.response?.data?.error || error.message)
    ctx.body = { error: checkError(error) }
  }
}

const converter = (time) => {
  const HMStoSeconds = (HMS) => {
    let hours = 0; let minutes = 0; let seconds = 0
    // проверка часов
    if (HMS.includes('H')) {
      hours = +HMS.split('H')[0]
    }
    // проверка минут
    if (HMS.includes('M')) {
      const buffer = HMS.split('M')[0]
      if (buffer.includes('H')) {
        minutes = +buffer.split('H')[1]
      } else {
        minutes = +buffer
      }
    }
    // проверка секунд
    if (HMS.includes('S')) {
      const buffer = HMS.split('S')[0]
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

  if (time.includes('PT')) {
    const hms = time.replace('PT', '')
    return HMStoSeconds(hms)
  } else {
    const splitted = time.replace('P', '').split('DT')
    return +splitted[0] * 86400 + HMStoSeconds(splitted[1])
  }
}

function checkError (error) {
  switch (error?.response?.data?.error?.errors[0]?.reason || error.message) {
    case 'badLink':
      return 'badLink'
    case 'badAPIkey':
      return 'badAPIkey'
    case 'playlistNotFound':
      return 'playlistNotFound'
    case 'badRequest':
      return 'invalidAPIkey'
    default:
      return 'otherError'
  }
}

function checkParams (link, key) {
  const linkRegexp = /^https:\/\/www\.youtube\.com\/playlist\?list=[-_0-9a-zA-Z]*$/
  const apiKeyRegexp = /^[-_0-9a-zA-Z]*$/ // is correct
  if (!linkRegexp.test(link)) {
    throw new Error('badLink')
  }
  if (!apiKeyRegexp.test(key)) {
    throw new Error('badAPIkey')
  }
}

async function getPlaylist (ctx) {
  const { link, key } = ctx.request.body
  checkParams(link, key)
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

const router = new Router({ prefix: '/api' })
router.post('/get-playlist', getPlaylist)

const app = new Koa()
app.use(bodyParser())
app.use(errorMiddleware)
app.use(cors({ credentials: true, exposeHeaders: '*' }))
app.use(router.routes())

app.listen(7000, () => console.log('Listening on port 7000'))
