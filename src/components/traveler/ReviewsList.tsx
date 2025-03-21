import React from 'react';
import ReviewCard from './ReviewCard';
import Link from 'next/link';

interface ReviewsListProps {
  reviews: Array<{
    id: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    rating: number;
    comment: string;
    date: string;
    travelerId: string;
    route: {
      from: string;
      to: string;
    };
    deliveryDate: string;
    editUrl: string;
  }>;
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="w-full space-y-4">
      {reviews.length ? (
        <>
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <ReviewCard review={review} />
            </div>
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center py-10">
          <p>No reviews found :(</p>
        </div>
      )}
    </div>
  );
}
