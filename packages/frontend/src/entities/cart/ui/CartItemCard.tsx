import { memo } from 'react';

import type { CartItem } from '../model/types';

type Props = {
  item: CartItem;
  actions?: React.ReactNode;
};

export const CartItemCard = memo(({ item, actions }: Props) => (
  <div className="bg-white/5 rounded-2xl p-4 flex gap-4">
    <div
      className="w-20 h-20 rounded-xl bg-cover bg-center border border-white/5"
      style={{ backgroundImage: `url(${item.hero_media_url})` }}
    />
    <div className="flex-1">
      <h3 className="font-semibold">{item.product_name}</h3>
      <p className="text-sm text-slate-400">
        Размер {item.size} · {item.quantity} шт.
      </p>
      <p className="text-lg font-semibold">{item.quantity * item.unit_price} ₽</p>
    </div>
    {actions}
  </div>
));

CartItemCard.displayName = 'CartItemCard';
