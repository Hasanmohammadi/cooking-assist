import { useMutation } from '@tanstack/react-query'
import { useChatStore } from '@/store/chatStore'
import { sendMessage } from '@/services/aiService'
import type { ChatMessage } from '@/types/chat'

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useChat() {
  const messages = useChatStore((s) => s.messages)
  const addMessage = useChatStore((s) => s.addMessage)
  const updateMessage = useChatStore((s) => s.updateMessage)

  const mutation = useMutation({
    mutationFn: sendMessage,
  })

  const submitMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: text,
      createdAt: Date.now(),
    }
    addMessage(userMessage)

    const assistantId = createId()
    addMessage({
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
      pending: true,
    })

    try {
      const result = await mutation.mutateAsync({
        conversationId: 'default',
        message: text,
        history: messages,
      })
      updateMessage(assistantId, { content: result.reply, pending: false })
    } catch {
      updateMessage(assistantId, { pending: false, error: true, content: '' })
    }
  }

  return {
    messages,
    submitMessage,
    isSending: mutation.isPending,
  }
}
