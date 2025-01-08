'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat, Message } from '@/contexts/ChatContext'
import { 
  FiSend,
  FiPaperclip,
  FiImage,
  FiMoreVertical,
  FiCheck,
  FiCheckCircle,
  FiMessageCircle
} from 'react-icons/fi'

function MessageBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isOwn 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-700 text-gray-200'
        }`}>
          {message.content}
        </div>
        <div className={`flex items-center mt-1 text-xs text-gray-400 ${
          isOwn ? 'justify-end' : 'justify-start'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
          {isOwn && (
            <span className="ml-2 flex items-center">
              {message.status === 'sent' && <FiCheck className="w-3 h-3" />}
              {message.status === 'delivered' && (
                <div className="flex">
                  <FiCheck className="w-3 h-3" />
                  <FiCheck className="w-3 h-3 -ml-1" />
                </div>
              )}
              {message.status === 'read' && <FiCheckCircle className="w-3 h-3 text-blue-400" />}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function ChatWindow() {
  const { activeConversation, messages, users, sendMessage, isTyping, setIsTyping } = useChat()
  const [newMessage, setNewMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const otherUser = activeConversation
    ? users.find(user => 
        activeConversation.participants.includes(user.id) && user.id !== '1'
      )
    : null

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulate file upload
      const reader = new FileReader()
      reader.onload = () => {
        sendMessage(file.name, file.type.startsWith('image/') ? 'image' : 'file')
      }
      reader.readAsDataURL(file)
    }
  }

  if (!activeConversation || !otherUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="text-center text-gray-400">
          <FiMessageCircle className="w-12 h-12 mx-auto mb-4" />
          <p>Select a conversation to start chatting</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={otherUser.avatar}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full"
            />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
              otherUser.status === 'online' 
                ? 'bg-green-500' 
                : 'bg-gray-500'
            }`} />
          </div>
          <div>
            <h3 className="font-medium text-white">{otherUser.name}</h3>
            <p className="text-sm text-gray-400">
              {otherUser.status === 'online' 
                ? 'Online' 
                : `Last seen ${
                    otherUser.lastSeen 
                      ? new Date(otherUser.lastSeen).toLocaleTimeString() 
                      : 'recently'
                  }`
              }
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <FiMoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === '1'}
          />
        ))}
        {isTyping && (
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
            <span className="ml-2">{otherUser.name} is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-300"
          >
            <FiPaperclip className="w-5 h-5" />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-300"
          >
            <FiImage className="w-5 h-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx"
          />
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
              rows={1}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
          >
            <FiSend className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
