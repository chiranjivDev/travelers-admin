'use client';

import { useSearchParams } from 'next/navigation';

const PaymentAuthorized = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const paymentIntentId = searchParams.get('paymentIntentId');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Payment Authorized!
        </h1>
        <p className="text-gray-700 mt-2">
          Your payment of <strong>${amount}</strong> has been authorized
          successfully.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Payment Intent ID:{' '}
          <span className="font-mono text-xs">{paymentIntentId}</span>
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentAuthorized;
