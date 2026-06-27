import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Baby, ChevronRight } from "lucide-react";
import { activities } from "../data";
import FavButton from "../components/FavButton";

const categories = ["Toutes", "Jardinage", "Créatif", "Exploration"];

const diffStyles: Record<string, string> = {
  Facile: "bg-leaf-soft text-leaf-dark",
  Moyen: "bg-sun/20 text-leaf-dark",
  Aventure: "bg-berry/10 text-berry",
};

export default function Activities() {
  const [cat, setCat] = useState("Toutes");
  const list = cat === "Toutes" ? activities : activities.filter((a) => a.category === cat);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl">Activités en famille 🧺</h1>
        <p className="text-muted font-semibold mt-1">
          Touchez une activité pour découvrir son tutoriel pas à pas.
        </p>
      </header>

      {/* Filtres catégories */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`pill whitespace-nowrap px-4 py-2 transition ${
              cat === c ? "bg-leaf text-white" : "bg-white text-muted shadow-[var(--shadow-soft)]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Blocs cliquables */}
      <div className="space-y-3">
        {list.map((a) => (
          <Link
            key={a.id}
            to={`/activites/${a.id}`}
            className="card flex items-center gap-4 active:scale-[0.99] transition"
          >
            <img
              src={a.image}
              alt={a.title}
              loading="lazy"
              className="thumb h-16 w-16 shrink-0 rounded-2xl"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`pill ${diffStyles[a.difficulty]}`}>{a.difficulty}</span>
                <span className="text-[11px] font-bold text-muted">{a.category}</span>
              </div>
              <p className="mt-1 font-display font-semibold text-leaf-dark leading-tight truncate">
                {a.title}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted font-semibold">
                <span className="inline-flex items-center gap-1"><Clock size={13} /> {a.duration}</span>
                <span className="inline-flex items-center gap-1"><Baby size={13} /> {a.age}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FavButton item={{ id: a.id, kind: "activity", title: a.title, emoji: a.emoji, image: a.image, to: `/activites/${a.id}` }} />
              <ChevronRight size={18} className="text-muted" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
