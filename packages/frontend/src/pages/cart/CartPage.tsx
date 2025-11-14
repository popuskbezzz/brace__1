import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchCart, cartKeys } from '@/entities/cart/api/cartApi';
import { CartList } from '@/widgets/cart/CartList';
import { CartSummary } from '@/widgets/cart/CartSummary';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useCreateOrderMutation } from '@/features/order/create-order/model/useCreateOrderMutation';

export const CartPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: cartKeys.all,
    queryFn: fetchCart,
  });
  const createOrder = useCreateOrderMutation();

  useEffect(() => {
    if (createOrder.isSuccess) {
      alert('Заказ создан, менеджер свяжется с вами.');
    }
  }, [createOrder.isSuccess]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
    );
  }

  const items = data?.items ?? [];
  const total = data?.total_amount ?? 0;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Корзина</h1>
      <CartList items={items} />
      <CartSummary
        total={total}
        isDisabled={!items.length || createOrder.isPending}
        isLoading={createOrder.isPending}
        onCheckout={() => createOrder.mutate()}
      />
      {createOrder.isError && (
        <p className="text-sm text-red-300">Не удалось оформить заказ. Попробуйте ещё раз.</p>
      )}
    </section>
  );
};
