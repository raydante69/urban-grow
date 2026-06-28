import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, ChevronRight } from "lucide-react";
import { useTeacher } from "../../teacherStore";
import type { StudentStatus } from "../../data";

export const statusStyle: Record<StudentStatus, { label: string; cls: string; bar: string }> = {
  "avance": { label: "En avance", cls: "bg-leaf-soft text-leaf-dark", bar: "bg-leaf" },
  "a-jour": { label: "À jour", cls: "bg-sky/15 text-sky", bar: "bg-sky" },
  "en-retard": { label: "À accompagner", cls: "bg-berry/10 text-berry", bar: "bg-berry" },
};

const filters: { key: "all" | StudentStatus; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "avance", label: "En avance" },
  { key: "a-jour", label: "À jour" },
  { key: "en-retard", label: "À accompagner" },
];

export default function ClassList() {
  const { students } = useTeacher();
  const [filter, setFilter] = useState<"all" | StudentStatus>("all");
  const list = filter === "all" ? students : students.filter((s) => s.status === filter);

  const counts = {
    avance: students.filter((s) => s.status === "avance").length,
    "a-jour": students.filter((s) => s.status === "a-jour").length,
    "en-retard": students.filter((s) => s.status === "en-retard").length,
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl">Ma classe 👥</h1>
        <p className="text-muted font-semibold mt-1">
          Progression de chaque élève — sans notes, juste un suivi visuel.
        </p>
      </header>

      {/* Répartition */}
      <div className="card grid grid-cols-3 divide-x divide-leaf-dark/5 text-center">
        <Mini value={counts.avance} label="En avance" tint="text-leaf" />
        <Mini value={counts["a-jour"]} label="À jour" tint="text-sky" />
        <Mini value={counts["en-retard"]} label="À accompagner" tint="text-berry" />
      </div>

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`pill whitespace-nowrap px-4 py-2 transition ${
              filter === f.key ? "bg-sky text-white" : "bg-white text-muted shadow-[var(--shadow-soft)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste élèves */}
      <div className="space-y-3">
        {list.map((s) => {
          const st = statusStyle[s.status];
          return (
            <Link key={s.id} to={`/enseignant/classe/${s.id}`} className="card flex items-center gap-3 active:scale-[0.99] transition">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-soft text-2xl">
                {s.avatar}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display font-semibold text-leaf-dark truncate">{s.name}</p>
                  <span className={`pill ${st.cls} shrink-0`}>{st.label}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-leaf-dark/5 overflow-hidden">
                    <div className={`h-full rounded-full ${st.bar}`} style={{ width: `${s.progress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-muted w-9 text-right">{s.progress}%</span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted font-semibold">
                  <span>{s.activitiesDone}/{s.activitiesTotal} activités</span>
                  <span className="inline-flex items-center gap-1"><Award size={13} className="text-sun" /> {s.badges} badges</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted shrink-0" />
            </Link>
          );
        })}
        {list.length === 0 && (
          <p className="text-center text-sm text-muted py-8">Aucun élève dans cette catégorie.</p>
        )}
      </div>
    </div>
  );
}

function Mini({ value, label, tint }: { value: number; label: string; tint: string }) {
  return (
    <div className="px-2">
      <p className={`font-display font-bold text-xl ${tint}`}>{value}</p>
      <p className="text-[11px] text-muted leading-tight mt-0.5">{label}</p>
    </div>
  );
}
