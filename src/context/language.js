import React, { createContext, useState } from 'react'

export const LanguageContext = createContext({})

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') ?? 'en')
  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }
  return (
    <LanguageContext.Provider value={{ current: language, set: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
