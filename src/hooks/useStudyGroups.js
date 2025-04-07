import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useStudyGroups = () => {
  return useQuery({
    queryKey: ['studyGroups'],
    queryFn: async () => {
      const { data } = await api.get('/study_groups');
      return data;
    },
  });
};
