import { createContext, useContext } from 'react'

export const AdminContext = createContext(null)
export const useAdmin = () => useContext(AdminContext)

export const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })
    : ''
