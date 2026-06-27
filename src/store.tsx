/**
 * Petit magasin global pour les favoris (activités, jeux, articles).
 * Persisté en localStorage. Utilisé par la page Favoris et les boutons cœur.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface FavItem {
  id: string;
  kind: "activity" | "game" | "article";
  title: string;
  emoji: string;
  image: string;
  to: string;
}

interface FavState {
  favorites: FavItem[];
  isFav: (id: string) => boolean;
  toggleFav: (item: FavItem) => void;
}

const FavContext = createContext<FavState | null>(null);
const KEY = "urbangrow.favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavItem[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as FavItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFav = (id: string) => favorites.some((f) => f.id === id);

  const toggleFav = (item: FavItem) =>
    setFavorites((prev) =>
      prev.some((f) => f.id === item.id)
        ? prev.filter((f) => f.id !== item.id)
        : [item, ...prev],
    );

  return (
    <FavContext.Provider value={{ favorites, isFav, toggleFav }}>
      {children}
    </FavContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
  return ctx;
}
