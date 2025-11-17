import { useQuery } from '@tanstack/react-query';

import { fetchProductById, productKeys } from '@/entities/product/api/productApi';
import type { Product } from '@/entities/product/model/types';

export const useProductDetails = (productId?: string) => {
  const queryKey = productId ? productKeys.detail(productId) : productKeys.detail('unknown');
  return useQuery<Product>({
    queryKey,
    queryFn: () => fetchProductById(productId ?? ''),
    enabled: Boolean(productId),
  });
};
