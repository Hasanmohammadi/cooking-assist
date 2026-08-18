import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import { useChat } from '@/hooks/useChat'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'

export function ChatPage() {
  const { t } = useTranslation()
  const { messages, submitMessage, isSending } = useChat()
  const isOnline = useNetworkStatus()

  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <h1 className="text-base font-semibold">{t('chat.title')}</h1>
        <Link
          to="/settings"
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label={t('nav.settings')}
        >
          <Settings className="h-5 w-5" />
        </Link>
      </header>

      <ChatWindow messages={messages} isOnline={isOnline} />
      <ChatInput onSend={submitMessage} disabled={isSending} />
    </div>
  )
}
