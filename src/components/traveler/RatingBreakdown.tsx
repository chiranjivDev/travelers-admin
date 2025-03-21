import React from "react";
import { FiStar } from "react-icons/fi";

interface RatingBreakdownProps {
  ratingCounts: {
    [key: number]: number;
  };
  totalReviews: number;
}

export default function RatingBreakdown({
  ratingCounts,
  totalReviews,
}: RatingBreakdownProps) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="w-full space-y-3">
      {ratings.map((rating) => {
        const count = ratingCounts[rating] || 0;
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

        return (
          <div key={rating} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-8">
              <FiStar className="text-yellow-400" fill="currentColor" />
              <span className="text-sm font-medium">{rating}</span>
            </div>

            <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="w-10 text-right">
              <span className="text-sm text-gray-600">{count}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
