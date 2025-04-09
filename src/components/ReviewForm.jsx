// import { useState } from "react";
// import { useReviewSubmit } from "../hooks/useReviewSubmit";

// const ReviewForm = ({ reviewableType, reviewableId }) => {
//   const [form, setForm] = useState({ content: '', rating: 1 });

//   const { mutate, isLoading, isError } = useReviewSubmit({
//     reviewableType,
//     reviewableId,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutate(form);
//     setForm({ content: '', rating: 1 });
//   };

//   return (
//     <div className="bg-gray-50 p-6 rounded-lg border mt-10">
//       <h3 className="text-xl font-semibold mb-4 text-primary">Leave a Review</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea
//           required
//           placeholder="Write your thoughts..."
//           className="w-full border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
//           value={form.content}
//           onChange={(e) => setForm({ ...form, content: e.target.value })}
//           rows={4}
//         ></textarea>

//         <div>
//           <label className="text-sm text-gray-700 block mb-1">Rating (1 to 5)</label>
//           <input
//             type="number"
//             min="1"
//             max="5"
//             value={form.rating}
//             className="border border-gray-300 p-2 rounded w-24"
//             onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-primary text-white px-5 py-2 rounded hover:bg-blue-800 transition"
//           disabled={isLoading}
//         >
//           {isLoading ? "Submitting..." : "Submit Review"}
//         </button>

//         {isError && (
//           <p className="text-red-500 text-sm mt-2">Could not submit review.</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;
import { useState } from "react";
import { useReviewSubmit } from "../hooks/useReviewSubmit";

const ReviewForm = ({
  reviewableType,
  reviewableId,
  course = null,
  instructor = null,
  term = null,
}) => {
  const [form, setForm] = useState({
    rating: 1,
    course: course || "",
    instructor: instructor || "",
    term: term || "",
    reviewText: "",
  });

  const { mutate, isLoading, isError } = useReviewSubmit({
    reviewableType,
    reviewableId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { course, instructor, term, rating, reviewText } = form;

    const compiledReview = `
      Course: ${course}\n
      Instructor: ${instructor}\n
      Term: ${term}\n
      Rating: ${rating}/5\n
      Review:${reviewText}`.trim();

    mutate({ content: compiledReview, rating });
    setForm({
      rating: 1,
      course: course || "",
      instructor: instructor || "",
      term: term || "",
      reviewText: "",
    });
  };

  const renderInput = (label, name, placeholder) => (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={
          !!(name === "course" && course) ||
          !!(name === "instructor" && instructor) ||
          !!(name === "term" && term)
        }
        className={`w-full border rounded p-2 ${
          form[name] ? "bg-gray-100" : "bg-white"
        } ${
          (name === "course" && course) ||
          (name === "instructor" && instructor) ||
          (name === "term" && term)
            ? "cursor-not-allowed"
            : ""
        }`}
      />
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl border shadow mt-10">
      <h3 className="text-2xl font-semibold mb-5 text-primary">
        Leave a Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        {renderInput("Course", "course", "e.g., CSCI 275")}
        {renderInput("Instructor", "instructor", "e.g., Dr. Yvonne Yang")}
        {renderInput("Term", "term", "e.g., Fall 2025")}

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Rating (1 to 5)
          </label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={form.rating}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-24"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Your Review
          </label>
          <textarea
            name="reviewText"
            placeholder="Share your experience..."
            className="w-full border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={5}
            required
            value={form.reviewText}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-5 py-2 rounded hover:bg-blue-800 transition"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>

        {isError && (
          <p className="text-red-500 text-sm mt-2">Could not submit review.</p>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
