import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { capacitorStorage } from '@/lib/capacitorStorage'
import type { ChatMessage } from '@/types/chat'

interface ChatState {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  updateMessage: (id: string, patch: Partial<ChatMessage>) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      updateMessage: (id, patch) =>
        set((state) => ({
          messages: state.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)),
        })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      // این ذخیره‌سازی همون چیزیه که امکان «آفلاین دیدن پیام‌های قبلی» رو می‌ده.
      name: 'cooking-assist-chat-history',
      storage: createJSONStorage(() => capacitorStorage),
    }
  )
)
