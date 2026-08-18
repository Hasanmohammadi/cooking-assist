import { useEffect, useState } from 'react'
import { Network } from '@capacitor/network'

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    let removeListener: (() => void) | undefined

    Network.getStatus().then((status) => setIsOnline(status.connected))

    Network.addListener('networkStatusChange', (status) => {
      setIsOnline(status.connected)
    }).then((handle) => {
      removeListener = () => handle.remove()
    })

    return () => removeListener?.()
  }, [])

  return isOnline
}
