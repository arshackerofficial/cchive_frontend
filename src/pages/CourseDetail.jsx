import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import ReviewForm from "../components/ReviewForm";

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
        <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>

            <ReviewForm reviewableType="Course" reviewableId={id} />
        </div>
    );
};

export default CourseDetail;