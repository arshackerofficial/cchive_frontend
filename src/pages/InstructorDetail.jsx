import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import ReviewForm from "../components/ReviewForm";

const InstructorDetail = () => {
    const {id} = useParams();
    
    const {data: instructor, isLoading, error} = useQuery({
        queryKey: ['instructor', id],
        queryFn: async () => {
            const res = await api.get(`/instructors/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <p>Loading Instructor...</p>
    if (error) return <p>Could not load Instructor</p>

    return (
        <div>
            <h1>{instructor.first_name +" "+instructor.last_name}</h1>
            <p>{instructor.department}</p>

            <ReviewForm reviewableType="Instructor" reviewableId={id} />
        </div>
    );
};

export default InstructorDetail;