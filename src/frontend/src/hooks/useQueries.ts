import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CartItem, OrderResponse, OrderStatusResponse, ContactFormResponse, ContactSubmissionListResponse } from '../backend';

interface OrderFormData {
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
}

interface ContactFormData {
  customerName: string;
  customerEmail: string;
  address: string;
  message?: string;
}

export function useSubmitOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, OrderFormData>({
    mutationFn: async (data: OrderFormData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return await actor.submitOrder(
        data.items,
        data.customerName,
        data.customerEmail,
        data.shippingAddress
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });
}

export function useOrder(orderId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<OrderStatusResponse>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return await actor.getOrderById(orderId);
    },
    enabled: !!actor && !isFetching && !!orderId,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<ContactFormResponse, Error, ContactFormData>({
    mutationFn: async (data: ContactFormData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      
      // Validate required fields
      if (!data.customerName.trim() || !data.customerEmail.trim() || !data.address.trim()) {
        throw new Error('All required fields must be filled');
      }

      return await actor.submitContactForm(
        data.customerName,
        data.customerEmail,
        data.address,
        data.message || null
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    }
  });
}

export function useContactSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactSubmissionListResponse>({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return await actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}
