import languages from '../language'

export default function convertTime (sec, lang) {
  const getLetter = (type) => languages[lang].time[type]

  const days = Math.floor(sec / 86400)
  const hours = Math.floor(sec / 3600) % 24
  const minutes = Math.floor(sec / 60) % 60
  const seconds = sec % 60
  return (days > 0 ? days + `${getLetter('d')} ` : '') +
    (hours > 0 ? hours + `${getLetter('h')} ` : '') +
    (minutes > 0 ? minutes + `${getLetter('m')} ` : '') +
    (seconds > 0 ? seconds + `${getLetter('s')} ` : '')
}
