import { Preferences } from '@capacitor/preferences'
import type { StateStorage } from 'zustand/middleware'

/**
 * آداپتور ذخیره‌سازی برای Zustand persist middleware که به‌جای
 * localStorage از Capacitor Preferences استفاده می‌کنه (ذخیره‌ی
 * بومی روی گوشی، برای وب هم fallback به localStorage داره).
 */
export const capacitorStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const { value } = await Preferences.get({ key: name })
    return value ?? null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await Preferences.set({ key: name, value })
  },
  removeItem: async (name: string): Promise<void> => {
    await Preferences.remove({ key: name })
  },
}
