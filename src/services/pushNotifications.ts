import { PushNotifications } from '@capacitor/push-notifications'

/**
 * فعلاً اختیاریه (طبق تصمیمی که گرفتیم). این تابع رو هروقت خواستی
 * push notification رو فعال کنی صدا بزن (مثلاً از یه دکمه توی تنظیمات).
 */
export async function registerPushNotifications() {
  const permission = await PushNotifications.requestPermissions()
  if (permission.receive !== 'granted') {
    return false
  }

  await PushNotifications.register()

  PushNotifications.addListener('registration', (token) => {
    // TODO: این token رو به بک‌اند خودت بفرست تا بتونی بعداً پوش بفرستی.
    console.log('Push registration token:', token.value)
  })

  PushNotifications.addListener('registrationError', (err) => {
    console.error('Push registration error:', err)
  })

  return true
}
