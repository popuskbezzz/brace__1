import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { HomePage } from '@/pages/home/HomePage';
import { renderWithProviders } from '@/tests/renderWithProviders';

vi.mock('@/entities/product/api/productApi', () => ({
  productKeys: {
    list: () => ['products'],
    detail: (id: string) => ['products', id],
  },
  fetchProducts: vi.fn().mockResolvedValue({
    items: [
      {
        id: 'product-1',
        name: 'Test Product',
        description: 'desc',
        hero_media_url: null,
        created_at: '',
        updated_at: '',
        variants: [],
      },
    ],
    pagination: null,
  }),
}));

describe('HomePage', () => {
  it('renders featured products', async () => {
    render(renderWithProviders(<HomePage />));

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
  });
});
