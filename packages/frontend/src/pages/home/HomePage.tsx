import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchProducts, productKeys } from '@/entities/product/api/productApi';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { ProductCardSkeleton } from '@/entities/product/ui/ProductCardSkeleton';
import { SizeCalculator } from '@/features/size-calculator/ui/SizeCalculator';
import { Carousel } from '@/shared/components/Carousel';

export const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: productKeys.all,
    queryFn: fetchProducts,
  });

  const featured = data?.slice(0, 4) ?? [];

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm text-slate-300 tracking-[0.3em]">BRACE</p>
        <h1 className="text-3xl font-semibold leading-tight">
          Мужское белье
          <br />
          нового поколения
        </h1>
      </header>

      <Carousel />

      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Популярные товары</h2>
          <Link to="/catalog" className="text-sm text-slate-300">
            Смотреть все →
          </Link>
        </div>
        <div className="grid grid-flow-col auto-cols-[70%] gap-4 overflow-x-auto pb-2">
          {isLoading &&
            Array.from({ length: 3 }).map((_, idx) => <ProductCardSkeleton key={idx} />)}
          {!isLoading && featured.length === 0 && (
            <p className="text-slate-400">Нет товаров для отображения.</p>
          )}
          {!isLoading &&
            featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>

      <SizeCalculator />
    </section>
  );
};
