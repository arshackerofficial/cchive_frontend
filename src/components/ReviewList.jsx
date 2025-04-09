// import { useReviews } from '../hooks/useReviews';

// const ReviewList = ({ reviewableType, reviewableId }) => {
//   const { data: reviews, isLoading, error } = useReviews({ reviewableType, reviewableId });

//   if (isLoading) return <p className="text-gray-500">Loading reviews...</p>;
//   if (error) return <p className="text-red-500">Failed to load reviews.</p>;

//   if (!reviews || reviews.length === 0)
//     return <p className="text-muted mt-4">No reviews yet. Be the first to write one!</p>;

//   return (
//     <div className="mt-10">
//       <h3 className="text-2xl font-semibold mb-6 text-primary">Reviews</h3>

//       <div className="space-y-6">
//         {reviews.map((review) => (
//           <div
//           key={review.id}
//           className="border rounded-lg shadow-sm p-5 bg-white hover:shadow-md transition"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-yellow-500 font-semibold">
//                 {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
//               </span>
//               <span className="text-sm text-muted">Rating: {review.rating}/5</span>
//             </div>
//             <p>{review.author} says :</p>
//             <p className="text-gray-800 leading-relaxed ml-3 border-l-3 border-accent p-3">{review.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReviewList;

import { useReviews } from "../hooks/useReviews";

const parseReviewContent = (content, reviewableType) => {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const fields = {
    course: "",
    instructor: "",
    term: "",
    body: "",
  };

  lines.forEach((line, index) => {
    if (line.startsWith("Course:"))
      fields.course = line.replace("Course:", "").trim();
    else if (line.startsWith("Instructor:"))
      fields.instructor = line.replace("Instructor:", "").trim();
    else if (line.startsWith("Term:"))
      fields.term = line.replace("Term:", "").trim();
    else if (line.startsWith("Review:")) {
      // fields.body = lines.slice(index + 1).join("\n");
      //   fields.body =
      //     reviewableType == "Course"
      //       ? line.replace("Review:", "").trim()
      //       : lines.slice(index + 1).join("\n");
      fields.body = line.replace("Review:", "").trim();
    }
  });

  return fields;
};

const ReviewList = ({ reviewableType, reviewableId }) => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useReviews({ reviewableType, reviewableId });

  if (isLoading) return <p className="text-gray-500">Loading reviews...</p>;
  if (error) return <p className="text-red-500">Failed to load reviews.</p>;

  if (!reviews || reviews.length === 0)
    return (
      <p className="text-muted mt-4">
        No reviews yet. Be the first to write one!
      </p>
    );

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-6 text-primary">Reviews</h3>

      <div className="space-y-6">
        {reviews.map((review) => {
          const { course, instructor, term, body } = parseReviewContent(
            review.content,
            reviewableType
          );

          return (
            <div
              key={review.id}
              className="border rounded-xl shadow-sm p-6 bg-white hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-yellow-500 text-lg font-semibold">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
                <span className="text-sm text-gray-500">
                  Rating: {review.rating}/5
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                {course && (
                  <p>
                    <span className="font-medium text-gray-700">Course:</span>{" "}
                    {course}
                  </p>
                )}
                {instructor && (
                  <p>
                    <span className="font-medium text-gray-700">
                      Instructor:
                    </span>{" "}
                    {instructor}
                  </p>
                )}
                {term && (
                  <p>
                    <span className="font-medium text-gray-700">Term:</span>{" "}
                    {term}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 border-l-4 border-accent p-4 text-gray-800 whitespace-pre-line leading-relaxed">
                {body || review.content}
              </div>

              {review.author && (
                <p className="text-xs text-gray-500 mt-3 text-right italic">
                  - {review.author}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewList;
