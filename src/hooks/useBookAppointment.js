import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';

export const useBookAppointment = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const res = await api.post('/appointments', formData);
      return res.data;
    },
  });
};
