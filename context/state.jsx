/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useLoading from '../hooks/useLoading'

const AppContext = createContext()

export function AppWrapper({ children }) {

  const [scrollPosition, setScrollPosition] = useState(0)
  const [isExpanded, setIsExpanded] = useState(true)
  const router = useRouter()
  const [history, setHistory] = useState([router.asPath])
  const loading = useLoading()

  useEffect(() => {
    const handleRouteChange = url => {
      setHistory(history => [...history, url])
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <AppContext.Provider value={{ scrollPosition, setScrollPosition, isExpanded, setIsExpanded, history, loading }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
