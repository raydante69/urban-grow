import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Star, CheckCircle2, ChevronRight, GraduationCap } from "lucide-react";
import { sessions, type Discipline } from "../../data";
import { useTeacher } from "../../teacherStore";

export const disciplineStyle: Record<Discipline, string> = {
  SVT: "bg-leaf-soft text-leaf-dark",
  Maths: "bg-sky/15 text-sky",
  Français: "bg-sun/20 text-leaf-dark",
};

const filters: ("Toutes" | Discipline)[] = ["Toutes", "SVT", "Maths", "Français"];

export default function Sessions() {
  const { isStarred, toggleStar, doneDates } = useTeacher();
  const [filter, setFilter] = useState<"Toutes" | Discipline>("Toutes");
  const list = filter === "Toutes" ? sessions : sessions.filter((s) => s.discipline === filter);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl">Séances pédagogiques 📘</h1>
        <p className="text-muted font-semibold mt-1">
          Des séances clé-en-main, objectifs programme déjà écrits.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`pill whitespace-nowrap px-4 py-2 transition ${
              filter === f ? "bg-sky text-white" : "bg-white text-muted shadow-[var(--shadow-soft)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((s) => {
          const done = doneDates[s.id];
          const starred = isStarred(s.id);
          return (
            <Link key={s.id} to={`/enseignant/seances/${s.id}`} className="card active:scale-[0.99] transition">
              <div className="flex gap-3">
                <img src={s.image} alt={s.title} loading="lazy" className="thumb h-16 w-16 shrink-0 rounded-2xl" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`pill ${disciplineStyle[s.discipline]}`}>{s.discipline}</span>
                    <span className="text-[11px] font-bold text-muted">{s.level}</span>
                  </div>
                  <p className="mt-1 font-display font-semibold text-leaf-dark leading-tight truncate">{s.title}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted font-semibold">
                    <Clock size={13} /> {s.duration}
                  </span>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); toggleStar(s.id); }}
                  className={`grid h-9 w-9 self-start place-items-center rounded-full transition active:scale-90 ${
                    starred ? "bg-sun/20 text-sun" : "bg-white/80 text-muted"
                  }`}
                  aria-label={starred ? "Retirer le favori" : "Mettre en favori"}
                >
                  <Star size={18} fill={starred ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-leaf-dark/5 pt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold">
                  <GraduationCap size={14} className="text-sky" />
                  <span className="text-muted line-clamp-1">{s.objective}</span>
                </span>
                {done ? (
                  <span className="pill bg-leaf-soft text-leaf-dark shrink-0">
                    <CheckCircle2 size={13} /> Faite
                  </span>
                ) : (
                  <ChevronRight size={16} className="text-muted shrink-0" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
