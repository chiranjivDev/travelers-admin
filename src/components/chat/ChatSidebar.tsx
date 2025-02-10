'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat, Conversation, ChatUser } from '@/contexts/ChatContext';
import {
  FiSearch,
  FiMessageCircle,
  FiCircle,
  FiChevronDown,
  FiFilter,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_CHAT_MESSAGES } from '@/app/chat/redux/chatsAction';
import { useAuth } from '@/contexts/AuthContext';

// Previous Implementation
function ConversationItem({
  conversation,
  isActive,
  onClick,
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  // const { users } = useChat();
  // console.log('users', users);
  // const otherUser = users.find(
  //   (user) => conversation.participants.includes(user.id) && user.id !== '1'
  // );

  const { user } = useAuth();
  console.log('user', user);

  const otherUser = conversation
    ? conversation.participants.find(
        (participant) => participant.id !== user?.userId
      )
    : null;

  if (!otherUser) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 cursor-pointer transition-colors ${
        isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={otherUser.avatar}
            alt={otherUser.name}
            className="w-12 h-12 rounded-full"
          />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
              otherUser.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3
              className={`font-medium truncate ${
                isActive ? 'text-white' : 'text-gray-200'
              }`}
            >
              {otherUser.name}
            </h3>
            {conversation.lastMessage && (
              <span
                className={`text-xs ${
                  isActive ? 'text-blue-200' : 'text-gray-400'
                }`}
              >
                {new Date(
                  conversation.lastMessage.timestamp
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>
          {conversation.lastMessage && (
            <p
              className={`text-sm truncate mt-1 ${
                isActive ? 'text-blue-200' : 'text-gray-400'
              }`}
            >
              {conversation.lastMessage.content}
            </p>
          )}
          {conversation.unreadCount > 0 && (
            <div className="mt-1 flex items-center space-x-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                {conversation.unreadCount} new
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ChatSidebar() {
  const { conversations, activeConversation, setActiveConversation } =
    useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'active'>('all');

  // const filteredConversations = conversations.filter((conversation) => {
  //   if (filter === 'unread' && conversation.unreadCount === 0) return false;
  //   if (filter === 'active' && !conversation.lastMessage) return false;
  //   return true;
  // });

  // fetch rooms list: cv
  const { chatList: filteredConversations } = useSelector(
    (state) => state.chats
  );
  console.log('chatList from slice', filteredConversations);
  const dispatch = useDispatch();

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <FiMessageCircle className="w-5 h-5 mr-2" />
          Messages
        </h2>
      </div>

      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-700 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Active
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={activeConversation?.id === conversation.id}
              // onClick={() => setActiveConversation(conversation)}
              onClick={() => {
                setActiveConversation(conversation);
                dispatch({
                  type: FETCH_CHAT_MESSAGES,
                  payload: {
                    roomId: conversation.id,
                  },
                });
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
