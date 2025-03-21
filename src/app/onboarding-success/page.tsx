// 'use client';

// import { useRouter } from 'next/navigation';

// const OnboardingSuccess = () => {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold text-white text-center">
//           Stripe Account Connected!
//         </h2>
//         <p className="text-sm text-gray-400 text-center mt-1">
//           Your Stripe account has been successfully connected. You can now start
//           receiving payments.
//         </p>

//         <div className="mt-6">
//           <button
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//             onClick={() => router.push('/')}
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingSuccess;

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const OnboardingSuccess = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  console.log('userId', userId);

  // fetch user from localstorage

  useEffect(() => {
    // Access localStorage only in useEffect to prevent SSR issues
    const userFromLocalStorage =
      typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    console.log('user from local storage', userFromLocalStorage);

    if (userFromLocalStorage) {
      try {
        const user = JSON.parse(userFromLocalStorage);
        console.log('user', user);
        setUserId(user?.userId || null);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('inside use effect');

    const checkOnboardingStatus = async () => {
      try {
        console.log('userid inside effect', userId);
        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}transactions/check-onboarding-status`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          },
        );

        const data = await response.json();

        if (data.isOnboarded) {
          setIsOnboarded(true);
        } else {
          // router.push('/stripe-connect'); // Redirect back to onboarding if not completed
          console.log('not onboarded');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        // router.push('/'); // Redirect if API call fails
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Checking onboarding status...
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        User ID not found! Redirecting...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white text-center">
          {isOnboarded ? 'Stripe Account Connected!' : 'Redirecting...'}
        </h2>
        {isOnboarded && (
          <>
            <p className="text-sm text-gray-400 text-center mt-1">
              Your Stripe account has been successfully connected. You can now
              start receiving payments.
            </p>
            <div className="mt-6">
              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                onClick={() => router.push('/')}
              >
                Go to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OnboardingSuccess;
