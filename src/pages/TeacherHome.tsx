import { useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, Hammer } from "lucide-react";
import { useAuth } from "../auth";

/**
 * Espace enseignant — réservé à une prochaine itération.
 * On affiche une page d'attente : la version Famille est livrée d'abord.
 */
export default function TeacherHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="phone-shell">
      <div className="screen no-scrollbar flex flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-sky/15 text-sky">
          <GraduationCap size={40} strokeWidth={2.2} />
        </div>
        <h1 className="mt-6 text-2xl">Espace enseignant</h1>
        <p className="mt-1 font-semibold text-muted">Bonjour {user?.name} 🧑‍🏫</p>

        <div className="card mt-8 w-full text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sun/20 text-leaf-dark">
              <Hammer size={20} />
            </span>
            <h3 className="text-lg">En construction</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            La version enseignant (suivi de classe, kits pédagogiques, fiches d'activités à
            imprimer, progression des élèves…) sera développée dans une prochaine itération.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Cette première livraison concerne la <b className="text-leaf-dark">version Famille</b>.
          </p>
        </div>

        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="btn-ghost mt-8 w-full text-berry"
        >
          <LogOut size={18} /> Se déconnecter
        </button>
      </div>
    </div>
  );
}
