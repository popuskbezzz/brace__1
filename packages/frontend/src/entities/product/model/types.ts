export type ProductVariant = {
  id: string;
  size: string;
  price: number;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  hero_media_url?: string;
  created_at: string;
  updated_at: string;
  variants: ProductVariant[];
};
