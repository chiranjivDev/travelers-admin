'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function KYCVerification() {
  const [clientId, setClientId] = useState('');
  const [token, setToken] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { user } = useAuth();

  const createClient = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !firstName || !lastName) {
      alert('Please fill in all fields.');
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}complycube/create-client`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.userId,
          email,
          firstName,
          lastName,
        }),
      },
    );

    const data = await response.json();
    if (data.id) {
      setClientId(data.id);
      setShowForm(false);
    }
  };

  const generateToken = async (clientId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}complycube/generate-token/${clientId}`,
    );
    const data = await response.json();
    setToken(data.token);
  };

  const startKYCVerification = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}complycube/create-session/${clientId}`,
    );
    const data = await response.json();
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-black text-white gap-5">
      <h1 className="text-4xl font-bold mb-3">Verify Your Identity</h1>
      <p className="text-md text-gray-400 mb-6">
        We require KYC to ensure security and compliance. It only takes a few
        minutes!
      </p>

      {/* Show form */}
      {!showForm && !clientId && (
        <motion.button
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
        >
          Start Verification
        </motion.button>
      )}

      {/* Form */}
      {showForm && !clientId && (
        <motion.div
          className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Enter Your Details</h2>
          <form className="flex flex-col gap-4" onSubmit={createClient}>
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="First Name"
              className="p-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <div className="flex gap-4">
              <motion.button
                type="submit"
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save
              </motion.button>

              <motion.button
                type="button"
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Redirect to complyCube for uploading docs */}
      {clientId && (
        <motion.button
          onClick={startKYCVerification}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start uploading your documents
        </motion.button>
      )}
    </div>
  );
}
