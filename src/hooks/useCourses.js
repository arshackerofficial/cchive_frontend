import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await api.get('/courses');
      return res.data;
    },
  });
};
