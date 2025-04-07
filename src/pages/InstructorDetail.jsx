import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import ReviewForm from "../components/ReviewForm";
import ReviewList from '../components/ReviewList';


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
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {instructor.first_name} {instructor.last_name}
          </h1>
          <p className="text-gray-600 mb-6">{instructor.department}</p>
      
          <ReviewForm reviewableType="Instructor" reviewableId={id} />
          <ReviewList reviewableType="Instructor" reviewableId={id} />
        </div>
      );      
};

export default InstructorDetail;