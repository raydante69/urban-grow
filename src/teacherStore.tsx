/**
 * État de l'espace enseignant (démo, persisté en localStorage) :
 *  - liste des élèves modifiable (ajout / suppression)
 *  - séances mises en favori (étoile)
 *  - séances marquées « faite » avec une date
 *  - informations de la classe (nom, école, niveau)
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { seedStudents, defaultClassInfo, type Student, type ClassInfo } from "./data";

interface TeacherState {
  students: Student[];
  addStudent: (name: string) => void;
  removeStudent: (id: string) => void;

  starred: string[];
  isStarred: (id: string) => boolean;
  toggleStar: (id: string) => void;

  doneDates: Record<string, string>;
  markDone: (id: string, date: string) => void;
  unmarkDone: (id: string) => void;

  classInfo: ClassInfo;
  updateClass: (partial: Partial<ClassInfo>) => void;
}

const Ctx = createContext<TeacherState | null>(null);
const KEY = "urbangrow.teacher";

interface Persisted {
  students: Student[];
  starred: string[];
  doneDates: Record<string, string>;
  classInfo: ClassInfo;
}

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Persisted;
  } catch {
    /* ignore */
  }
  return { students: seedStudents, starred: [], doneDates: {}, classInfo: defaultClassInfo };
}

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const addStudent: TeacherState["addStudent"] = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const avatars = ["🧒", "👦", "👧", "🧒🏽", "👦🏾", "👧🏻", "🧒🏼"];
    const student: Student = {
      id: `s-${Date.now()}`,
      name: trimmed,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      progress: 0,
      activitiesDone: 0,
      activitiesTotal: 12,
      badges: 0,
      status: "en-retard",
      scores: { quiz: 0, memory: 0, count: 0, cycle: 0 },
    };
    setState((s) => ({ ...s, students: [...s.students, student] }));
  };

  const removeStudent: TeacherState["removeStudent"] = (id) =>
    setState((s) => ({ ...s, students: s.students.filter((st) => st.id !== id) }));

  const isStarred = (id: string) => state.starred.includes(id);
  const toggleStar: TeacherState["toggleStar"] = (id) =>
    setState((s) => ({
      ...s,
      starred: s.starred.includes(id) ? s.starred.filter((x) => x !== id) : [id, ...s.starred],
    }));

  const markDone: TeacherState["markDone"] = (id, date) =>
    setState((s) => ({ ...s, doneDates: { ...s.doneDates, [id]: date } }));
  const unmarkDone: TeacherState["unmarkDone"] = (id) =>
    setState((s) => {
      const next = { ...s.doneDates };
      delete next[id];
      return { ...s, doneDates: next };
    });

  const updateClass: TeacherState["updateClass"] = (partial) =>
    setState((s) => ({ ...s, classInfo: { ...s.classInfo, ...partial } }));

  return (
    <Ctx.Provider
      value={{
        students: state.students,
        addStudent,
        removeStudent,
        starred: state.starred,
        isStarred,
        toggleStar,
        doneDates: state.doneDates,
        markDone,
        unmarkDone,
        classInfo: state.classInfo,
        updateClass,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useTeacher() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTeacher doit être utilisé dans un TeacherProvider");
  return ctx;
}
