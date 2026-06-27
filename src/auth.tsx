/**
 * Authentification (démo, sans back-end).
 *
 * Le rôle famille / enseignant est défini "en interne" : il est rattaché au
 * compte (voir `accounts` dans data.ts), et non choisi par l'utilisateur à
 * l'inscription. Selon ce rôle, l'application affiche des pages différentes :
 *  - family  -> l'app Famille complète (cette itération)
 *  - teacher -> espace enseignant (à construire dans une prochaine itération)
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { accounts, type Account, type Role } from "./data";

interface AuthState {
  user: Account | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  loginAs: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = "urbangrow.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Account) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login: AuthState["login"] = (email, password) => {
    const found = accounts.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
    );
    if (!found) return { ok: false, error: "E-mail ou mot de passe incorrect." };
    setUser(found);
    return { ok: true };
  };

  // Connexion rapide de démo : on récupère le premier compte du rôle demandé.
  const loginAs: AuthState["loginAs"] = (role) => {
    const found = accounts.find((a) => a.role === role);
    if (found) setUser(found);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return ctx;
}
