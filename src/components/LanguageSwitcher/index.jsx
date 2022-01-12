import React, { useContext } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import TranslateIcon from '@mui/icons-material/Translate'
import { LanguageContext } from '../../context/language'
import languages from '../../language'

const actions = [
  { icon: 'ru', name: '' },
  { icon: 'en', name: '' }
]

const LanguageSwitcher = () => {
  const language = useContext(LanguageContext)

  const switchLanguage = (e) => {
    language.set(e.target.innerText.toLowerCase())
  }

  return (
    <SpeedDial
      ariaLabel={languages[language.current].languageSwitcher.tooltip}
      direction="left"
      icon={<TranslateIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.icon}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={switchLanguage}
        />
      ))}
    </SpeedDial>
  )
}

export default LanguageSwitcher
