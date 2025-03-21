'use client';
import { useState } from 'react';

export default function ConnectStripe() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}transactions/create-stripe-connect`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        },
      );
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating Stripe account.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white text-center">
          Connect Your Stripe Account
        </h2>
        <p className="text-sm text-gray-400 text-center mt-1">
          Securely receive payments via Stripe.
        </p>

        <div className="mt-4">
          <label className="text-sm text-gray-300">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Create Stripe Account'}
        </button>
      </div>
    </div>
  );
}
