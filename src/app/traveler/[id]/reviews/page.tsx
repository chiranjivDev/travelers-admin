'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRAVELER_DETAIL } from '../../redux/tripsAction';
import RatingBreakdown from '@/components/traveler/RatingBreakdown';
import ReviewsList from '@/components/traveler/ReviewsList';
import { TRAVELER_REVIEWS } from './redux/reviewsAction';
import { clearState } from './redux/reviewsSlice';

export default function TravelerReviews() {
  const params = useParams();
  const travelerId = params?.id;
  const { travelerPackages, traveler, travelerLoading } = useSelector(
    (state) => state.trips,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: TRAVELER_DETAIL, payload: travelerId });
    dispatch({ type: TRAVELER_REVIEWS, payload: travelerId });
  }, [travelerId]);

  const { reviews: travelerReviews, deleteReviewSuccess } = useSelector(
    (state) => state.reviews,
  );

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    travelerReviews.forEach((review) => {
      counts[review.rating] = (counts[review.rating] || 0) + 1;
    });
    return counts;
  }, [travelerReviews]);

  const totalReviews = useMemo(
    () => Object.values(ratingCounts).reduce((sum, count) => sum + count, 0),
    [ratingCounts],
  );

  const reviews = useMemo(
    () =>
      travelerReviews.map((review) => ({
        id: review.review_id,
        user: {
          id: review.sender.id,
          name: review.sender.name,
          avatar: review.sender.picture_url || '',
        },
        rating: review.rating,
        comment: review.review,
        date: new Date(review.created_at).toLocaleDateString(),
        travelerId: review.traveller.id,
        route: {
          from: review.sender.location || 'Unknown',
          to: review.traveller.location || 'Unknown',
        },
        deliveryDate: new Date(review.updated_at).toLocaleDateString(),
        editUrl: `/feedback/${review.review_id}/edit`,
      })),
    [travelerReviews],
  );
  const router = useRouter();
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  if (travelerLoading) {
    return (
      <div className="container min-h-[70vh] flex items-center justify-center mx-auto px-4 py-20">
        <div className="text-center text-gray-400 flex flex-col gap-4 items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-b-gray-300 animate-spin"></div>
          <div>Loading traveler details...</div>
        </div>
      </div>
    );
  }

  if (!travelerId || !traveler) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-gray-400">Traveler not found</div>
      </div>
    );
  }

  return (
    <div className="py-10 flex items-center justify-center">
      <div className="w-11/12 sm:w-4/5 md:3/5 flex flex-col items-center gap-8">
        <div className="w-full">
          <h1 className="text-3xl text-left font-bold">
            Reviews for <span className="text-purple-500">{traveler.name}</span>
          </h1>
          <span className="text-base font-medium text-zinc-400">
            {traveler.reviewCount ?? totalReviews} Reviews
          </span>
        </div>

        <div className="w-full p-6 ">
          <h2 className="text-xl font-semibold mb-4">Rating Breakdown</h2>
          <RatingBreakdown
            ratingCounts={ratingCounts}
            totalReviews={totalReviews}
          />
        </div>

        <div className="w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
          <ReviewsList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
