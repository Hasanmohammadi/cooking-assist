import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { capacitorStorage } from '@/lib/capacitorStorage'

export type ThemeMode = 'light' | 'dark' | 'system'

interface SettingsState {
  theme: ThemeMode
  language: string
  apiEndpoint: string
  setTheme: (theme: ThemeMode) => void
  setLanguage: (language: string) => void
  setApiEndpoint: (url: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'fa',
      // تا وقتی بک‌اند واقعی وصل نشده، خالی می‌مونه و از پاسخ نمونه استفاده می‌شه.
      apiEndpoint: '',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setApiEndpoint: (apiEndpoint) => set({ apiEndpoint }),
    }),
    {
      name: 'cooking-assist-settings',
      storage: createJSONStorage(() => capacitorStorage),
    }
  )
)
