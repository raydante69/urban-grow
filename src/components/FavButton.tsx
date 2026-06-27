import { Heart } from "lucide-react";
import { useFavorites, type FavItem } from "../store";

/** Bouton cœur réutilisable pour ajouter/retirer un favori. */
export default function FavButton({ item, size = 18 }: { item: FavItem; size?: number }) {
  const { isFav, toggleFav } = useFavorites();
  const active = isFav(item.id);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFav(item);
      }}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={`grid place-items-center h-9 w-9 rounded-full transition active:scale-90 ${
        active ? "bg-berry/10 text-berry" : "bg-white/80 text-muted"
      }`}
    >
      <Heart size={size} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
