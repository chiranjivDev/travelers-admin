'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
  fileName?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

interface ChatContextType {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  users: ChatUser[];
  setActiveConversation: (conversation: Conversation) => void;
  sendMessage: (content: string, type?: 'text' | 'file' | 'image') => void;
  markAsRead: (messageId: string) => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}
const mockUsers: ChatUser[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    status: 'online',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000),
  },
];

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: ['1', '2'],
    unreadCount: 2,
    updatedAt: new Date(),
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: "Hi, I'm interested in delivering your package to Paris",
    timestamp: new Date(Date.now() - 3600000),
    status: 'read',
    type: 'text',
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: 'Great! When are you planning to travel?',
    timestamp: new Date(Date.now() - 3000000),
    status: 'read',
    type: 'text',
  },
];

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (
    content: string,
    type: 'text' | 'file' | 'image' = 'text',
  ) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '1',
      receiverId:
        activeConversation.participants.find((id) => id !== '1') || '',
      content,
      timestamp: new Date(),
      status: 'sent',
      type,
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg,
        ),
      );
    }, 1000);
  };

  const markAsRead = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, status: 'read' } : msg,
      ),
    );
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        users: mockUsers,
        setActiveConversation,
        sendMessage,
        markAsRead,
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
