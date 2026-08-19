"use client";

import { create } from "zustand";

type UiState = {
  searchOpen: boolean;
  menuOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  searchOpen: false,
  menuOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
}));
