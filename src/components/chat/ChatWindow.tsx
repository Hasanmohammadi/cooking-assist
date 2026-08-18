import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageBubble } from './MessageBubble'
import type { ChatMessage } from '@/types/chat'
import { WifiOff } from 'lucide-react'

interface Props {
  messages: ChatMessage[]
  isOnline: boolean
}

export function ChatWindow({ messages, isOnline }: Props) {
  const { t } = useTranslation()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {!isOnline && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          <WifiOff className="h-3.5 w-3.5 shrink-0" />
          <span>{t('chat.offline')}</span>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
          {t('chat.empty')}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
