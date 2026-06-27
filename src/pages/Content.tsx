import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { articles } from "../data";
import FavButton from "../components/FavButton";

export default function Content() {
  const [featured, ...rest] = articles;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl">Contenu pédagogique 📚</h1>
        <p className="text-muted font-semibold mt-1">
          Des articles courts pour apprendre en famille.
        </p>
      </header>

      {/* À la une */}
      <Link
        to={`/contenu/${featured.id}`}
        className="block rounded-3xl bg-gradient-to-br from-leaf to-leaf-dark p-5 text-white shadow-[var(--shadow-card)] active:scale-[0.99] transition"
      >
        <div className="flex items-center justify-between">
          <span className="pill bg-white/15 text-white">À la une</span>
          <span className="text-5xl">{featured.emoji}</span>
        </div>
        <h2 className="mt-3 text-xl font-display font-semibold text-white leading-snug">
          {featured.title}
        </h2>
        <p className="mt-1 text-sm text-white/80 leading-snug">{featured.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold">
          Lire l'article <ChevronRight size={15} />
        </span>
      </Link>

      <div className="space-y-3">
        {rest.map((a) => (
          <Link
            key={a.id}
            to={`/contenu/${a.id}`}
            className="card flex items-center gap-4 active:scale-[0.99] transition"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-leaf-soft text-3xl">
              {a.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <span className="pill bg-sky/15 text-sky !py-0.5">{a.category}</span>
              <p className="mt-1 font-display font-semibold text-leaf-dark leading-tight">{a.title}</p>
              <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted font-semibold">
                <Clock size={12} /> {a.read}
              </span>
            </div>
            <FavButton item={{ id: a.id, kind: "article", title: a.title, emoji: a.emoji, to: `/contenu/${a.id}` }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
