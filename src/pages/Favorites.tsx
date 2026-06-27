import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ChevronRight } from "lucide-react";
import { useFavorites } from "../store";

const kindLabel: Record<string, string> = {
  activity: "Activité",
  game: "Jeu",
  article: "Article",
};

export default function Favorites() {
  const { favorites, toggleFav } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-leaf-dark shadow-[var(--shadow-soft)] active:scale-95 transition"
          aria-label="Retour"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl">Mes favoris ❤️</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="card text-center py-12">
          <Heart size={40} className="mx-auto text-berry/40" />
          <p className="mt-3 font-display font-semibold text-leaf-dark">Aucun favori pour l'instant</p>
          <p className="mt-1 text-sm text-muted">
            Touchez le cœur sur une activité, un jeu ou un article pour le retrouver ici.
          </p>
          <Link to="/activites" className="btn-leaf mt-5 inline-flex">Explorer les activités</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((f) => (
            <Link key={f.id} to={f.to} className="card flex items-center gap-4 active:scale-[0.99] transition">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-leaf-soft text-3xl">
                {f.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <span className="pill bg-white text-muted shadow-[var(--shadow-soft)] !py-0.5">
                  {kindLabel[f.kind]}
                </span>
                <p className="mt-1 font-display font-semibold text-leaf-dark leading-tight truncate">
                  {f.title}
                </p>
              </div>
              <button
                onClick={(e) => { e.preventDefault(); toggleFav(f); }}
                className="grid h-9 w-9 place-items-center rounded-full bg-berry/10 text-berry"
                aria-label="Retirer des favoris"
              >
                <Heart size={18} fill="currentColor" />
              </button>
              <ChevronRight size={18} className="text-muted" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
