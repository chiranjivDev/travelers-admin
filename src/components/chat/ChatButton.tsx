'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiMessageCircle } from 'react-icons/fi'
import ChatPreview from './ChatPreview'

interface ChatButtonProps {
  userId: string
  userName: string
  userAvatar: string
  rating: number
  responseTime: string
  isOnline?: boolean
  lastActive?: string
  previewMessage?: string
  context?: 'package' | 'trip'
  contextId?: string
  className?: string
  showPreview?: boolean
}

export default function ChatButton({
  userId,
  userName,
  userAvatar,
  rating,
  responseTime,
  isOnline,
  lastActive,
  previewMessage,
  context,
  contextId,
  className = '',
  showPreview = true
}: ChatButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/chat?user=${userId}${context ? `&context=${context}&id=${contextId}` : ''}`)
  }

  const button = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
    >
      <FiMessageCircle className="w-5 h-5" />
      <span>Chat with {userName}</span>
    </motion.button>
  )

  if (!showPreview) {
    return button
  }

  return (
    <ChatPreview
      userId={userId}
      userName={userName}
      userAvatar={userAvatar}
      rating={rating}
      responseTime={responseTime}
      isOnline={isOnline}
      lastActive={lastActive}
      previewMessage={previewMessage}
    >
      {button}
    </ChatPreview>
  )
}
