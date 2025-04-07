import { useReviews } from '../hooks/useReviews';

const ReviewList = ({ reviewableType, reviewableId }) => {
  const { data: reviews, isLoading, error } = useReviews({ reviewableType, reviewableId });

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p >Failed to load reviews.</p>;

  if (!reviews || reviews.length === 0)
    return <p>No reviews yet. Be the first to write one!</p>;

  return (
    <div>
      <h3 >Reviews</h3>

      {reviews.map((review) => (
        <div key={review.id} >
          <p >{review.content}</p>
          <p >Rating: {review.rating} / 5</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
