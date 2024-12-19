'use client'

import { createContext, useContext, useState } from 'react'

type ToastType = 'success' | 'error' | 'info'

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showToast = (message: string, type: ToastType) => {
    // We'll implement the actual toast functionality later
    console.log(`${type}: ${message}`)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
} 