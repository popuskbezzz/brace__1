export type OrderItem = {
  id: string;
  product_id: string;
  size: string;
  quantity: number;
  unit_price: string;
};

export type Order = {
  id: string;
  status: string;
  total_amount: string;
  shipping_address?: string | null;
  note?: string | null;
  created_at: string;
  items: OrderItem[];
};
