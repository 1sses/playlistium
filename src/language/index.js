const languages = {
  ru: {
    alert: {
      error: 'Ошибка',
      warning: 'Предупреждение',
      missingAPIkeyWarn: 'Отсутствует API-ключ! Введите его в настройках, чтобы пользоваться приложением!',
      missingPlaylistLink: 'Введите ссылку на плейлист!',
      missingAPIkeyErr: 'Отсутствует API-ключ! Введите его в настройках.'
    },
    languageSwitcher: {
      tooltip: 'Переключатель языка'
    },
    search: {
      field: 'Ссылка на плейлист',
      button: 'Поиск'
    },
    settings: {
      title: 'Настройки',
      apiKeyField: 'Ключ API',
      howToGetAPIkey: 'Как получить ключ?'
    },
    statistics: {
      totalDuration: 'Общая продолжительность видео:'
    },
    tutorial: {
      title: 'Как пользоваться приложением?',
      text: `Привет! Если вы читаете это, значит вы попали в <strong>Playlistium<strong>.
        Это приложение создано на базе <em>YouTube API</em> и ищет плейлист из YouTube по ссылке, введенную в специальное поле.
        К сожалению, из-за политики YouTube сервис построен так, что вам нужно использовать собственный API ключ (ключ доступа) для получения информации о плейлисте. Если вы не знаете, как получить ключ, в настройках есть ссылка, как сделать это. Не волнуйтесь, это не сложно.
        После нажатия на кнопку "Поиск" приложение получает информацию о плейлисте и показывает его в таблице. Вы можете просматривать видео в плейлисте через удобный интерфейс, переключаясь по таблице при помощи навигации внизу.
        Нажав на определенное видео, вы добавите его в список выбранных, на это укажет изменение цвета строки и вида переключателя. Чтобы выбрать все видео, нажмите на самый верхний флаг в таблице, и ещё раз, чтобы отменить выбор всех видео.
        Ниже после таблицы вы можете просмотреть длительность всех выбранных видео.
        На этом всё, спасибо что используете этот сайт!😊`,
      gotItButton: 'Понятно!',
      here: 'здесь'
    },
    videos: {
      id: 'Номер',
      title: 'Название',
      duration: 'Длительность',
      selectedCount: 'видео выбрано',
      tableTitle: 'Видео из плейлиста',
      filter: 'Фильтрация'
    },
    time: {
      s: 'с',
      m: 'м',
      h: 'ч',
      d: 'д'
    }
  },
  en: {
    alert: {
      error: 'Error',
      warning: 'Warning',
      missingAPIkey: 'The API key is missing! Enter it in the settings to use the app!',
      missingPlaylistLink: 'Enter the link to the playlist!',
      missingAPIkeyErr: 'Missing API key! Enter it in the settings.'
    },
    languageSwitcher: {
      tooltip: 'Language switcher'
    },
    search: {
      field: 'Playlist link',
      button: 'Search'
    },
    settings: {
      title: 'Settings',
      apiKeyField: 'API key',
      howToGetAPIkey: 'How to get a key?'
    },
    statistics: {
      totalDuration: 'Total video duration:'
    },
    tutorial: {
      title: 'How to use the app?',
      text: `Hi! If you are reading this, then you have got into <strong>Playlistium<strong>.
        This application is based on the <em>YouTube API</em> and searches for a playlist from YouTube by a link entered a special field.
        Unfortunately, due to YouTube's policy, the service is built in such a way that you need to use your own API key (access key) to get information about the playlist. If you don't know how to get the key, there is a link in the settings how to do it. Don't worry, it's not difficult.
        After clicking on the "Search" button, the application receives information about the playlist and shows it in the table. You can view videos in a playlist through a user-friendly interface by switching through the table using the navigation at the bottom.
        By clicking on a certain video, you will add it to the list of selected ones, this will be indicated by changing the color of the line and the type of switch. To select all videos, click on the topmost flag in the table, and again to deselect all videos.
        Below, after the table, you can view the duration of all selected videos.
        That's it, thank you for using this site!😊`,
      gotItButton: 'Got it!',
      here: 'is here'
    },
    videos: {
      id: 'Number',
      title: 'Title',
      duration: 'Duration',
      selectedCount: 'videos selected',
      tableTitle: 'Video from the playlist',
      filter: 'Filter'
    },
    time: {
      s: 's',
      m: 'm',
      h: 'h',
      d: 'd'
    }
  }
}

export default languages
