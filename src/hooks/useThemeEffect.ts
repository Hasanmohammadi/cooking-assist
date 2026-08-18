import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { useSettingsStore } from '@/store/settingsStore'

export function useThemeEffect() {
  const theme = useSettingsStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches)
      root.classList.toggle('dark', isDark)

      if (Capacitor.isNativePlatform()) {
        StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light }).catch(() => {})
      }
    }

    applyTheme()

    if (theme === 'system') {
      mediaQuery.addEventListener('change', applyTheme)
      return () => mediaQuery.removeEventListener('change', applyTheme)
    }
  }, [theme])
}
