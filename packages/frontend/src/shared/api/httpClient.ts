import axios, { type AxiosRequestConfig } from 'axios';
import WebApp from '@twa-dev/sdk';

import { env } from '@/shared/config/env';

import { HttpError, type ApiErrorResponse } from './types';

const instance = axios.create({
  baseURL: `${env.apiBaseUrl}/api`,
  timeout: 10_000,
});

instance.interceptors.request.use((config) => {
  const nextConfig = { ...config };
  nextConfig.headers = nextConfig.headers ?? {};
  nextConfig.headers['X-Telegram-Init-Data'] = WebApp.initData || '';
  return nextConfig;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.errors) {
      const apiError = error.response.data as ApiErrorResponse;
      const [first] = apiError.errors;
      throw new HttpError(first?.title ?? 'Request failed', {
        status: first?.status ?? error.response.status ?? 500,
        code: first?.code,
        traceId: first?.trace_id,
      });
    }

    throw new HttpError(error.message || 'Unexpected error', {
      status: error.response?.status ?? 500,
    });
  },
);

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await instance.request<T>(config);
  return response.data;
};

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => request<T>({ method: 'GET', url, ...config }),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>({ method: 'POST', url, data, ...config }),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ method: 'DELETE', url, ...config }),
};
