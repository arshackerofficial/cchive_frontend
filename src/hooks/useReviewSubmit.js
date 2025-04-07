import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

export const useReviewSubmit = ({reviewableType, reviewableId}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            console.log(reviewableType)
            const path = (reviewableType == 'Course') ? `/courses/${reviewableId}/reviews` : `/instructors/${reviewableId}/reviews`;
            console.log(path)
            const res = await api.post(path, formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey: ['reviews', reviewableType, reviewableId]});
        }
    });
};