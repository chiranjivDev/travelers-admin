'use client';

import { ChatProvider } from '@/contexts/ChatContext';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

export default function ChatLayout() {
  return (
    <ChatProvider>
      <div className="flex h-[85vh] bg-gray-900">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
