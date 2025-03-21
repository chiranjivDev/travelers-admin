'use client';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function KYCSuccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-black text-white gap-6">
      <CheckCircle className="text-green-500 w-16 h-16 mx-auto animate-bounce" />

      <h1 className="text-4xl font-bold mb-3 text-green-400">
        KYC Verification Successful!
      </h1>

      <p className="text-md text-gray-400 mb-6">
        Your identity has been successfully verified. You can now enjoy full
        access to our platform.
      </p>

      <motion.button
        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/')}
      >
        Go to Home
      </motion.button>
    </div>
  );
}
