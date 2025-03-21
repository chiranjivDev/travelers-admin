import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FiStar, FiMapPin, FiCalendar, FiEdit } from 'react-icons/fi';
import { Button } from '../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewCardProps {
  review: {
    id: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    rating: number;
    comment: string;
    travelerId: string;
    date: string;
    route: {
      from: string;
      to: string;
    };
    deliveryDate: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { user } = useAuth();
  const { id } = useParams();
  const { reviews: travelerReviews } = useSelector((state) => state.reviews);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const dateMidnight = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const nowMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const diffTime = nowMidnight.getTime() - dateMidnight.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const handleDeleteReview = () => {
    dispatch({
      type: 'DELETE_REVIEW',
      payload: {
        reviewId: review.id,
        travelerId: id,
      },
    });
  };

  return (
    <div className="w-full  rounded-lg p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={
            review.user.avatar
              ? review.user.avatar
              : 'https://cdn-icons-png.flaticon.com/512/9187/9187532.png'
          }
          alt={review.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center gap-5">
              <span className="font-medium">{review.user.name}</span>
              {review.user.id === user?.userId && (
                <>
                  <Link
                    title="Edit Review"
                    href={`/feedback/${review.id}/edit?travelerId=${review.travelerId}`}
                    className="text-blue-500"
                  >
                    <FiEdit />
                  </Link>
                  <button onClick={handleDeleteReview} title="Delete Review">
                    <FaTrash color="red" />
                  </button>
                </>
              )}
            </div>
            <span className="text-sm max-sm:hidden text-gray-500">
              {formatDate(review.date)}
            </span>
          </div>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={i < review.rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-white my-3">{review.comment}</p>

      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-zinc-300">
        <div className="flex items-center gap-1">
          <FiCalendar className="text-gray-400" />
          <span>{review.deliveryDate}</span>
        </div>
      </div>
    </div>
  );
}
