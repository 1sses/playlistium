export default function getPaginationButtonTitles (type) {
  switch (type) {
    case 'first':
      return 'На первую страницу'
    case 'last':
      return 'На последнюю страницу'
    case 'previous':
      return 'На предыдущую страницу'
    case 'next':
      return 'На следующую страницу'
  }
}
