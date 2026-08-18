import { apiClient } from '@/lib/axiosClient'
import { useSettingsStore } from '@/store/settingsStore'
import type { SendMessagePayload, SendMessageResponse } from '@/types/chat'

/**
 * نکته مهم امنیتی:
 * این سرویس هرگز نباید مستقیم به OpenAI/Anthropic/... با API key وصل بشه،
 * چون کلید داخل اپ موبایل قابل استخراجه. همیشه از طریق یه بک‌اند واسط
 * (که کلید اونجا امنه) درخواست می‌فرسته.
 *
 * فعلاً چون بک‌اند هنوز وصل نشده (apiEndpoint خالیه)، یه پاسخ نمونه
 * برمی‌گردونه تا رابط کاربری قابل تست باشه.
 */
export async function sendMessage(payload: SendMessagePayload): Promise<SendMessageResponse> {
  const endpoint = useSettingsStore.getState().apiEndpoint

  if (!endpoint) {
    return mockReply(payload.message)
  }

  const { data } = await apiClient.post<SendMessageResponse>('/chat', payload)
  return data
}

async function mockReply(message: string): Promise<SendMessageResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return {
    reply: `(پاسخ نمونه — بک‌اند هنوز وصل نشده)\nپیام تو: «${message}»`,
  }
}
