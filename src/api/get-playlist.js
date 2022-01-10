import { baseUrl } from './config'
import axios from 'axios'

export const getPlaylist = async (link, key) => {
  const config = {
    method: 'post',
    data: { link, key },
    url: `${baseUrl}/get-playlist`,
    withCredentials: true
  }
  const response = await axios(config)
  return response.data
}
