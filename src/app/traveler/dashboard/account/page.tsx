'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const TravelerAccount = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-black text-white gap-5">
      <h1 className="text-4xl font-bold mb-3">
        Your payouts will be displayed here.
      </h1>
      <p className="text-md text-gray-400 mb-6">
        You haven't received any payouts yet. Complete a journey as a traveler
        and successfully deliver a package to receive your payment.
      </p>

      {!showForm ? (
        <motion.button
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
        >
          Add Bank Account
        </motion.button>
      ) : (
        <motion.div
          className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Bank Account Details</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Account Holder Name"
              className="p-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-white"
            />
            <input
              type="text"
              placeholder="Bank Name"
              className="p-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-white"
            />
            <input
              type="text"
              placeholder="Account Number"
              className="p-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-white"
            />
            <input
              type="text"
              placeholder="IFSC Code"
              className="p-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-white"
            />

            <div className="flex gap-4">
              <motion.button
                type="submit"
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Details
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
    </div>
  );
};

export default TravelerAccount;
