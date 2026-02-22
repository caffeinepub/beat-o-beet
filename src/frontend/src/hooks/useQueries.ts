import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CartItem, OrderResponse, OrderStatusResponse, ContactFormResponse, ContactSubmissionListResponse, ProductListResponse, ProductUpdateResponse, ProductDeleteResponse } from '../backend';

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

interface ProductUpdateData {
  id: string;
  name: string;
  variant: string;
  price: bigint;
  description: string;
  benefits: string[];
  imageUrl: string;
  inStock: boolean;
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

export function useProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<ProductListResponse>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return await actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<ProductUpdateResponse, Error, ProductUpdateData>({
    mutationFn: async (data: ProductUpdateData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return await actor.updateProduct(
        data.id,
        data.name,
        data.variant,
        data.price,
        data.description,
        data.benefits,
        data.imageUrl,
        data.inStock
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<ProductDeleteResponse, Error, string>({
    mutationFn: async (productId: string) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return await actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
}
