'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [message, setMessage] = useState('Verifying your email...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verifyToken(token);
    } else {
      setMessage('Invalid or missing token.');
      setIsLoading(false);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  }, [token]);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/verify-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to verify email');
      }

      const data = await response.json();
      setMessage(data.message);
      setIsLoading(false);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      setMessage(
        error?.message || 'Verification failed. Please try again later.'
      );
      setIsLoading(false);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      {isLoading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <p className="text-lg">{message}</p>
      )}
    </div>
  );
};

export default VerifyPage;
