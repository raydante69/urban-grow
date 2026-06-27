import { Link } from "react-router-dom";
import { Baby, Sparkles, Play } from "lucide-react";
import { games } from "../data";
import FavButton from "../components/FavButton";

export default function Games() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl">Jeux d'apprentissage 🎮</h1>
        <p className="text-muted font-semibold mt-1">
          On joue, et on apprend sans même s'en rendre compte !
        </p>
      </header>

      {/* Bandeau ludique */}
      <div className="rounded-3xl bg-gradient-to-br from-sun/30 to-leaf-soft p-5">
        <div className="flex items-center gap-2 text-sm font-bold text-leaf-dark">
          <Sparkles size={16} /> Le saviez-vous ?
        </div>
        <p className="mt-1 font-display font-semibold text-leaf-dark leading-snug">
          Les enfants retiennent jusqu'à 2× mieux en jouant. Chaque jeu cache un apprentissage 🌱
        </p>
      </div>

      <div className="space-y-3">
        {games.map((g) => (
          <Link
            key={g.id}
            to={`/jeux/${g.id}`}
            className="card flex items-center gap-4 active:scale-[0.99] transition"
          >
            <div className="relative h-16 w-16 shrink-0">
              <img src={g.image} alt={g.title} loading="lazy" className="thumb h-full w-full rounded-2xl" />
              <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-white text-base shadow-[var(--shadow-soft)]">
                {g.emoji}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-leaf-dark leading-tight">{g.title}</p>
              <p className="mt-0.5 text-sm text-muted leading-snug line-clamp-2">{g.description}</p>
              <div className="mt-1.5 flex items-center gap-3 text-xs text-muted font-semibold">
                <span className="inline-flex items-center gap-1"><Baby size={13} /> {g.age}</span>
                <span className="pill bg-leaf-soft text-leaf-dark !py-0.5">{g.skill}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FavButton item={{ id: g.id, kind: "game", title: g.title, emoji: g.emoji, image: g.image, to: `/jeux/${g.id}` }} />
              <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf text-white">
                <Play size={16} fill="currentColor" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
