import axios, { type AxiosRequestConfig } from 'axios';
import WebApp from '@twa-dev/sdk';

import { env } from '@/shared/config/env';

import type { ApiEnvelope, ApiSuccess } from './types';
import { ApiError } from './types';

const instance = axios.create({
  baseURL: `${env.apiBaseUrl}/api`,
  timeout: 10_000,
});

instance.interceptors.request.use((config) => {
  const nextConfig = { ...config };
  nextConfig.headers = nextConfig.headers ?? {};
  const initData = WebApp.initData || env.devInitData || '';
  nextConfig.headers['X-Telegram-Init-Data'] = initData;
  return nextConfig;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const payload = error.response?.data as ApiEnvelope<unknown> | undefined;
    if (payload?.error) {
      throw new ApiError(payload.error.message, payload.error.type);
    }
    throw new ApiError(error.message || 'Unexpected error', 'network_error');
  },
);

export const parseApiEnvelope = <T>(payload: ApiEnvelope<T>): ApiSuccess<T> => {
  if (payload.error) {
    throw new ApiError(payload.error.message, payload.error.type);
  }

  if (payload.data === null) {
    throw new ApiError('Empty response payload', 'empty_response');
  }

  return {
    data: payload.data,
    pagination: payload.pagination ?? null,
  };
};

const request = async <T>(config: AxiosRequestConfig): Promise<ApiSuccess<T>> => {
  const response = await instance.request<ApiEnvelope<T>>(config);
  return parseApiEnvelope(response.data);
};

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => request<T>({ method: 'GET', url, ...config }),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>({ method: 'POST', url, data, ...config }),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ method: 'DELETE', url, ...config }),
};
