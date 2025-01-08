'use client'

import { useEffect, useRef, useState } from 'react'
import { useSimpleChat } from '@/contexts/SimpleChatContext'
import { FiSend, FiPackage, FiMapPin, FiPaperclip, FiInfo, FiUser } from 'react-icons/fi'
import PackageDetails from './PackageDetails'
import NegotiationPanel from './NegotiationPanel'
import { NotificationProvider, useNotifications } from './NotificationSystem'
import UserSelector from './UserSelector'

function ChatMessage({ message, isOwn, currentUser }: { message: Message; isOwn: boolean; currentUser: User | null }) {
  const messageClass = isOwn ? 'ml-auto bg-blue-600' : 'mr-auto bg-gray-700'

  if (message.type === 'package') {
    return (
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1 text-center">
          Package Information Shared
        </div>
        {message.metadata && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Package Details</h3>
            <div className="space-y-2">
              <p>ID: {message.metadata.id}</p>
              <p>Route: {message.metadata.route}</p>
              <p>Price: ${message.metadata.price}</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`mb-4 max-w-[80%] ${isOwn ? 'ml-auto' : 'mr-auto'}`}>
      <div className={`rounded-xl px-4 py-2 ${messageClass}`}>
        <div className="text-white">{message.content}</div>
      </div>
      <div className={`text-xs text-gray-400 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
        {new Date(message.timestamp).toLocaleTimeString()}
        {isOwn && (
          <span className="ml-2">
            {message.status === 'sent' && '✓'}
            {message.status === 'delivered' && '✓✓'}
            {message.status === 'read' && '✓✓'}
          </span>
        )}
      </div>
    </div>
  )
}

export default function SimpleChat() {
  const {
    messages,
    currentUser,
    otherUser,
    activePackage,
    sendMessage,
    setUserTyping,
    markMessageAsRead,
    setCurrentUser
  } = useSimpleChat()

  const [input, setInput] = useState('')
  const [showPackageDetails, setShowPackageDetails] = useState(false)
  const [showNegotiation, setShowNegotiation] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { addNotification } = useNotifications()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (currentUser && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      messages.forEach(message => {
        if (message.senderId !== currentUser.id && message.status !== 'read') {
          markMessageAsRead(message.id)
        }
      })
    }
  }, [currentUser, messages, markMessageAsRead])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    sendMessage(input.trim())
    setInput('')
    inputRef.current?.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setUserTyping(true)

    const timeoutId = setTimeout(() => {
      setUserTyping(false)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }

  const handleUserSelect = (user: User) => {
    setCurrentUser(user)
    addNotification({
      type: 'alert',
      title: 'Welcome!',
      message: `You've joined as ${user.role === 'sender' ? 'a Sender' : 'a Traveler'}`,
      action: () => console.log('View profile')
    })
  }

  if (!currentUser) {
    return <UserSelector onSelect={handleUserSelect} />
  }

  if (!otherUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Chat Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={otherUser.avatar}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          <div>
            <div className="text-white font-medium">{otherUser.name}</div>
            <div className="text-sm text-gray-400">
              {otherUser.isTyping ? 'Typing...' : otherUser.status}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPackageDetails(prev => !prev)}
            className="text-gray-400 hover:text-white transition-colors"
            title="View Package Details"
          >
            <FiPackage className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowNegotiation(prev => !prev)}
            className="text-gray-400 hover:text-white transition-colors"
            title="View Profile"
          >
            <FiUser className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showPackageDetails && activePackage && (
          <PackageDetails
            onClose={() => setShowPackageDetails(false)}
          />
        )}
        
        {showNegotiation && (
          <NegotiationPanel
            onClose={() => setShowNegotiation(false)}
          />
        )}

        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUser.id}
            currentUser={currentUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowPackageDetails(true)}
            className="text-gray-400 hover:text-white transition-colors"
            title="Share Package"
          >
            <FiPackage className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-white transition-colors"
            title="Share Location"
          >
            <FiMapPin className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-white transition-colors"
            title="Attach File"
          >
            <FiPaperclip className="w-6 h-6" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
