export default function convertTime (sec) {
  const time = new Date(sec * 1000)
  const hours = time.getUTCHours()
  const minutes = time.getUTCMinutes()
  const seconds = time.getUTCSeconds()
  return `${hours > 0 ? `${hours}ч ` : ''}${minutes}м ${seconds}с`
}
