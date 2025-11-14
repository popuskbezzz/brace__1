export type CartItem = {
  id: string;
  product_id: string;
  product_name: string;
  size: string;
  quantity: number;
  unit_price: number;
  hero_media_url?: string;
};

export type CartCollection = {
  items: CartItem[];
  total_amount: number;
};

export type CartItemPayload = {
  product_id: string;
  size: string;
  quantity: number;
};
