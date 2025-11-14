import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const calculatorSchema = z.object({
  waist: z
    .coerce.number({ invalid_type_error: 'Введите число' })
    .min(60, 'Минимум 60 см')
    .max(140, 'Максимум 140 см'),
  hips: z
    .coerce.number({ invalid_type_error: 'Введите число' })
    .min(80, 'Минимум 80 см')
    .max(150, 'Максимум 150 см'),
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

const calcSize = (waist: number, hips: number) => {
  const score = (waist + hips) / 2;
  if (score < 80) return 'S';
  if (score < 90) return 'M';
  if (score < 100) return 'L';
  return 'XL';
};

export const SizeCalculator = () => {
  const [result, setResult] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: { waist: 80, hips: 95 },
  });

  const errorMessage = useMemo(
    () => errors.waist?.message ?? errors.hips?.message ?? null,
    [errors],
  );

  const onSubmit = (values: CalculatorForm) => {
    setResult(calcSize(values.waist, values.hips));
  };

  return (
    <div className="bg-white/5 rounded-3xl p-4 border border-white/10 space-y-4">
      <div>
        <p className="text-sm text-slate-300">Подбор размера</p>
        <h3 className="text-xl font-semibold">Подбери свой размер</h3>
      </div>
      <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-sm text-slate-400 flex flex-col gap-1">
          Талия, см
          <input
            type="number"
            {...register('waist', { valueAsNumber: true })}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-2"
          />
        </label>
        <label className="text-sm text-slate-400 flex flex-col gap-1">
          Бедра, см
          <input
            type="number"
            {...register('hips', { valueAsNumber: true })}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-2"
          />
        </label>
        {errorMessage && (
          <p className="col-span-2 text-xs text-red-300 bg-red-500/10 rounded-xl px-3 py-2">
            {errorMessage}
          </p>
        )}
        <button className="col-span-2 bg-white text-black rounded-xl py-2 font-semibold" type="submit">
          Рассчитать
        </button>
      </form>
      {result && <p className="text-center text-sm text-slate-200">Ваш размер: {result}</p>}
    </div>
  );
};
