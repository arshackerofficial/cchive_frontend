// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import api from "../lib/api";
// import ReviewForm from "../components/ReviewForm";
// import ReviewList from '../components/ReviewList';

// const CourseDetail = () => {
//     const {id} = useParams();

//     const { data: course, isLoading, error } = useQuery({
//         queryKey: ['course', id],
//         queryFn: async () => {
//             const res = await api.get(`/courses/${id}`);
//             return res.data;
//         },
//         enabled: !!id,
//     });

//     if (isLoading) return <p>Loading Course...</p>;
//     if (error) return <p>Could not load course.</p>;
//     return (
//         <div className="max-w-3xl mx-auto px-4 py-10">
//           <h1 className="text-3xl font-bold text-primary mb-2">{course.title}</h1>
//           <p className="text-gray-600">{course.description}</p>
//           <p className="text-gray-400">{course.subject+" "+course.course_number}</p>
//           <p className="text-gray-400">Credits: {course.credits}</p>
//           <p className="text-gray-400 mb-6">Average Rating: {course.avg_rating}</p>

//           <ReviewForm reviewableType="Course" reviewableId={id} />
//           <ReviewList reviewableType="Course" reviewableId={id} />
//         </div>
//       );

// };

// export default CourseDetail;

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const CourseDetail = () => {
  const { id } = useParams();

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await api.get(`/courses/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-blue-500">
        Loading course details...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Could not load course.</p>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#f6c514] mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-2 italic">
        Program Code: {course.subject}-{course.course_number}
      </p>
      <p className="text-gray-500 mb-1">Credits: {course.credits}</p>

      {/* Rating */}
      <div className="mb-4 text-sm text-gray-700">
        {Number(course.avg_rating) > 0 ? (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(Number(course.avg_rating))
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.644a1 1 0 00.95.69h3.805c.969 0 1.371 1.24.588 1.81l-3.08 2.235a1 1 0 00-.364 1.118l1.18 3.644c.3.921-.755 1.688-1.54 1.118l-3.08-2.235a1 1 0 00-1.176 0l-3.08 2.235c-.785.57-1.84-.197-1.54-1.118l1.18-3.644a1 1 0 00-.364-1.118L2.026 9.07c-.783-.57-.38-1.81.588-1.81h3.805a1 1 0 00.95-.69l1.18-3.644z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({Number(course.avg_rating).toFixed(1)}/5)
            </span>
          </div>
        ) : (
          <span className="text-gray-400 italic">No rating yet</span>
        )}
      </div>

      {/* Description */}
      {course.description && (
        <p className="text-gray-700 mb-6">{course.description}</p>
      )}

      {/* Reviews */}
      <ReviewForm
        reviewableType="Course"
        course={course.subject + " " + course.course_number}
        reviewableId={id}
      />
      <ReviewList reviewableType="Course" reviewableId={id} />
    </div>
  );
};

export default CourseDetail;
