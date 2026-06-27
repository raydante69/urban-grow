import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Baby, Gauge, Check, Lightbulb, PartyPopper } from "lucide-react";
import { activities } from "../data";
import FavButton from "../components/FavButton";

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activities.find((a) => a.id === id);
  const [done, setDone] = useState<Set<number>>(new Set());

  if (!activity) {
    return (
      <div className="text-center pt-20">
        <p className="text-5xl">🤔</p>
        <p className="mt-4 font-semibold text-muted">Activité introuvable.</p>
        <Link to="/activites" className="btn-leaf mt-6 inline-flex">Retour aux activités</Link>
      </div>
    );
  }

  const toggleStep = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const allDone = done.size === activity.steps.length;

  return (
    <div className="space-y-5">
      {/* En-tête illustré */}
      <div className="-mx-5 -mt-5 px-5 pt-5 pb-6" style={{ background: activity.color }}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 text-leaf-dark active:scale-95 transition"
            aria-label="Retour"
          >
            <ArrowLeft size={20} />
          </button>
          <FavButton
            item={{ id: activity.id, kind: "activity", title: activity.title, emoji: activity.emoji, to: `/activites/${activity.id}` }}
            size={20}
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-6xl">{activity.emoji}</span>
          <h1 className="mt-2 text-2xl">{activity.title}</h1>
          <p className="mt-1 text-sm font-semibold text-leaf-dark/70">{activity.intro}</p>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <span className="pill bg-white/70 text-leaf-dark"><Clock size={13} /> {activity.duration}</span>
          <span className="pill bg-white/70 text-leaf-dark"><Baby size={13} /> {activity.age}</span>
          <span className="pill bg-white/70 text-leaf-dark"><Gauge size={13} /> {activity.difficulty}</span>
        </div>
      </div>

      {/* Matériel */}
      <section className="card">
        <h2 className="text-lg mb-3">🎒 Le matériel</h2>
        <ul className="grid grid-cols-1 gap-2">
          {activity.materials.map((m) => (
            <li key={m} className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-leaf shrink-0" />
              {m}
            </li>
          ))}
        </ul>
      </section>

      {/* Étapes — tutoriel pas à pas */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg">📋 Le tutoriel</h2>
          <span className="pill bg-white text-muted shadow-[var(--shadow-soft)]">
            {done.size}/{activity.steps.length}
          </span>
        </div>
        <div className="space-y-3">
          {activity.steps.map((s, i) => {
            const checked = done.has(i);
            return (
              <button
                key={i}
                onClick={() => toggleStep(i)}
                className={`card w-full text-left flex gap-3 transition active:scale-[0.99] ${
                  checked ? "opacity-70" : ""
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display font-bold transition ${
                    checked ? "bg-leaf text-white" : "bg-leaf-soft text-leaf-dark"
                  }`}
                >
                  {checked ? <Check size={16} /> : i + 1}
                </span>
                <div className="flex-1">
                  <p className={`font-display font-semibold text-leaf-dark ${checked ? "line-through" : ""}`}>
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted leading-snug">{s.text}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Astuce */}
      <section className="card flex items-start gap-3 bg-sun/10 border-sun/20">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sun/30 text-leaf-dark">
          <Lightbulb size={18} />
        </span>
        <p className="text-sm font-semibold text-leaf-dark leading-snug">{activity.tip}</p>
      </section>

      {/* Félicitations */}
      {allDone && (
        <section className="card text-center bg-leaf text-white">
          <PartyPopper size={32} className="mx-auto" />
          <p className="mt-2 font-display font-semibold text-lg">Bravo, activité terminée ! 🎉</p>
          <p className="text-sm text-white/80">Partagez votre réussite avec la communauté.</p>
          <Link to="/communaute" className="btn-ghost mt-4 inline-flex text-leaf-dark">
            Voir la communauté
          </Link>
        </section>
      )}
    </div>
  );
}
