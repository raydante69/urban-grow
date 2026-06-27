import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Mail, Lock, Eye, EyeOff, Users, GraduationCap, ArrowRight } from "lucide-react";
import { useAuth } from "../auth";

export default function Login() {
  const { login, loginAs } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) {
      setError(res.error ?? "Connexion impossible.");
      return;
    }
    navigate("/");
  };

  // Connexion rapide de démo. Le rôle est défini en interne (rattaché au compte).
  const quick = (role: "family" | "teacher") => {
    loginAs(role);
    navigate(role === "family" ? "/" : "/enseignant");
  };

  return (
    <div className="phone-shell">
      <div className="screen no-scrollbar flex flex-col">
        {/* Logo + accroche */}
        <div className="pt-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-leaf text-white shadow-[var(--shadow-card)]">
            <Leaf size={40} strokeWidth={2.4} />
          </div>
          <h1 className="mt-5 text-3xl">UrbanGrow</h1>
          <p className="mt-1 text-muted font-semibold">
            Le potager connecté de toute la famille 🌿
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="label">E-mail</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="famille@urbangrow.fr"
                className="input pl-11"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="label">Mot de passe</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="input pl-11 pr-11"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                aria-label={show ? "Masquer" : "Afficher"}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-2xl bg-berry/10 px-4 py-2.5 text-sm font-semibold text-berry">
              {error}
            </p>
          )}

          <button type="submit" className="btn-leaf w-full text-base">
            Se connecter <ArrowRight size={18} />
          </button>
        </form>

        {/* Connexion rapide démo */}
        <div className="mt-8">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-muted">
            <span className="h-px flex-1 bg-leaf-dark/10" />
            Démo rapide
            <span className="h-px flex-1 bg-leaf-dark/10" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => quick("family")}
              className="card flex flex-col items-center gap-2 py-5 text-center active:scale-[0.97] transition"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-soft text-leaf-dark">
                <Users size={24} />
              </span>
              <span className="font-display font-semibold text-leaf-dark">Famille</span>
              <span className="text-[11px] text-muted leading-tight">App complète</span>
            </button>

            <button
              onClick={() => quick("teacher")}
              className="card flex flex-col items-center gap-2 py-5 text-center active:scale-[0.97] transition"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/15 text-sky">
                <GraduationCap size={24} />
              </span>
              <span className="font-display font-semibold text-leaf-dark">Enseignant</span>
              <span className="text-[11px] text-muted leading-tight">Bientôt disponible</span>
            </button>
          </div>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-muted">
            Comptes de démo · <b>famille@urbangrow.fr</b> / famille ·{" "}
            <b>prof@urbangrow.fr</b> / prof
            <br />
            Le profil (famille ou enseignant) est défini en interne et détermine les pages affichées.
          </p>
        </div>
      </div>
    </div>
  );
}
