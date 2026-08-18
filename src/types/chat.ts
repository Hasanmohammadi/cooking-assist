export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  createdAt: number
  pending?: boolean
  error?: boolean
}

export interface SendMessagePayload {
  conversationId: string
  message: string
  history: ChatMessage[]
}

export interface SendMessageResponse {
  reply: string
}
