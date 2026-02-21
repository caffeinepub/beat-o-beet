import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Response } from '../backend';

interface InquiryFormData {
  name: string;
  email: string;
  message: string;
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<Response, Error, InquiryFormData>({
    mutationFn: async (data: InquiryFormData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return await actor.submitInquiry(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    }
  });
}
