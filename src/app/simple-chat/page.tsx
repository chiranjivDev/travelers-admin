'use client'

import SimpleChat from '@/components/chat/SimpleChat'
import { SimpleChatProvider } from '@/contexts/SimpleChatContext'
import { NotificationProvider } from '@/components/chat/NotificationSystem'

export default function SimpleChatPage() {
  return (
    <NotificationProvider>
      <SimpleChatProvider>
        <SimpleChat />
      </SimpleChatProvider>
    </NotificationProvider>
  )
}
