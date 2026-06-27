import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Droplets, Sun, Waves, Thermometer, ChevronRight, Sparkles, Leaf } from "lucide-react";
import { plants, sensors, advice, impact, img, type Stage } from "../data";

const stageStyles: Record<Stage, string> = {
  "Mûr": "bg-leaf-soft text-leaf-dark",
  "Croissance": "bg-sky/15 text-sky",
  "Germination": "bg-sun/20 text-leaf-dark",
  "Semé": "bg-leaf-dark/5 text-muted",
};

const toneStyles = {
  warn: "bg-berry/10 text-berry",
  good: "bg-leaf-soft text-leaf-dark",
  info: "bg-sky/15 text-sky",
} as const;

export default function Home() {
  const ready = plants.filter((p) => p.stage === "Mûr").length;

  return (
    <div className="space-y-6">
      {/* Bannière récolte (photo réelle + dégradé) */}
      <Link
        to="/activites/recolte-en-famille"
        className="relative block overflow-hidden rounded-3xl shadow-[var(--shadow-card)] active:scale-[0.99] transition"
      >
        <img src={img.garden} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-leaf-dark/90 via-leaf-dark/70 to-leaf/50" />
        <div className="relative p-5 text-white">
          <div className="flex items-center gap-2 text-sm font-bold opacity-90">
            <Sparkles size={16} /> Bonne nouvelle
          </div>
          <p className="mt-1 text-xl font-display font-semibold leading-snug">
            {ready} plante{ready > 1 ? "s" : ""} prête{ready > 1 ? "s" : ""} à récolter
          </p>
          <p className="mt-1 text-sm text-white/85">
            Lancez l'activité « La grande récolte » en famille →
          </p>
        </div>
      </Link>

      {/* Potager actif */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl flex items-center gap-2">
            <Leaf size={20} className="text-leaf" /> Mon potager
          </h2>
          <span className="pill bg-white text-muted shadow-[var(--shadow-soft)]">
            {plants.length} actives
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {plants.map((p) => (
            <div key={p.id} className="card !p-0 overflow-hidden">
              <div className="relative h-24">
                <img src={p.image} alt={p.name} loading="lazy" className="thumb h-full w-full" />
                <span className={`pill absolute top-2 right-2 ${stageStyles[p.stage]} shadow-sm`}>
                  {p.stage}
                </span>
              </div>
              <div className="p-3">
                <p className="font-display font-semibold text-leaf-dark">{p.name}</p>
                <div className="mt-2 h-2 rounded-full bg-leaf-dark/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-leaf transition-all"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capteurs */}
      <section>
        <h2 className="text-xl mb-3">En direct du potager</h2>
        <div className="grid grid-cols-2 gap-3">
          <Sensor icon={<Droplets size={18} />} label="Humidité" value={`${sensors.humidity} %`} tint="bg-sky/15 text-sky" />
          <Sensor icon={<Sun size={18} />} label="Lumière" value={`${sensors.light.toLocaleString("fr-FR")} lux`} tint="bg-sun/20 text-leaf-dark" />
          <Sensor icon={<Waves size={18} />} label="Réservoir" value={`${sensors.water} %`} tint="bg-berry/10 text-berry" />
          <Sensor icon={<Thermometer size={18} />} label="Température" value={`${sensors.temperature} °C`} tint="bg-leaf-soft text-leaf-dark" />
        </div>
      </section>

      {/* Conseils (anciennement recettes -> activités famille) */}
      <section>
        <h2 className="text-xl mb-3">Conseils du jour</h2>
        <div className="space-y-3">
          {advice.map((a) => (
            <Link key={a.id} to={a.to} className="card flex items-start gap-3 active:scale-[0.99] transition">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl ${toneStyles[a.tone]}`}>
                {a.icon}
              </span>
              <div className="flex-1">
                <p className="font-display font-semibold text-leaf-dark leading-tight">{a.title}</p>
                <p className="mt-0.5 text-sm text-muted leading-snug">{a.text}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-leaf">
                  {a.cta} <ChevronRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section>
        <h2 className="text-xl mb-3">Notre impact ce mois-ci 🌍</h2>
        <div className="card grid grid-cols-3 divide-x divide-leaf-dark/5 text-center">
          <Impact value={impact.water} label="Eau économisée" />
          <Impact value={impact.carbon} label="CO₂ évité" />
          <Impact value={impact.savings} label="Économies" />
        </div>
      </section>
    </div>
  );
}

function Sensor({ icon, label, value, tint }: { icon: ReactNode; label: string; value: string; tint: string }) {
  return (
    <div className="card !p-4 flex items-center gap-3">
      <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tint}`}>{icon}</span>
      <div>
        <p className="text-xs font-bold text-muted">{label}</p>
        <p className="font-display font-semibold text-leaf-dark text-lg leading-none">{value}</p>
      </div>
    </div>
  );
}

function Impact({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-2">
      <p className="font-display font-bold text-leaf text-xl">{value}</p>
      <p className="text-[11px] text-muted leading-tight mt-0.5">{label}</p>
    </div>
  );
}
