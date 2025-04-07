import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useTutors = () => {
  return useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const { data } = await api.get('/tutor_profiles');
      return data;
    },
  });
};
