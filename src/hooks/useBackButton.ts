import { useEffect } from 'react'
import { App as CapacitorApp } from '@capacitor/app'
import { useNavigate, useLocation } from 'react-router-dom'

export function useBackButton() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const listenerPromise = CapacitorApp.addListener('backButton', () => {
      if (location.pathname !== '/') {
        navigate(-1)
      } else {
        CapacitorApp.exitApp()
      }
    })

    return () => {
      listenerPromise.then((handle) => handle.remove())
    }
  }, [location, navigate])
}
