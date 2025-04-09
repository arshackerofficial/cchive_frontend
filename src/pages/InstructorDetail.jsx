import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const InstructorDetail = () => {
  const { id } = useParams();

  const {
    data: instructor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["instructor", id],
    queryFn: async () => {
      const res = await api.get(`/instructors/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return <p className="text-center text-lg mt-10">Loading Instructor...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500 mt-10">
        Could not load Instructor
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 m-10 bg-white rounded-2xl shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          {instructor.first_name} {instructor.last_name}
        </h1>
        <p className="text-lg text-gray-600 italic">{instructor.department}</p>
      </div>

      <div className="mb-6">
        {Number(instructor.avg_rating) > 0 ? (
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium text-gray-700">Average Rating:</span>
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(Number(instructor.avg_rating))
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.644a1 1 0 00.95.69h3.805c.969 0 1.371 1.24.588 1.81l-3.08 2.235a1 1 0 00-.364 1.118l1.18 3.644c.3.921-.755 1.688-1.54 1.118l-3.08-2.235a1 1 0 00-1.176 0l-3.08 2.235c-.785.57-1.84-.197-1.54-1.118l1.18-3.644a1 1 0 00-.364-1.118L2.026 9.07c-.783-.57-.38-1.81.588-1.81h3.805a1 1 0 00.95-.69l1.18-3.644z" />
              </svg>
            ))}
            <span className="text-sm text-gray-500">
              ({Number(instructor.avg_rating).toFixed(1)}/5)
            </span>
          </div>
        ) : (
          <p className="text-center text-gray-400 italic">
            No ratings available yet.
          </p>
        )}
      </div>

      <div className="mb-10">
        <p className="text-gray-600 leading-relaxed">
          Write your honest review and see other's option about this faculity
          member.
        </p>
      </div>

      <ReviewForm
        reviewableType="Instructor"
        instructor={instructor.first_name + " " + instructor.last_name}
        reviewableId={id}
      />
      <ReviewList reviewableType="Instructor" reviewableId={id} />
    </div>
  );
};

export default InstructorDetail;
