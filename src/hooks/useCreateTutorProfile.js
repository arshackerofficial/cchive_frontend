import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export const useCreateTutorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/tutor_profiles', formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myTutorProfile'] });
    },
  });
};
