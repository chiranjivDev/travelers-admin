'use client';

import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const CheckoutPage = ({ amount, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!amount || !orderId || clientSecret || hasFetched.current) return;
    hasFetched.current = true;
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}transactions/create-intent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount,
              currency: 'usd',
              orderId: orderId,
            }),
          },
        );

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };
    fetchClientSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      },
    );

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    } else {
      router.push(
        `/payment-authorized?amount=${amount}&paymentIntentId=${paymentIntent.id}`,
      );
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <p>Loading payment details...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {clientSecret && (
        <>
          <CardElement />
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Processing...' : `Pay $${amount}`}
          </button>
        </>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};
