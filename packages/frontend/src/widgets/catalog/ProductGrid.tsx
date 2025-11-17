import { useQuery } from '@tanstack/react-query';

import { fetchProducts, productKeys } from '@/entities/product/api/productApi';
import type { Product } from '@/entities/product/model/types';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { ProductCardSkeleton } from '@/entities/product/ui/ProductCardSkeleton';

export const ProductGrid = () => {
  const { data, isLoading } = useQuery({
    queryKey: productKeys.list(),
    queryFn: () => fetchProducts(),
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  const products = data?.items ?? [];

  if (!products.length) {
    return <p className="text-slate-400">Нет товаров для отображения.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
