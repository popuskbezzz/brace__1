import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cartKeys } from '@/entities/cart/api/cartApi';
import type { ApiResourceResponse } from '@/shared/api/types';
import { apiClient } from '@/shared/api/httpClient';

type OrderResponse = ApiResourceResponse<{
  id: string;
  status: string;
  total_amount: number;
}>;

const createOrder = async () => {
  const response = await apiClient.post<OrderResponse>('/orders', {});
  return response.data;
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};
