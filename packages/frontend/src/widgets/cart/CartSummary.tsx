type Props = {
  total: number;
  onCheckout: () => void;
  isDisabled: boolean;
  isLoading: boolean;
};

export const CartSummary = ({ total, onCheckout, isDisabled, isLoading }: Props) => (
  <div className="space-y-4">
    <div className="bg-white/5 rounded-2xl p-4 flex justify-between text-lg font-semibold">
      <span>Итого</span>
      <span>{total} ₽</span>
    </div>
    <button
      className="w-full bg-white text-black rounded-2xl py-4 text-lg font-semibold disabled:opacity-40"
      type="button"
      onClick={onCheckout}
      disabled={isDisabled}
    >
      {isLoading ? 'Отправляем...' : 'Оформить заказ'}
    </button>
  </div>
);
