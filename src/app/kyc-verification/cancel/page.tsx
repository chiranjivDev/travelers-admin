'use client';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function KYCCancelled() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-black text-white gap-6">
      <XCircle className="text-red-500 w-16 h-16 mx-auto animate-pulse" />

      <h1 className="text-4xl font-bold mb-3 text-red-400">
        KYC Verification Cancelled
      </h1>

      <p className="text-md text-gray-400 mb-6">
        Your KYC verification was not completed. Please try again to gain full
        access to our platform.
      </p>

      <motion.button
        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/kyc-verification')}
      >
        Retry Verification
      </motion.button>
    </div>
  );
}
