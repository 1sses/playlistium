import { createContext, useState } from 'react'

export const LanguageContext = createContext('en')

export default function useCreateLanguage () {
  const [language, setLanguage] = useState(localStorage.getItem('language') ?? 'en')
  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }
  return { current: language, set: changeLanguage }
}
