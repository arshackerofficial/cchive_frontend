import { useReviews } from '../hooks/useReviews';

const ReviewList = ({ reviewableType, reviewableId }) => {
  const { data: reviews, isLoading, error } = useReviews({ reviewableType, reviewableId });

  if (isLoading) return <p className="text-gray-500">Loading reviews...</p>;
  if (error) return <p className="text-red-500">Failed to load reviews.</p>;

  if (!reviews || reviews.length === 0)
    return <p className="text-muted mt-4">No reviews yet. Be the first to write one!</p>;

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-6 text-primary">Reviews</h3>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
          key={review.id}
          className="border rounded-lg shadow-sm p-5 bg-white hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-500 font-semibold">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </span>
              <span className="text-sm text-muted">Rating: {review.rating}/5</span>
            </div>
            <p>{review.author} says :</p>
            <p className="text-gray-800 leading-relaxed ml-3 border-l-3 border-accent p-3">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
