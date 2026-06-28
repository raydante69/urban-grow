import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Award, Sprout, Trophy } from "lucide-react";
import { useTeacher } from "../../teacherStore";
import { statusStyle } from "./ClassList";

const scoreLabels: { key: "quiz" | "memory" | "count" | "cycle"; label: string; emoji: string }[] = [
  { key: "quiz", label: "Quiz de la nature", emoji: "🧠" },
  { key: "memory", label: "Memory des plantes", emoji: "🃏" },
  { key: "count", label: "Compte les graines", emoji: "🔢" },
  { key: "cycle", label: "Cycle de la plante", emoji: "🌱" },
];

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students } = useTeacher();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="text-center pt-20">
        <p className="text-5xl">🤔</p>
        <p className="mt-4 font-semibold text-muted">Élève introuvable.</p>
        <Link to="/enseignant/classe" className="btn-ghost mt-6 inline-flex text-sky">Retour à la classe</Link>
      </div>
    );
  }

  const st = statusStyle[student.status];

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
        <h1 className="text-xl">Fiche élève</h1>
      </div>

      {/* Carte élève */}
      <div className="card text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-leaf-soft text-4xl">
          {student.avatar}
        </div>
        <h2 className="mt-3 text-xl">{student.name}</h2>
        <span className={`mt-1 inline-block pill ${st.cls}`}>{st.label}</span>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-bold text-muted mb-1">
            <span>Avancement du programme</span>
            <span>{student.progress}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-leaf-dark/5 overflow-hidden">
            <div className={`h-full rounded-full ${st.bar}`} style={{ width: `${student.progress}%` }} />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 divide-x divide-leaf-dark/5">
          <div className="flex flex-col items-center gap-1">
            <Sprout size={18} className="text-leaf" />
            <span className="font-display font-bold text-leaf-dark text-lg leading-none">
              {student.activitiesDone}/{student.activitiesTotal}
            </span>
            <span className="text-[11px] text-muted">Activités faites</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Award size={18} className="text-sun" />
            <span className="font-display font-bold text-leaf-dark text-lg leading-none">{student.badges}</span>
            <span className="text-[11px] text-muted">Badges</span>
          </div>
        </div>
      </div>

      {/* Scores aux jeux */}
      <section>
        <h2 className="text-lg mb-3 flex items-center gap-2">
          <Trophy size={18} className="text-sun" /> Résultats aux jeux
        </h2>
        <div className="card space-y-4">
          {scoreLabels.map((g) => {
            const v = student.scores[g.key];
            const tint = v >= 80 ? "bg-leaf" : v >= 50 ? "bg-sky" : "bg-berry";
            return (
              <div key={g.key}>
                <div className="flex items-center justify-between text-sm font-semibold text-leaf-dark mb-1">
                  <span>{g.emoji} {g.label}</span>
                  <span className="text-muted">{v}%</span>
                </div>
                <div className="h-2 rounded-full bg-leaf-dark/5 overflow-hidden">
                  <div className={`h-full rounded-full ${tint}`} style={{ width: `${v}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {student.status === "en-retard" && (
        <div className="card bg-berry/5 border-berry/20 text-sm font-semibold text-leaf-dark">
          💡 Cet élève a besoin d'accompagnement. Proposez-lui de rejouer au quiz et de reprendre la
          séance « Du semis à la pousse » en binôme.
        </div>
      )}
    </div>
  );
}
