'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatLayout from '@/components/chat/ChatLayout';
import { getSocket } from '@/lib/socket';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrdersState } from '../sender/dashboard/redux/orderSlice';

export default function ChatPage() {
  const { createOrderSuccess, order } = useSelector((state) => state.order);
  const searchParams = useSearchParams();
  const userId = searchParams.get('user');
  const travelerPkgIdFromQuery = searchParams.get('travelerPkgId');
  const senderPkgIdFromQuery = searchParams.get('senderPkgId');
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.emit('get_my_rooms');
    }
  }, []);

  const handleStartConversation = () => {
    const socket = getSocket();
    if (socket && userId) {
      socket.emit(
        'private_message',
        JSON.stringify({
          receiverId: userId,
          message: 'Hi',
          senderPkgId: senderPkgIdFromQuery,
          travelerPkgId: travelerPkgIdFromQuery,
        }),
      );
      setShowModal(false);
    }
  };

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (createOrderSuccess) {
      router.push(
        `/payment?amount=${order?.amount}&orderId=${order?.order_id}`,
      );
      dispatch(clearOrdersState());
    }
  }, [createOrderSuccess]);

  return (
    <>
      <AnimatePresence>
        {showModal && userId && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center max-w-sm w-full"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Start a Conversation
              </h2>
              <p className="text-gray-600 mb-5">
                Would you like to send a greeting to begin the chat?
              </p>

              <div className="flex justify-center gap-4">
                <motion.button
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartConversation}
                >
                  Start Chat
                </motion.button>

                <motion.button
                  className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ChatLayout />
    </>
  );
}
