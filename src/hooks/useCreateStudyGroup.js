import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export const useCreateStudyGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/study_groups', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyGroups'] });
    },
  });
};
