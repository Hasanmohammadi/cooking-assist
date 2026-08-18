import axios from 'axios'
import { useSettingsStore } from '@/store/settingsStore'

export const apiClient = axios.create({
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// آدرس بک‌اند رو همیشه لحظه‌ی درخواست از تنظیمات می‌خونه،
// چون ممکنه کاربر توی صفحه تنظیمات عوضش کرده باشه.
apiClient.interceptors.request.use((config) => {
  const endpoint = useSettingsStore.getState().apiEndpoint
  if (endpoint) {
    config.baseURL = endpoint
  }
  return config
})
