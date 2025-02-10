'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '0.00';

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto animate-bounce" />
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Thank you for your payment of{' '}
          <span className="font-bold text-blue-600">${amount}</span>.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
