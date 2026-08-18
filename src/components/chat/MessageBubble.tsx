import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/types/chat'
import { useTranslation } from 'react-i18next'

interface Props {
  message: ChatMessage
}

export function MessageBubble({ message }: Props) {
  const { t } = useTranslation()
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex w-full', isUser ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-ss-sm'
            : 'bg-secondary text-secondary-foreground rounded-se-sm',
          message.error && 'bg-destructive/10 text-destructive'
        )}
      >
        {message.pending ? (
          <span className="text-muted-foreground animate-pulse">{t('chat.typing')}</span>
        ) : message.error ? (
          <p>{t('chat.error')}</p>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  )
}
