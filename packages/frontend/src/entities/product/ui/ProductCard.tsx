import { Link } from 'react-router-dom';

import type { Product } from '../model/types';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const price = product.variants[0]?.price ?? 0;
  const hasImage = Boolean(product.hero_media_url);

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white/5 rounded-2xl p-4 space-y-3 border border-white/5 backdrop-blur"
    >
      <div
        className={`h-36 rounded-xl bg-cover bg-center border border-white/5 flex items-center justify-center text-sm text-slate-400 ${
          hasImage ? '' : 'bg-gradient-to-br from-slate-800 to-slate-900'
        }`}
        style={hasImage ? { backgroundImage: `url(${product.hero_media_url})` } : undefined}
      >
        {!hasImage && <span>Нет изображения</span>}
      </div>
      <div>
        <p className="text-sm text-slate-300">Коллекция</p>
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </div>
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>{price} ₽</span>
        <span>{product.variants.length} размеров</span>
      </div>
    </Link>
  );
};
