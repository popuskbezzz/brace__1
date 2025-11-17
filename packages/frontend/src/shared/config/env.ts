const fallback = typeof __BACKEND_URL__ !== 'undefined' ? __BACKEND_URL__ : 'http://localhost:8000';

export const env = {
  apiBaseUrl: fallback,
  devInitData: import.meta.env.VITE_DEV_INIT_DATA ?? '',
};
