import { Outlet, Link } from "react-router-dom";
import { Bell, Settings } from "lucide-react";
import { useAuth } from "../auth";
import { useTeacher } from "../teacherStore";
import TeacherBottomNav from "./TeacherBottomNav";

/**
 * Coquille de l'espace enseignant : cadre téléphone, en-tête « pro » (classe +
 * enseignant·e, accent bleu), contenu et barre de navigation à 5 onglets.
 */
export default function TeacherShell() {
  const { user } = useAuth();
  const { classInfo } = useTeacher();

  return (
    <div className="phone-shell">
      <header className="flex items-center justify-between px-5 pt-6 pb-2 shrink-0">
        <Link to="/enseignant/profil" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl shadow-[var(--shadow-soft)]">
            {user?.avatar ?? "🧑‍🏫"}
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-sky">Espace enseignant</p>
            <p className="font-display font-semibold text-leaf-dark">
              {classInfo.name} · {user?.name}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[var(--shadow-soft)] text-leaf-dark active:scale-95 transition"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          <Link
            to="/enseignant/profil"
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[var(--shadow-soft)] text-sky active:scale-95 transition"
            aria-label="Réglages de la classe"
          >
            <Settings size={20} />
          </Link>
        </div>
      </header>

      <main className="screen no-scrollbar">
        <Outlet />
      </main>

      <TeacherBottomNav />
    </div>
  );
}
