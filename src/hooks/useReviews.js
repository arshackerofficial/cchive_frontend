import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useReviews = ({ reviewableType, reviewableId }) => {
  return useQuery({
    queryKey: ['reviews', reviewableType, reviewableId],
    queryFn: async () => {
      const path = (reviewableType === 'Course') ? `/courses/${reviewableId}/reviews` : `/instructors/${reviewableId}/reviews`;

      const res = await api.get(path);
      return res.data;
    },
    enabled: !!reviewableId,
  });
};
