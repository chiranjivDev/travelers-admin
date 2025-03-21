'use client';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useEffect, useState, useTransition } from 'react';
import { auth } from '../../../firebase';

interface PhoneVerificationProps {
  phoneNumber: string;
  onVerifySuccess: () => void;
  isVerified: boolean;
}

export default function PhoneVerification({
  phoneNumber,
  onVerifySuccess,
  isVerified,
}: PhoneVerificationProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState('');

  console.log('Phone Number', phoneNumber);

  //   Resend Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  //   Recaptcha Verifier
  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      { size: 'invisible' }
    );
    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  //   handle send otp
  const requestOTP = async (e) => {
    e.preventDefault();
    setResendCountdown(60);
    setIsLoading(true);

    startTransition(async () => {
      setError('');
      if (!recaptchaVerifier) {
        return setError('Recaptcha verifier is not initialized');
      }
    });

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      setConfirmationResult(confirmationResult);
      setSuccess('OTP sent successfully');
    } catch (err) {
      console.log(err);
      setResendCountdown(0);
      setError('Failed to send OTP');
    }
    setIsLoading(false);
  };

  //   handle verify OTP
  const handleVerifyOTP = async () => {
    startTransition(async () => {
      setError('');
      if (!confirmationResult) {
        setError('Please request OTP first');
        return;
      }
    });
    setIsLoading(true);
    try {
      await confirmationResult?.confirm(otp);
      onVerifySuccess(); // Notify parent component
    } catch (err) {
      console.log('Failed to verify OTP');
      setError('Failed to verify OTP. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md">
      <div id="recaptcha-container" />

      {!isVerified && phoneNumber.length >= 10 && (
        <>
          <div className="space-y-2">
            <button
              type="button"
              onClick={requestOTP}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-md transition-all disabled:bg-gray-700"
              disabled={isLoading}
            >
              {resendCountdown > 0
                ? `Resend OTP in ${resendCountdown}s`
                : isPending
                  ? 'Sending OTP...'
                  : 'Verify Phone Number'}
            </button>
          </div>

          {confirmationResult && (
            <div className="flex my-2 items-center gap-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-3/4 px-3 py-2 bg-gray-800 border text-sm border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={handleVerifyOTP}
                className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-all disabled:bg-gray-700"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </>
      )}

      {isVerified && (
        <p className="text-green-400 text-sm font-medium flex items-center gap-2 py-2">
          ✅ Phone Verified
        </p>
      )}
    </div>
  );
}
