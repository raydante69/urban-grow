import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, Droplets, Sun, Waves, ChevronRight, Users, TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";
import { plants, sensors, classGarden, nextSession, sessions, type Stage } from "../../data";
import { useTeacher } from "../../teacherStore";

const stageStyles: Record<Stage, string> = {
  "Mûr": "bg-leaf-soft text-leaf-dark",
  "Croissance": "bg-sky/15 text-sky",
  "Germination": "bg-sun/20 text-leaf-dark",
  "Semé": "bg-leaf-dark/5 text-muted",
};

const alertTone = {
  warn: "bg-berry/10 text-berry",
  info: "bg-sky/15 text-sky",
} as const;

export default function Dashboard() {
  const { students, doneDates } = useTeacher();
  const avg = students.length
    ? Math.round(students.reduce((a, s) => a + s.progress, 0) / students.length)
    : 0;
  const sessionsDone = Object.keys(doneDates).length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl">Tableau de bord</h1>
        <p className="text-muted font-semibold mt-1">Votre classe en un coup d'œil ce matin.</p>
      </header>

      {/* Prochaine séance */}
      <Link
        to={`/enseignant/seances/${nextSession.sessionId}`}
        className="block rounded-3xl bg-gradient-to-br from-sky to-leaf-dark p-5 text-white shadow-[var(--shadow-card)] active:scale-[0.99] transition"
      >
        <div className="flex items-center gap-2 text-sm font-bold opacity-90">
          <CalendarClock size={16} /> Prochaine séance prévue
        </div>
        <p className="mt-1 text-xl font-display font-semibold leading-snug">{nextSession.title}</p>
        <p className="mt-1 text-sm text-white/85">
          {nextSession.discipline} · {nextSession.date} à {nextSession.time} →
        </p>
      </Link>

      {/* Stats classe */}
      <section className="grid grid-cols-3 gap-3">
        <Stat icon={<Users size={18} />} value={students.length} label="Élèves" tint="bg-sky/15 text-sky" />
        <Stat icon={<TrendingUp size={18} />} value={`${avg}%`} label="Progression" tint="bg-leaf-soft text-leaf-dark" />
        <Stat icon={<CheckCircle2 size={18} />} value={sessionsDone} label="Séances faites" tint="bg-sun/20 text-leaf-dark" />
      </section>

      {/* Alertes techniques */}
      <section>
        <h2 className="text-xl mb-3 flex items-center gap-2">
          <AlertTriangle size={18} className="text-berry" /> Alertes potager
        </h2>
        <div className="space-y-3">
          {classGarden.alerts.map((a) => (
            <div key={a.id} className="card flex items-start gap-3">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl ${alertTone[a.tone]}`}>
                {a.icon}
              </span>
              <div>
                <p className="font-display font-semibold text-leaf-dark leading-tight">{a.title}</p>
                <p className="mt-0.5 text-sm text-muted leading-snug">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Potager partagé */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl">Potager de la classe</h2>
          <span className="pill bg-white text-muted shadow-[var(--shadow-soft)]">
            {classGarden.bacs} bacs · {classGarden.plantsActive} plantes
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <Sensor icon={<Droplets size={18} />} label="Humidité" value={`${sensors.humidity} %`} tint="bg-sky/15 text-sky" />
          <Sensor icon={<Sun size={18} />} label="Lumière" value={`${sensors.light.toLocaleString("fr-FR")} lux`} tint="bg-sun/20 text-leaf-dark" />
          <Sensor icon={<Waves size={18} />} label="Réservoir" value={`${sensors.water} %`} tint="bg-berry/10 text-berry" />
          <Sensor icon={<Droplets size={18} />} label="Temp." value={`${sensors.temperature} °C`} tint="bg-leaf-soft text-leaf-dark" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {plants.map((p) => (
            <div key={p.id} className="card !p-0 overflow-hidden">
              <div className="relative h-20">
                <img src={p.image} alt={p.name} loading="lazy" className="thumb h-full w-full" />
                <span className={`pill absolute top-2 right-2 ${stageStyles[p.stage]} shadow-sm`}>{p.stage}</span>
              </div>
              <div className="p-3">
                <p className="font-display font-semibold text-leaf-dark text-sm">{p.name}</p>
                <div className="mt-2 h-1.5 rounded-full bg-leaf-dark/5 overflow-hidden">
                  <div className="h-full rounded-full bg-leaf" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link to="/enseignant/classe" className="btn-ghost w-full text-sky">
        Voir le suivi des élèves <ChevronRight size={16} />
      </Link>
    </div>
  );
}

function Stat({ icon, value, label, tint }: { icon: ReactNode; value: ReactNode; label: string; tint: string }) {
  return (
    <div className="card !p-3 text-center">
      <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-2xl ${tint}`}>{icon}</span>
      <p className="mt-2 font-display font-bold text-leaf-dark text-lg leading-none">{value}</p>
      <p className="text-[11px] text-muted mt-1">{label}</p>
    </div>
  );
}

function Sensor({ icon, label, value, tint }: { icon: ReactNode; label: string; value: string; tint: string }) {
  return (
    <div className="card !p-3 flex items-center gap-3">
      <span className={`flex h-9 w-9 items-center justify-center rounded-2xl ${tint}`}>{icon}</span>
      <div>
        <p className="text-xs font-bold text-muted">{label}</p>
        <p className="font-display font-semibold text-leaf-dark leading-none">{value}</p>
      </div>
    </div>
  );
}
