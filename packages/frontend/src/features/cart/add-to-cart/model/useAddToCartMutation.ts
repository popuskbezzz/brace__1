import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addCartItem, cartKeys } from '@/entities/cart/api/cartApi';
import type { CartItemPayload } from '@/entities/cart/model/types';

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CartItemPayload) => addCartItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};
