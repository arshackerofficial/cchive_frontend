import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useInstructors = () => {
  return useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      const res = await api.get('/instructors');
      return res.data;
    },
  });
};
