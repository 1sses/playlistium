import React, { createContext, useState } from 'react'

export const AlertContext = createContext({})

export const AlertContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('success')
  const [header, setHeader] = useState('')
  const [message, setMessage] = useState('')
  const show = (type, header, message) => {
    setVisible(true)
    setType(type)
    setHeader(header)
    setMessage(message)
  }
  const close = () => setVisible(false)
  return (
    <AlertContext.Provider value={{
      show,
      close,
      visible,
      type,
      header,
      message
    }}>
      {children}
    </AlertContext.Provider>
  )
}
