'use client';

import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutPage } from './CheckoutPage';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const amount = parseFloat(searchParams.get('amount')) || 0;
  const orderId = searchParams.get('orderId');

  if (!amount || !orderId) {
    return <p className="text-center text-red-500">Invalid payment details.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Secure Payment
        </h2>
        <p className="text-lg text-gray-600 mb-2">You're about to pay:</p>
        <p className="text-3xl font-bold text-blue-600">${amount.toFixed(2)}</p>

        <div className="mt-6">
          <Elements
            stripe={stripePromise}
            options={{
              mode: 'payment',
              amount: convertToSubcurrency(amount),
              currency: 'usd',
            }}
          >
            <CheckoutPage amount={amount} orderId={orderId} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
