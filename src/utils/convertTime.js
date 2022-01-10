export default function convertTime (sec) {
  const time = new Date(sec * 1000)
  const diff = (time - new Date(0)) / 1000
  const hours = Math.floor(diff / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  const seconds = Math.floor(diff % 60)
  return `${hours > 0 ? `${hours}ч ` : ''}${minutes}м ${seconds}с`
}
