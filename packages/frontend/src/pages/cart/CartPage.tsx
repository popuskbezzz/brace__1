import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchCart, cartKeys } from '@/entities/cart/api/cartApi';
import type { Order } from '@/entities/order/model/types';
import { CartList } from '@/widgets/cart/CartList';
import { CartSummary } from '@/widgets/cart/CartSummary';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useCreateOrderMutation } from '@/features/order/create-order/model/useCreateOrderMutation';
import { useToast } from '@/shared/hooks/useToast';

export const CartPage = () => {
  const toast = useToast();
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: cartKeys.all,
    queryFn: fetchCart,
  });
  const createOrder = useCreateOrderMutation();

  useEffect(() => {
    if (createOrder.isSuccess && createOrder.data) {
      setLastOrder(createOrder.data);
      toast.success(
        `Заказ #${createOrder.data.id} создан на сумму ${createOrder.data.total_amount} ₽.`,
      );
    }
  }, [createOrder.data, createOrder.isSuccess, toast]);

  useEffect(() => {
    if (createOrder.isError) {
      const message =
        (createOrder.error as Error | undefined)?.message ?? 'Не удалось оформить заказ.';
      toast.error(message);
    }
  }, [createOrder.error, createOrder.isError, toast]);

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
      {lastOrder && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
          <p className="text-lg font-semibold">Последний заказ #{lastOrder.id}</p>
          <p className="text-sm text-slate-300">
            Сумма: <span className="font-semibold">{lastOrder.total_amount} ₽</span>
          </p>
          {lastOrder.shipping_address && (
            <p className="text-sm text-slate-300">Адрес: {lastOrder.shipping_address}</p>
          )}
        </div>
      )}
    </section>
  );
};
