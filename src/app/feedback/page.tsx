'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_REVIEW } from '../traveler/[id]/reviews/redux/reviewsAction';
import { clearState } from '../traveler/[id]/reviews/redux/reviewsSlice';

export default function ReviewForm() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const params = useSearchParams();
  const travelerId = params.get('travelerId');
  const travelerName = params.get('travelerName');

  const router = useRouter();
  const t = useTranslations('Feedback');
  const { user } = useAuth();

  const { handleSubmit, register, setValue } = useForm();
  const dispatch = useDispatch();
  const { createReviewSuccess, createReviewLoading } = useSelector(
    (state) => state.reviews,
  );

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
    setValue('rating', index);
  };

  const onSubmit = (data) => {
    const reviewPayload = {
      title: `Review for ${travelerName}`,
      review: data.review,
      rating: Number(data.rating),
      traveller_id: travelerId,
      sender_id: user.userId,
    };

    dispatch({ type: CREATE_REVIEW, payload: reviewPayload });
  };

  useEffect(() => {
    if (!createReviewLoading && createReviewSuccess) setSubmitted(true);
    return () => dispatch(clearState());
  }, [createReviewLoading, createReviewSuccess]);

  if (user?.permissions !== 'sender') {
    return (
      <div className="py-24 flex items-center justify-center text-xl text-white">
        Unauthorized
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-20 overflow-hidden">
      {!submitted ? (
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[95%] sm:w-11/12 md:w-4/5 lg:w-3/5 flex rounded-[20px] p-10 bg-slate-800 items-center justify-center flex-col gap-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-3 w-full items-center text-left justify-center">
            <h1 className="text-4xl font-bold ">
              {t('title')}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                {travelerName}
              </span>
            </h1>
            <p className="text-base text-gray-400">{t('subtitle')}</p>
          </div>
          <div className="w-full flex flex-col items-start gap-3">
            <h1 className="text-xl font-medium">{t('rateYourExperience')}</h1>
            <div className="flex w-full items-center justify-center gap-3">
              {[1, 2, 3, 4, 5].map((index) => (
                <Star
                  key={index}
                  size={30}
                  color="yellow"
                  fill={index <= (hoverRating || rating) ? 'yellow' : 'none'}
                  className="transition-all cursor-pointer duration-300"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(index)}
                />
              ))}
            </div>
          </div>
          <input
            type="hidden"
            {...register('rating', { required: true })}
            value={rating}
          />
          <div className="w-full flex flex-col items-start gap-5">
            <h1 className="text-xl font-medium">{t('tellUsYourExperience')}</h1>
            <textarea
              className="w-full transition-all duration-300 focus:ring-2 focus:border-ring-500 text-lg outline-none px-5 py-3 resize-none border-2 border-slate-700 bg-transparent rounded-[10px]"
              {...register('review', { required: true })}
              id="exp"
              rows={5}
              placeholder="Write about your experience...."
            ></textarea>
          </div>
          <div className="flex w-full items-center justify-center gap-3 flex-col sm:flex-row">
            <button
              type="submit"
              className="w-full transition-all duration-300 bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:border-ring-blue-500 text-white font-bold py-3 px-10 rounded-[10px]"
            >
              {t('submitButton')}
            </button>
            <button
              type="button"
              className="w-full transition-all duration-300 bg-gray-500 hover:bg-gray-700 focus:ring-2 focus:border-ring-blue-500 text-white font-bold py-3 px-10 rounded-[10px]"
              onClick={() => {
                router.push('/');
              }}
            >
              {t('mayBeLater')}
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.div
          className="flex items-center justify-center flex-col gap-6 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="bg-green rounded-full bg-green-500 p-4 flex items-center justify-center"
          >
            <FaCheck size={40} color="white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Thank You for Your Feedback!
          </h1>
          <p className="text-sm text-gray-400">
            We appreciate your time and effort in providing us with your
            valuable feedback.
          </p>
          <Link href={'/'} className="font-light text-blue-400 underline">
            Return to Home
          </Link>
        </motion.div>
      )}
    </div>
  );
}
