export default function convertTime (sec) {
  const days = Math.floor(sec / 86400)
  const hours = Math.floor(sec / 3600) % 24
  const minutes = Math.floor(sec / 60) % 60
  const seconds = sec % 60
  return `${days > 0 ? `${days}д ` : ''}${hours > 0 ? `${hours}ч ` : ''}${minutes}м ${seconds}с`
}
