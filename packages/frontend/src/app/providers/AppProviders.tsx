import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import { ToastProvider } from '@/shared/components/ToastProvider';
import { queryClient } from '@/shared/lib/queryClient';

type Props = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ToastProvider>{children}</ToastProvider>
    </BrowserRouter>
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
  </QueryClientProvider>
);
