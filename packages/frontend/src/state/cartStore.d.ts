export type CartItem = {
    id: string;
    productId: string;
    productName: string;
    size: string;
    quantity: number;
    price: number;
    hero?: string;
};
interface CartState {
    items: CartItem[];
    total: number;
    setItems: (items: CartItem[]) => void;
}
declare const useCartStore: import("zustand").UseBoundStore<import("zustand").StoreApi<CartState>>;
export default useCartStore;
