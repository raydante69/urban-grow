/**
 * UrbanGrow — Application mobile
 *
 * Flux : page de connexion -> selon le rôle (défini en interne, rattaché au
 * compte), l'utilisateur arrive sur l'app Famille (complète) ou sur l'espace
 * Enseignant (tableau de bord classe, suivi des élèves, séances clé-en-main).
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import { AuthProvider, useAuth } from "./auth";
import { FavoritesProvider } from "./store";
import { TeacherProvider } from "./teacherStore";

import Shell from "./components/Shell";
import Login from "./pages/Login";

// Famille
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

// Enseignant
import TeacherShell from "./components/TeacherShell";
import Dashboard from "./pages/teacher/Dashboard";
import ClassList from "./pages/teacher/ClassList";
import StudentDetail from "./pages/teacher/StudentDetail";
import Sessions from "./pages/teacher/Sessions";
import SessionDetail from "./pages/teacher/SessionDetail";
import Resources from "./pages/teacher/Resources";
import ClassProfile from "./pages/teacher/ClassProfile";

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

/** N'autorise que les enseignants connectés ; sinon redirige. */
function TeacherOnly({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "family") return <Navigate to="/" replace />;
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

        {/* Espace Enseignant — coquille + barre de navigation 5 onglets */}
        <Route
          element={
            <TeacherOnly>
              <TeacherShell />
            </TeacherOnly>
          }
        >
          <Route path="/enseignant" element={<Dashboard />} />
          <Route path="/enseignant/classe" element={<ClassList />} />
          <Route path="/enseignant/classe/:id" element={<StudentDetail />} />
          <Route path="/enseignant/seances" element={<Sessions />} />
          <Route path="/enseignant/seances/:id" element={<SessionDetail />} />
          {/* Supports lancés en classe (réutilisent les jeux / activités) */}
          <Route path="/enseignant/jeu/:id" element={<GamePlay />} />
          <Route path="/enseignant/activite/:id" element={<ActivityDetail />} />
          <Route path="/enseignant/ressources" element={<Resources />} />
          <Route path="/enseignant/profil" element={<ClassProfile />} />
        </Route>

        <Route path="*" element={<Navigate to={user ? (user.role === "teacher" ? "/enseignant" : "/") : "/login"} replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <TeacherProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TeacherProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
