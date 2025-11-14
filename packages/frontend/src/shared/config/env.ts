const fallback = typeof __BACKEND_URL__ !== 'undefined' ? __BACKEND_URL__ : 'http://localhost:8000';

export const env = {
  apiBaseUrl: fallback,
};
