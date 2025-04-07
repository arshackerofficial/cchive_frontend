import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';


export const useMyTutorProfile = () => {
  return useQuery({
    queryKey: ['myTutorProfile'],
    queryFn: async () => {
      const { data } = await api.get('/tutor_profile');
      return data;
    },
  });
};
