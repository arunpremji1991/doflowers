"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  lineId: string;
  productSlug: string;
  quantity: number;
  selectedOptions: Record<string, string>;
  addOnIds: string[];
  unitPrice: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addLine: (line: Omit<CartLine, "lineId">) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addLine: (line) => {
        const lineId = `${line.productSlug}-${JSON.stringify(line.selectedOptions)}-${line.addOnIds.join(",")}`;
        const existing = get().lines.find((l) => l.lineId === lineId);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.lineId === lineId ? { ...l, quantity: l.quantity + line.quantity } : l
            ),
          });
        } else {
          set({ lines: [...get().lines, { ...line, lineId }] });
        }
        set({ isOpen: true });
      },
      removeLine: (lineId) => set({ lines: get().lines.filter((l) => l.lineId !== lineId) }),
      setQuantity: (lineId, quantity) =>
        set({
          lines: get().lines.map((l) => (l.lineId === lineId ? { ...l, quantity: Math.max(1, quantity) } : l)),
        }),
      clear: () => set({ lines: [] }),
    }),
    { name: "do-cart" }
  )
);

export function cartLineTotal(line: CartLine, addOnPrices: Record<string, number>): number {
  const addOnsTotal = line.addOnIds.reduce((sum, id) => sum + (addOnPrices[id] ?? 0), 0);
  return (line.unitPrice + addOnsTotal) * line.quantity;
}
