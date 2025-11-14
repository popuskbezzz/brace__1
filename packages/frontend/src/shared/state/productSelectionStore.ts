import { create } from 'zustand';

type Selection = {
  size?: string;
  quantity: number;
};

type ProductSelectionState = {
  selections: Record<string, Selection>;
  setSelection: (productId: string, selection: Selection) => void;
  resetSelection: (productId: string) => void;
  resetAll: () => void;
};

export const useProductSelectionStore = create<ProductSelectionState>((set) => ({
  selections: {},
  setSelection: (productId, selection) =>
    set((state) => ({
      selections: {
        ...state.selections,
        [productId]: selection,
      },
    })),
  resetSelection: (productId) =>
    set((state) => {
      const clone = { ...state.selections };
      delete clone[productId];
      return { selections: clone };
    }),
  resetAll: () => set({ selections: {} }),
}));

const DEFAULT_SELECTION: Selection = { quantity: 1 };

export const useProductSelection = (productId: string) =>
  useProductSelectionStore((state) => state.selections[productId] ?? DEFAULT_SELECTION);
