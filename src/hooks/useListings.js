import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useListings = () => {
  return useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const { data } = await api.get('/listings');
      return data;
    },
  });
};
