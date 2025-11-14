import type { ApiListResponse, ApiResourceResponse } from '@/shared/api/types';
import { apiClient } from '@/shared/api/httpClient';
import type { Product } from '../model/types';

export const productKeys = {
  all: ['products'] as const,
  detail: (productId: string) => [...productKeys.all, productId] as const,
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<ApiListResponse<Product>>('/products');
  return response.data;
};

export const fetchProductById = async (productId: string): Promise<Product> => {
  const response = await apiClient.get<ApiResourceResponse<Product>>(`/products/${productId}`);
  return response.data;
};
