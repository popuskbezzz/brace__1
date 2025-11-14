import type { ApiResourceResponse } from '@/shared/api/types';
import { apiClient } from '@/shared/api/httpClient';

import type { UserProfile } from '../model/types';

export const userKeys = {
  profile: ['me'] as const,
};

export const fetchProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<ApiResourceResponse<UserProfile>>('/users/me');
  return response.data;
};
