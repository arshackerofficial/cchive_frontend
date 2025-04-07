import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';

export const useJoinStudyGroup = () => {
  return useMutation({
    mutationFn: async (groupId) => {
      const res = await api.post(`/study_groups/${groupId}/memberships`);
      return res.data;
    },
  });
};
