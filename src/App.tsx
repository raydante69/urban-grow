/**
 * UrbanGrow — Application mobile Famille
 *
 * Flux : page de connexion -> selon le rôle (défini en interne, rattaché au
 * compte), l'utilisateur arrive sur l'app Famille (complète) ou sur l'espace
 * Enseignant (placeholder, à développer plus tard).
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import { AuthProvider, useAuth } from "./auth";
import { FavoritesProvider } from "./store";

import Shell from "./components/Shell";
import Login from "./pages/Login";
import TeacherHome from "./pages/TeacherHome";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Games from "./pages/Games";
import GamePlay from "./pages/GamePlay";
import Content from "./pages/Content";
import ContentDetail from "./pages/ContentDetail";
import Favorites from "./pages/Favorites";
import Community from "./pages/Community";
import Profile from "./pages/Profile";

/** Remonte en haut de l'écran à chaque changement de page. */
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.querySelector(".screen")?.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** N'autorise que les familles connectées ; sinon redirige. */
function FamilyOnly({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "teacher") return <Navigate to="/enseignant" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <ScrollTop />
      <Routes>
        {/* Connexion : si déjà connecté, on saute vers la bonne section */}
        <Route
          path="/login"
          element={
            user ? <Navigate to={user.role === "teacher" ? "/enseignant" : "/"} replace /> : <Login />
          }
        />

        {/* Espace enseignant (placeholder) */}
        <Route
          path="/enseignant"
          element={
            !user ? <Navigate to="/login" replace />
              : user.role === "teacher" ? <TeacherHome />
              : <Navigate to="/" replace />
          }
        />

        {/* App Famille — coquille avec barre de navigation */}
        <Route
          element={
            <FamilyOnly>
              <Shell />
            </FamilyOnly>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/activites" element={<Activities />} />
          <Route path="/activites/:id" element={<ActivityDetail />} />
          <Route path="/jeux" element={<Games />} />
          <Route path="/jeux/:id" element={<GamePlay />} />
          <Route path="/contenu" element={<Content />} />
          <Route path="/contenu/:id" element={<ContentDetail />} />
          <Route path="/favoris" element={<Favorites />} />
          <Route path="/communaute" element={<Community />} />
          <Route path="/profil" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}
