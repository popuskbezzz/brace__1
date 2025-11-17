import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { ProductGrid } from '@/widgets/catalog/ProductGrid';
import { renderWithProviders } from '@/tests/renderWithProviders';

vi.mock('@/entities/product/api/productApi', () => ({
  productKeys: {
    list: () => ['products'],
  },
  fetchProducts: vi.fn().mockResolvedValue({
    items: [
      {
        id: 'product-1',
        name: 'Mock Product',
        description: null,
        hero_media_url: null,
        created_at: '',
        updated_at: '',
        variants: [],
      },
    ],
    pagination: null,
  }),
}));

describe('ProductGrid', () => {
  it('renders product cards from query', async () => {
    render(renderWithProviders(<ProductGrid />));

    await waitFor(() => {
      expect(screen.getByText('Mock Product')).toBeInTheDocument();
    });
  });
});
