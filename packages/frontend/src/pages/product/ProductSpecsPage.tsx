import { Link, useParams } from 'react-router-dom';

import { Skeleton } from '@/shared/ui/Skeleton';
import { useProductDetails } from '@/pages/product/useProductDetails';
import type { Product } from '@/entities/product/model/types';

export const ProductSpecsPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, isError } = useProductDetails(productId);

  if (isLoading) {
    return <Skeleton className="h-40 rounded-2xl" />;
  }

  if (isError || !product) {
    return <p className="text-red-300">Не удалось загрузить характеристики товара.</p>;
  }

  return (
    <section className="space-y-4">
      <Link to={`/product/${product.id}`} className="text-slate-300" type="button">
        ← Назад к товару
      </Link>
      <h1 className="text-2xl font-semibold">Характеристики {product.name}</h1>
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="p-3">Размер</th>
              <th className="p-3">Цена</th>
              <th className="p-3">Остаток</th>
            </tr>
          </thead>
          <tbody>
            {product.variants.map((variant: Product['variants'][number]) => (
              <tr key={variant.id} className="border-t border-white/10">
                <td className="p-3">{variant.size}</td>
                <td className="p-3">{variant.price} ₽</td>
                <td className="p-3">{variant.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
