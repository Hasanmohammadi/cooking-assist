import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

/**
 * فقط وقتی استفاده می‌شه که قابلیت «عکس گرفتن از غذا» یا اسکن اضافه بشه.
 * الان جایی صداش نمی‌زنیم، ولی سرویسش آماده‌ست.
 */
export async function takePhoto() {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 80,
  })
  return photo.webPath
}
