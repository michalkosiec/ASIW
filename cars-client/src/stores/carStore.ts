import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CarStore {
  searchQuery: string;
  favoritesOnly: boolean;
  favoriteCarIds: string[];
  setSearchQuery: (searchQuery: string) => void;
  setFavoritesOnly: (favoritesOnly: boolean) => void;
  toggleFavorite: (carId: string) => void;
  removeFavorite: (carId: string) => void;
}

export const useCarStore = create<CarStore>()(
  persist(
    (set) => ({
      searchQuery: '',
      favoritesOnly: false,
      favoriteCarIds: [],
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFavoritesOnly: (favoritesOnly) => set({ favoritesOnly }),
      toggleFavorite: (carId) =>
        set((state) => ({
          favoriteCarIds: state.favoriteCarIds.includes(carId)
            ? state.favoriteCarIds.filter((id) => id !== carId)
            : [...state.favoriteCarIds, carId],
        })),
      removeFavorite: (carId) =>
        set((state) => ({
          favoriteCarIds: state.favoriteCarIds.filter((id) => id !== carId),
        })),
    }),
    { name: 'cars-client-preferences' },
  ),
);
