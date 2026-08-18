import { Routes, Route } from 'react-router-dom'
import { ChatPage } from '@/pages/ChatPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { useThemeEffect } from '@/hooks/useThemeEffect'
import { useBackButton } from '@/hooks/useBackButton'

export default function App() {
  useThemeEffect()
  useBackButton()

  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}
