import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Product } from '@/entities/product/model/types';
import { useProductSelection, useProductSelectionStore } from '@/shared/state/productSelectionStore';

import { useAddToCartMutation } from '../model/useAddToCartMutation';

const schema = z.object({
  size: z.string({ required_error: 'Выберите размер' }).min(1, 'Выберите размер'),
  quantity: z.coerce.number().min(1).max(10),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  product: Product;
};

export const AddToCartForm = ({ product }: Props) => {
  const defaultSelection = useProductSelection(product.id);
  const setSelection = useProductSelectionStore((state) => state.setSelection);
  const mutation = useAddToCartMutation();

  const { register, handleSubmit, setValue, watch, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      size: defaultSelection.size ?? product.variants[0]?.size ?? '',
      quantity: defaultSelection.quantity ?? 1,
    },
  });

  const sizeValue = watch('size');
  const quantityValue = watch('quantity');

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    setSelection(product.id, { size: sizeValue, quantity: quantityValue });
  }, [product.id, quantityValue, setSelection, sizeValue]);

  const onSubmit = (values: FormValues) => {
    mutation.mutate({
      product_id: product.id,
      size: values.size,
      quantity: values.quantity,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 flex-wrap">
        {product.variants.map((variant) => (
          <label
            key={variant.id}
            className={`px-4 py-2 rounded-full border cursor-pointer ${
              sizeValue === variant.size ? 'bg-white text-black' : 'border-white/20 text-white'
            }`}
          >
            <input
              type="radio"
              value={variant.size}
              className="hidden"
              {...register('size')}
            />
            {variant.size}
          </label>
        ))}
      </div>
      {formState.errors.size && (
        <p className="text-sm text-red-300">{formState.errors.size.message}</p>
      )}
      <div className="flex items-center gap-4">
        <div className="bg-white/5 rounded-full flex items-center">
          <button
            className="px-4"
            type="button"
            onClick={() => setValue('quantity', Math.max(1, quantityValue - 1))}
          >
            –
          </button>
          <span className="px-4">{quantityValue}</span>
          <button
            className="px-4"
            type="button"
            onClick={() => setValue('quantity', Math.min(10, quantityValue + 1))}
          >
            +
          </button>
        </div>
        <div className="text-3xl font-semibold">
          {(product.variants.find((variant) => variant.size === sizeValue)?.price ?? 0) * quantityValue} ₽
        </div>
      </div>
      <button
        className="w-full bg-white text-black rounded-2xl py-4 text-lg font-semibold disabled:opacity-40"
        type="submit"
        disabled={!sizeValue || mutation.isPending}
      >
        {mutation.isPending ? 'Добавляем...' : 'Добавить в корзину'}
      </button>
      {mutation.isError && (
        <p className="text-sm text-red-300">Не удалось добавить товар. Попробуйте ещё раз.</p>
      )}
    </form>
  );
};
