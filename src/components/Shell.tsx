import { Outlet, Link, useNavigate } from "react-router-dom";
import { Heart, Bell } from "lucide-react";
import { useAuth } from "../auth";
import { useFavorites } from "../store";
import BottomNav from "./BottomNav";

/**
 * Coquille de l'app Famille : cadre type téléphone, en-tête personnalisé,
 * contenu (Outlet) et barre de navigation du bas.
 */
export default function Shell() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="phone-shell">
      {/* En-tête */}
      <header className="flex items-center justify-between px-5 pt-6 pb-2 shrink-0">
        <Link to="/profil" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl shadow-[var(--shadow-soft)]">
            {user?.avatar ?? "🌱"}
          </div>
          <div className="leading-tight">
            <p className="text-xs text-muted font-semibold">Bonjour 👋</p>
            <p className="font-display font-semibold text-leaf-dark">{user?.name ?? "Famille"}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/favoris")}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[var(--shadow-soft)] text-berry active:scale-95 transition"
            aria-label="Favoris"
          >
            <Heart size={20} fill={favorites.length ? "currentColor" : "none"} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-berry text-white text-[10px] font-bold grid place-items-center">
                {favorites.length}
              </span>
            )}
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[var(--shadow-soft)] text-leaf-dark active:scale-95 transition"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
        </div>
      </header>

      <main className="screen no-scrollbar">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
