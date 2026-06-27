import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, LogOut, Heart, Sprout, Trophy, Bell, Shield, ChevronRight } from "lucide-react";
import { useAuth } from "../auth";
import { useFavorites } from "../store";
import { plants } from "../data";

export default function Profile() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const stats = [
    { icon: <Sprout size={18} />, value: plants.length, label: "Plantes" },
    { icon: <Heart size={18} />, value: favorites.length, label: "Favoris" },
    { icon: <Trophy size={18} />, value: 3, label: "Badges" },
  ];

  const menu = [
    { icon: <Heart size={18} />, label: "Mes favoris", to: "/favoris" },
    { icon: <Bell size={18} />, label: "Notifications", to: "/profil" },
    { icon: <Shield size={18} />, label: "Confidentialité", to: "/profil" },
  ];

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
        <h1 className="text-2xl">Mon profil</h1>
      </div>

      {/* Carte profil */}
      <div className="card text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-leaf-soft text-4xl">
          {user?.avatar ?? "🌱"}
        </div>
        <h2 className="mt-3 text-xl">{user?.name}</h2>
        <p className="text-sm text-muted font-semibold">{user?.email}</p>
        <span className="mt-2 inline-block pill bg-leaf-soft text-leaf-dark">
          Compte Famille
        </span>

        <div className="mt-5 grid grid-cols-3 divide-x divide-leaf-dark/5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-2">
              <span className="text-leaf">{s.icon}</span>
              <span className="font-display font-bold text-leaf-dark text-lg leading-none">{s.value}</span>
              <span className="text-[11px] text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="card !p-2">
        {menu.map((m, i) => (
          <Link
            key={m.label}
            to={m.to}
            className={`flex items-center gap-3 px-3 py-3.5 active:scale-[0.99] transition ${
              i < menu.length - 1 ? "border-b border-leaf-dark/5" : ""
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-soft text-leaf-dark">
              {m.icon}
            </span>
            <span className="flex-1 font-semibold text-ink">{m.label}</span>
            <ChevronRight size={18} className="text-muted" />
          </Link>
        ))}
      </div>

      <button
        onClick={() => { logout(); navigate("/login"); }}
        className="btn-ghost w-full text-berry"
      >
        <LogOut size={18} /> Se déconnecter
      </button>

      <p className="text-center text-[11px] text-muted pb-2">UrbanGrow Famille · v1.0</p>
    </div>
  );
}
