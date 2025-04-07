import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import ReviewForm from "../components/ReviewForm";
import ReviewList from '../components/ReviewList';

const CourseDetail = () => {
    const {id} = useParams();

    const { data: course, isLoading, error } = useQuery({
        queryKey: ['course', id],
        queryFn: async () => {
            const res = await api.get(`/courses/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <p>Loading Course...</p>;
    if (error) return <p>Could not load course.</p>;
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-primary mb-2">{course.title}</h1>
          <p className="text-gray-600">{course.description}</p>
          <p className="text-gray-400">{course.subject+" "+course.course_number}</p>
          <p className="text-gray-400">Credits: {course.credits}</p>
          <p className="text-gray-400 mb-6">Average Rating: {course.avg_rating}</p>
      
          <ReviewForm reviewableType="Course" reviewableId={id} />
          <ReviewList reviewableType="Course" reviewableId={id} />
        </div>
      );
      
};

export default CourseDetail;